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
  <div id="app-blockly" style="  border: 5px solid yellow;   height: 100%;">
    <BlocklyComp id="blockly" :options="options" ref="foo"></BlocklyComp>
  </div>
</template>

<style scoped>
#app-blockly {

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
  position: absolute;
  right: 0;
  bottom: 0;
  width: 50%;
  height: 50%;
  margin: 0;
  background-color: skyblue;
}

#blockly {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
