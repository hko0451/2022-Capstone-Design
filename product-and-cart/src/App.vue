<template>
  <link rel="stylesheet" type="text/css" href="./icofont.min.css">
  <body>
    <div class="grid-container" >
      <header class="top-bar spread" style="border: 3px solid red" >
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
      <main style="border: 3px solid cornflowerblue">
        <router-view id="app-main"/>
      </main>
    </div>
  </body>
</template>

<style scoped>

#app-main {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.grid-container{
  width: 100vw;
  height: 100vh;
  border: 4px solid green;
  display: grid;
  grid-template-rows: 50px auto;

}
</style>
<script>
import router from '@/router'

export default {
  mounted () {
    window.addEventListener('keyup', this.handleKeyUp)
  },
  unmounted () {
    window.removeEventListener('keyup', this.handleKeyUp)
  },
  methods: {
    handleKeyUp (e) {
      const key = e.key || e.keyCode
      console.log(key)
      switch (key) {
        case '1':
          router.push('/')
          break
        case '2':
          router.push('/login')
          break
        case '3':
          router.push('/blockly')
          break
        case '4':
          router.push('/signup')
      }
    }
  }
}
</script>
