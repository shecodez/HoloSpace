<template>
  <div>
    <FormatToolbar v-if="state.showFormatToolbar" @addMarkdown="addMarkdown" @addEmoji="addEmoji" @addGif="addGif" />
    <div class="mr-2">
      <div class="flex relative items-center justify-between">
        <div class="t-ctrl left-2 grid" :class="state.isMultiline && ' pb-8'">
          <H010gramModal />
        </div>

        <div v-if="state.isMultiline" class="form-control w-full bg-base-100 bg-opacity-40">
          <div v-if="state.isHTML" v-html="markdownToHTML" class="md2html-preview" />
          <textarea
            v-else
            ref="multilineTextareaEl"
            v-model="state.text"
            placeholder="Enter message"
            :rows="3"
            class="textarea textarea-primary textarea-bordered border-b-transparent rounded-none text-lg"
          />
          <label class="flex items-center border-t border-dashed border-primary">
            <input ref="fileInputEl" type="file" class="hidden" @change="uploadFile" />
            <button @click="fileInputEl.click()" class="upload-btn btn btn-sm btn-block">
              <Icon icon="clarity:paperclip-line" />
              <span class="normal-case font-normal invisible md:visible">
                Attach files by dragging &amp; dropping, selecting or pasting them
              </span>
            </button>
            <button @click="toggleMdHTML" class="toggle-md2html-btn btn btn-sm" :class="state.isHTML && 'btn-primary'">
              <Icon icon="ri:markdown-fill" width="20" />
            </button>
          </label>
        </div>
        <div v-else class="form-control w-full">
          <input
            type="text"
            @keydown.enter="sendMessage"
            v-model="state.text"
            placeholder="Enter message"
            class="input input-lg input-primary input-bordered rounded text-lg"
          />
        </div>

        <button v-if="state.text.length" class="t-ctrl right-32" :class="state.isMultiline && 'pb-8'" @click="reset">
          <Icon icon="mdi:close" width="24" />
        </button>
        <div class="t-ctrl right-2 flex items-center" :class="state.isMultiline && ' pb-8'">
          <button @click="toggleFormatToolbar" class="btn btn-ghost btn-square btn-sm" title="Format">
            <Icon icon="mdi:format-textbox" width="20" />
          </button>
          <button @click="$emit('switchToVoiceComm')" class="btn btn-ghost btn-square btn-sm" title="Send Voice Comm">
            <Icon icon="clarity:microphone-solid" width="20" />
          </button>

          <div class="my-divider border-l ml-1">
            <button @click="sendMessage" class="submit-msg-btn btn btn-outline btn-primary btn-square">
              <Icon icon="fa:paper-plane" width="24" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- <span class="absolute bottom-0 text-xs">This is for typing...</span> -->
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useRoute } from 'vue-router';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

import FormatToolbar from '@/components/chat/FormatTextToolbar.vue';
import H010gramModal from '@/components/chat/H010gramModal.vue';
import { EmojiClickEventDetail, IGif, IMessage, IMessageType } from '@/data/interfaces';
import useSupabase from '@/use/supabase';
import { MessageType } from '@/data/mock';
import { useAppStore } from '@/stores/app';

const { supabase } = useSupabase();
const route = useRoute();
const appStore = useAppStore();

const state = reactive({
  text: '',
  isMultiline: false,
  showFormatToolbar: false,
  uploading: false,
  error: '',
  isHTML: false,
});

function toggleFormatToolbar() {
  state.showFormatToolbar = !state.showFormatToolbar;
  state.isMultiline = !state.isMultiline;
}

function toggleMdHTML() {
  if (state.isMultiline) state.isHTML = !state.isHTML;
}
const markdownToHTML = computed(() => DOMPurify.sanitize(marked.parse(state.text)));

function reset() {
  state.text = '';
}

const emit = defineEmits<{
  (e: 'switchToVoiceComm'): void;
  (e: 'send', message: Partial<IMessage>): void;
}>();

function sendMessage() {
  emit('send', {
    content: state.text,
    type: state.isMultiline ? IMessageType.Markdown : IMessageType.TEXT,
    space_id: route.params.spaceId.toString(),
  });
  reset();
}

const fileInputEl = ref();
const files = ref();
async function uploadFile(event: any) {
  // console.log('Upload File', event);
  files.value = event.target.files;
  try {
    state.uploading = true;
    if (!files.value || files.value.length === 0) {
      throw new Error('You must select a file to upload.');
    }

    const file = files.value[0];
    const fileExt = file.name.split('.').pop();
    // TODO: change name to uuid`
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage.from('files').upload(filePath, file);
    if (uploadError) throw uploadError;

    console.log('Upload file data', uploadData);

    const message = {
      space_id: route.params.spaceId,
      content: fileName,
      type: MessageType.File,
    };
    const { data, error } = await supabase.from('messages').insert(message);
    if (error) throw error;

    console.log('Upload file MESSAGE', data);
  } catch (e: any) {
    const error = e.error_description || e.message;
    appStore.setToast({ title: 'Upload Error', text: error }, 'danger');
  } finally {
    state.uploading = false;
  }
}

function addEmoji(emoji: EmojiClickEventDetail) {
  state.text = state.text + emoji.unicode;
}
function addGif(gif: IGif) {
  state.text = state.text + `[${gif.URL}](url)`;
}
const multilineTextareaEl = ref<HTMLTextAreaElement>();
function addMarkdown(cmd: { md: string; cursorIdx: number }) {
  const textarea = multilineTextareaEl.value;
  if (textarea) {
    if (textarea.selectionStart === textarea.selectionEnd) {
      // nothing is selected
      state.text = state.text + cmd.md.replace('|', '');
      textarea.value = state.text;
      const e = textarea.selectionEnd;
      textarea.focus();
      textarea.selectionEnd = e - cmd.cursorIdx;
    } else {
      // replace cursor with selected text
      const b = textarea.selectionStart;
      const bIdx = cmd.md.split('|'); // **|**
      const e = textarea.selectionEnd + bIdx[0].length;
      const selectedText = textarea.value.slice(b, e);
      // TODO: fix slice: cannot select text from middle
      state.text = state.text.slice(0, -selectedText.length) + `${bIdx[0]}${selectedText}${bIdx[1]}`;
      textarea.setSelectionRange(b, b);
      textarea.setRangeText(bIdx[0]);
      textarea.setSelectionRange(e, e);
      textarea.setRangeText(bIdx[1], e, e, 'end');
    }
  }
}
// TODO: realtime markdown translator, add markdown html styles (like h1, h2, h3...)
</script>

<style scoped>
input,
textarea {
  @apply relative z-10 py-3 pl-12 pr-32 w-full shadow-inner;
}
textarea {
  margin: 1px 0;
}

.t-ctrl {
  position: absolute;
  z-index: 20;
}
.md2html-preview {
  @apply w-full h-28 py-3.5 pl-12 pr-32 overflow-auto;
}

.upload-btn {
  @apply flex-1 flex justify-start gap-2 rounded-t-none rounded-r-none;
}

.toggle-md2html-btn {
  @apply rounded-t-none rounded-l-none;
}

.submit-msg-btn {
  @apply btn-sm border-none ml-1;
}
</style>
