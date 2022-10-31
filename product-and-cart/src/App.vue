<template>
  <link rel="stylesheet" type="text/css" href="./icofont.min.css">
  <header class="top-bar spread">
    <nav class="top-bar-nav">
      <router-link to="/" class="top-bar-link">
        <i class="icofont-spoon-and-fork"></i>
        <span>Home</span>
      </router-link>
      <router-link to="/Login" class="top-bar-link">
        <span>Login</span>
      </router-link>
      <router-link to="/blockly" class="top-bar-link">
        <span>Blockly</span>
      </router-link>
      <router-link to="/signup" class="top-bar-link">
        <span>Signup</span>
      </router-link>
    </nav>
  </header>
  <body>
    <router-view id="app2"/>
  </body>
</template>

<style scoped>
/*여기서 style-tag는 global하게 적용된다
*/
#app2 {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>
export default {

}
</script>
