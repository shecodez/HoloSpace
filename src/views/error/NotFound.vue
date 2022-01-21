<template>
  <div class="text-center">
    <h2 class="heading">Aww, Quack!</h2>

    <p class="code pt-28">
      <span>"{{ route.fullPath }}"</span>.<em>lost_in_space</em> = true;
    </p>
    <p class="code"><span>if</span> (<b>you_spelt_it_wrong</b>) &#123; <span>try_again()</span>; &#125;</p>
    <p class="code">
      <!-- <span>else if ( <b>space_ducks</b>)</span> -->
      <span>else if (<b>we_ducked_up</b>)</span>
      &#123;
      <em>alert</em>(<i>"We're really sorry about that."</i>); <span>window</span>.<em>location</em> = home; &#125;
    </p>

    <router-link to="/">HOME</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'NotFound',
  setup() {
    const route = useRoute();
    return { route };
  },
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Bevan');

.heading {
  font-family: 'Bevan', cursive;
  font-size: 130px;
  margin: 10vh 0 0;
  text-align: center;
  letter-spacing: 5px;
  background-color: black;
  color: transparent;
  text-shadow: 2px 2px 3px rgba(255, 255, 255, 0.1);
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
}
.heading span {
  font-size: 1.2em;
}

.code {
  color: #bdbdbd;
  text-align: center;
  display: block;
  font-size: 16px;
  margin: 0 30px 25px;
}
.code span {
  color: #f0c674;
}
.code i {
  color: #b5bd68;
}
.code em {
  color: #b294bb;
  font-style: unset;
}
.code b {
  color: #81a2be;
  font-weight: 500;
}

a {
  color: #8abeb7;
  font-family: monospace;
  font-size: 20px;
  text-decoration: underline;
  margin-top: 10px;
  display: inline-block;
}

@media screen and (max-width: 880px) {
  .heading {
    font-size: 14vw;
  }
}
</style>
