<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/test">Test</router-link>
  </nav>
</template>

<script>
export default {
  name: 'HeadRouter'
}
</script>

<style>
nav {
    padding: 30px;
}

nav a {
    font-weight: bold;
    color: #2c3e50;
}

nav a.router-link-exact-active {
    color: #42b983;
}
</style>
