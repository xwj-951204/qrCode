<template>
<HeadRouter/>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

import HeadRouter from '@/components/HeadRouter.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    HeadRouter
  }
}
</script>
