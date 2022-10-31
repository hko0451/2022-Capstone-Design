<script>
import { ref } from 'vue'
import BlocklyComp from '@/components/BlocklyComp'
import '@/blocks/stocks'
import { javascriptGenerator } from 'blockly/javascript'

export default {
  name: 'BlocklyDisplay',
  components: {
    BlocklyComp
  },
  methods: {
    showCode () {
      this.code.value = javascriptGenerator.workspaceToCode(this.$refs.foo.workspace)
    }
  },
  data () {
    return {
      foo: ref(),
      code: ref(),
      options: {
        media: 'media/',
        grid: {
          spacing: 25,
          length: 4,
          colour: '#ccc',
          snap: true
        },
        toolbox: `<xml>
          <category name="Logic" colour="%{BKY_LOGIC_HUE}">
            <block type="controls_if"></block>
            <block type="logic_compare"></block>
            <block type="logic_operation"></block>
            <block type="logic_negate"></block>
            <block type="logic_boolean"></block>
          </category>
          <category name="Loops" colour="%{BKY_LOOPS_HUE}">
            <block type="controls_repeat_ext">
              <value name="TIMES">
                <block type="math_number">
                  <field name="NUM">10</field>
                </block>
              </value>
            </block>
            <block type="controls_whileUntil"></block>
          </category>
          <category name="Math" colour="%{BKY_MATH_HUE}">
            <block type="math_number">
              <field name="NUM">123</field>
            </block>
            <block type="math_arithmetic"></block>
            <block type="math_single"></block>
          </category>
          <category name="Text" colour="%{BKY_TEXTS_HUE}">
            <block type="text"></block>
            <block type="text_length"></block>
            <block type="text_print"></block>
          </category>
          <category name="Variables" custom="VARIABLE" colour="%{BKY_VARIABLES_HUE}">
            </category>
          <category name="Stocks" colour="%{BKY_LOOPS_HUE}">
            <block type="stock_buy_simple"></block>
            <block type="stock_buy_prog"></block>
            <block type="stock_fetch_price"></block>
          </category>
        </xml>`
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
  background-color: beige;
}

#blockly {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  width: 50%;
  height: 100%;
}
</style>
