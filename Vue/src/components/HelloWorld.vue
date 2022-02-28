<template>
  <div class="hello">



    <h1>{{ msg }}</h1>
    <el-button icon="Search" circle></el-button>
    <el-button type="primary" icon="Edit" circle></el-button>
    <el-button type="success" icon="Check" circle></el-button>
    <el-button type="info" icon="Message" circle></el-button>
    <el-button type="warning" icon="Star" circle></el-button>
    <el-button type="danger" icon="Delete" circle></el-button>
  </div>

</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 300px;
  min-height: 400px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
