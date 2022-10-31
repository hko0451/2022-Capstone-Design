<script>
import BlocklyComp from '@/components/BlocklyComp'
import '@/blocks/stocks'
import { javascriptGenerator } from 'blockly/javascript'
// eslint-disable-next-line camelcase
import tb_options from '@/const/tb_options.json'

export default {
  name: 'BlocklyDisplay',
  components: {
    BlocklyComp
  },
  methods: {
    showCode () {
      this.code = javascriptGenerator.workspaceToCode(this.$refs.foo.workspace)
    }
  },
  data () {
    return {
      foo: null,
      code: null,
      options: {
        media: 'media/',
        grid: {
          spacing: 25,
          length: 4,
          colour: '#ccc',
          snap: true
        },
        toolbox: tb_options.toolbox
      }
    }
  }
}
</script>

<template>
  <div id="app">
    <BlocklyComp id="blockly" :options="options" ref="foo"></BlocklyComp>
    <p id="code">
      <button v-on:click="showCode()">Show JavaScript</button>
      <pre v-html="code"></pre>
    </p>
  </div>
</template>

<style>
#app {
  border: 1px solid red;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

html,
body {
  margin: 0;
}

#code {
  border: 2px solid crimson;
  position: absolute;
  right: 0;
  bottom: 0;
  width: 50%;
  height: 50%;
  margin: 0;
  background-color: beige;
}

#blockly {
  position: absolute;
  right: 0;
  left: 0px;
  bottom: 0px;
  top: 48px;
  width: 50%;
  height: 100%;
}
</style>
