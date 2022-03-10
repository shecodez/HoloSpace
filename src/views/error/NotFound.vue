<template>
  <Layout pageTitle="Error">
    <div class="text-center">
      <h2 class="glitch text-4xl md:text-8xl font-bold mb-12">Aww, Quack! 🦆</h2>

      <p class="code">
        <span>"{{ $route.fullPath }}"</span>.<em>lost_in_space</em> = true;
      </p>
      <p class="code"><span>if</span> (<b>you_spelt_it_wrong</b>) &#123; <span>try_again()</span>; &#125;</p>
      <p class="code">
        <!-- <span>else if ( <b>space_ducks</b>)</span> -->
        <span>else if (<b>we_ducked_up</b>)</span>
        &#123;
        <em>alert</em>(<i>"We're really sorry about that."</i>); <span>window</span>.<em>location</em> = home; &#125;
      </p>

      <router-link to="/" class="btn btn-accent btn-lg mt-6">Take me home</router-link>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import Layout from '@/layouts/SiteLayout.vue';
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Bevan');

.code {
  //color: #bdbdbd;
  @apply text-white text-xl md:text-3xl;
  text-align: center;
  display: block;
  margin: 0 30px 25px;

  & span {
    //color: #f0c674;
    @apply text-warning;
  }

  & i {
    //color: #b5bd68;
    @apply text-primary;
  }

  & em {
    //color: #b294bb;
    @apply text-error;
    font-style: unset;
  }

  & b {
    //color: #81a2be;
    @apply text-info;
    font-weight: 500;
  }
}
</style>
