<template>
  <div class="flex h-full">
    <div
      class="
        max-w-screen
        md:w-5/12
        lg:w-3/12
        bg-0d0d0d
        min-h-screen
        p-8
        md:p-12
        text-gray-200
        flex flex-col
        gap-4
      "
    >
      <div class="mb-4">
        <a href="#">
          <span class="sr-only">H010SPACE</span>
          <!-- <img class="h-12 w-auto" src="/assets/logo.svg" alt="logo" /> -->
          <svg
            id="svg"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="100"
            height="100"
            viewBox="0, 0, 400,400"
            version="1.1"
          >
            <g id="svgg">
              <path
                id="path0"
                d="M150.788 84.224 C 108.727 108.867,103.963 115.399,119.105 127.661 L 129.714 136.251 117.238 144.426 C 107.258 150.965,104.762 156.369,104.762 171.436 C 104.762 189.668,104.390 190.103,93.161 184.986 C 70.468 174.647,66.667 181.164,66.667 230.413 C 66.667 288.062,65.684 286.203,109.824 312.081 C 151.587 336.565,163.501 337.705,165.829 317.442 C 167.051 306.804,169.030 304.784,175.352 307.721 C 185.758 312.556,214.393 312.478,225.000 307.586 C 232.107 304.309,233.333 306.271,233.333 320.919 C 233.333 343.199,237.252 342.825,283.433 316.140 C 333.726 287.080,333.333 287.740,333.333 232.274 C 333.333 181.028,329.712 174.565,306.839 184.986 C 295.610 190.103,295.238 189.668,295.238 171.436 C 295.238 156.369,292.742 150.965,282.762 144.426 L 270.286 136.251 280.895 127.661 C 296.039 115.397,291.557 109.442,248.238 84.272 C 201.171 56.925,197.385 56.923,150.788 84.224 M233.614 96.429 C 249.112 104.940,261.817 113.283,261.848 114.967 C 262.010 123.752,245.731 121.777,224.291 110.411 L 200.161 97.619 173.648 111.425 C 151.305 123.059,125.696 123.920,138.413 112.609 C 171.868 82.853,200.146 78.047,233.614 96.429 M197.714 166.667 C 204.418 166.667,218.511 162.275,229.032 156.908 C 246.527 147.982,266.667 147.737,266.667 156.449 C 266.667 160.711,207.166 195.238,199.822 195.238 C 195.281 195.238,139.790 164.824,133.681 158.987 C 122.667 148.464,151.696 145.311,167.537 155.311 C 177.430 161.557,191.010 166.667,197.714 166.667 M189.475 254.005 L 190.854 295.705 178.760 287.781 C 168.653 281.159,166.667 276.186,166.667 257.505 C 166.667 232.144,162.147 224.910,136.905 209.866 C 122.828 201.476,119.048 196.303,119.048 185.426 L 119.048 171.630 153.571 191.967 L 188.095 212.304 189.475 254.005 M280.952 185.326 C 280.952 196.318,277.220 201.448,263.095 209.866 C 237.853 224.910,233.333 232.144,233.333 257.505 C 233.333 276.092,231.328 281.171,221.429 287.657 L 209.524 295.458 209.614 253.681 L 209.705 211.905 244.138 192.147 C 263.076 181.280,279.107 172.173,279.762 171.909 C 280.417 171.645,280.952 177.682,280.952 185.326 M104.835 235.288 C 104.920 263.708,106.250 266.114,129.762 280.402 C 166.789 302.902,152.910 315.909,114.865 294.362 C 80.851 275.097,81.112 275.558,81.025 234.626 L 80.952 200.204 92.857 205.628 C 103.269 210.372,104.771 214.093,104.835 235.288 M317.055 268.901 C 312.834 285.215,247.540 318.204,247.878 303.851 C 248.060 296.097,254.725 288.647,270.497 278.571 C 292.352 264.608,292.889 263.681,294.266 237.535 C 295.438 215.300,297.447 209.990,306.171 206.079 C 317.089 201.185,324.101 241.661,317.055 268.901 "
                stroke="none"
                fill="#4f46e5"
                fill-rule="evenodd"
              ></path>
            </g>
          </svg>
        </a>
      </div>
      <div class="text-5xl font-extrabold">
        <h2
          class="
            bg-clip-text
            text-transparent
            bg-gradient-to-r
            from-indigo-600
            to-cyan-400
          "
        >
          Get early access
        </h2>
      </div>
      <p>We'll announce it first in our newsletter</p>

      <div v-if="sent" class="success-alert p-4 flex items-center my-4">
        ✔️ You're subscribed. Thanks!
      </div>
      <form
        v-else
        @submit.prevent="subscribeToNewsletter"
        class="flex-1 flex flex-col gap-2"
      >
        <div
          class="
            d-textfield
            relative
            bg-white bg-opacity-10
            px-4
            pt-5
            pb-1.5
            rounded-t
            border-b border-white border-opacity-40
          "
        >
          <input
            type="email"
            name="email"
            v-model="email"
            placeholder=" "
            class="
              block
              bg-transparent
              w-full
              appearance-none
              focus:outline-none
              text-sm text-white
            "
          />
          <label
            for="email"
            class="absolute top-0 transform translate-y-1/2 duration-300"
            >E-Mail
          </label>
        </div>
        <button
          type="submit"
          class="
            px-4
            py-2
            rounded
            bg-gradient-to-r
            from-indigo-600
            to-cyan-400
            text-white text-lg
            cursor-pointer
          "
        >
          <span class="text-lg font-bold uppercase tracking-wide">
            Subscribe
          </span>
        </button>
      </form>

      <p class="text-gray-600 mt-auto">
        By clicking "Subscribe" you agree to our
        <NuxtLink to="/privacy" class="text-indigo-600"
          >Privacy Policy</NuxtLink
        >
        and
        <NuxtLink to="/terms" class="text-indigo-600">Terms of Service</NuxtLink
        >. We promise, no green eggs or spam from us.
      </p>
    </div>
    <div
      class="
        hidden
        md:block md:w-7/12
        lg:w-9/12
        bg-black
        min-h-screen
        p-8
        md:p-12
        text-white
        overflow-hidden
      "
    >
      <div class="mb-4 flex items-center gap-2 h-12">
        <svg
          id="svg"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="56"
          height="56"
          viewBox="0, 0, 400,400"
          version="1.1"
        >
          <g id="svgg">
            <path
              id="path0"
              d="M150.788 84.224 C 108.727 108.867,103.963 115.399,119.105 127.661 L 129.714 136.251 117.238 144.426 C 107.258 150.965,104.762 156.369,104.762 171.436 C 104.762 189.668,104.390 190.103,93.161 184.986 C 70.468 174.647,66.667 181.164,66.667 230.413 C 66.667 288.062,65.684 286.203,109.824 312.081 C 151.587 336.565,163.501 337.705,165.829 317.442 C 167.051 306.804,169.030 304.784,175.352 307.721 C 185.758 312.556,214.393 312.478,225.000 307.586 C 232.107 304.309,233.333 306.271,233.333 320.919 C 233.333 343.199,237.252 342.825,283.433 316.140 C 333.726 287.080,333.333 287.740,333.333 232.274 C 333.333 181.028,329.712 174.565,306.839 184.986 C 295.610 190.103,295.238 189.668,295.238 171.436 C 295.238 156.369,292.742 150.965,282.762 144.426 L 270.286 136.251 280.895 127.661 C 296.039 115.397,291.557 109.442,248.238 84.272 C 201.171 56.925,197.385 56.923,150.788 84.224 M233.614 96.429 C 249.112 104.940,261.817 113.283,261.848 114.967 C 262.010 123.752,245.731 121.777,224.291 110.411 L 200.161 97.619 173.648 111.425 C 151.305 123.059,125.696 123.920,138.413 112.609 C 171.868 82.853,200.146 78.047,233.614 96.429 M197.714 166.667 C 204.418 166.667,218.511 162.275,229.032 156.908 C 246.527 147.982,266.667 147.737,266.667 156.449 C 266.667 160.711,207.166 195.238,199.822 195.238 C 195.281 195.238,139.790 164.824,133.681 158.987 C 122.667 148.464,151.696 145.311,167.537 155.311 C 177.430 161.557,191.010 166.667,197.714 166.667 M189.475 254.005 L 190.854 295.705 178.760 287.781 C 168.653 281.159,166.667 276.186,166.667 257.505 C 166.667 232.144,162.147 224.910,136.905 209.866 C 122.828 201.476,119.048 196.303,119.048 185.426 L 119.048 171.630 153.571 191.967 L 188.095 212.304 189.475 254.005 M280.952 185.326 C 280.952 196.318,277.220 201.448,263.095 209.866 C 237.853 224.910,233.333 232.144,233.333 257.505 C 233.333 276.092,231.328 281.171,221.429 287.657 L 209.524 295.458 209.614 253.681 L 209.705 211.905 244.138 192.147 C 263.076 181.280,279.107 172.173,279.762 171.909 C 280.417 171.645,280.952 177.682,280.952 185.326 M104.835 235.288 C 104.920 263.708,106.250 266.114,129.762 280.402 C 166.789 302.902,152.910 315.909,114.865 294.362 C 80.851 275.097,81.112 275.558,81.025 234.626 L 80.952 200.204 92.857 205.628 C 103.269 210.372,104.771 214.093,104.835 235.288 M317.055 268.901 C 312.834 285.215,247.540 318.204,247.878 303.851 C 248.060 296.097,254.725 288.647,270.497 278.571 C 292.352 264.608,292.889 263.681,294.266 237.535 C 295.438 215.300,297.447 209.990,306.171 206.079 C 317.089 201.185,324.101 241.661,317.055 268.901 "
              stroke="none"
              fill="#ffffff"
              fill-rule="evenodd"
            ></path>
          </g>
        </svg>
        <span class="text-3xl font-brand font-bold tracking-wide">
          H010SPACE
        </span>
      </div>
      <div class="h-full py-10">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "landing",
};
</script>

<script setup>
import { ref } from "vue";

const email = ref("");
const dbResponse = ref([]);
const sent = ref(false);

async function subscribeToNewsletter() {
  //console.log(email.value, "subscribed to newsletter");
  const result = await fetch(`/api/subscribe?email=${email.value}`);
  const data = await result.json();
  dbResponse.value = data;
  sent.value = true;
}
</script>

<style scoped>
.d-textfield:focus-within {
  border-bottom: 2px solid cyan;
  background-color: rgba(255, 255, 255, 0.2) !important;
}
.d-textfield:focus-within input {
  caret-color: cyan;
}
.d-textfield:focus-within label {
  color: cyan;
}

.d-textfield input:focus-within ~ label,
.d-textfield input:not(:placeholder-shown) ~ label {
  transform: translate(-0.2em) scale(0.74);
}

.success-alert {
  @apply border-l-4 border-green-500 bg-green-400 bg-opacity-30 text-green-500;
}
</style>
