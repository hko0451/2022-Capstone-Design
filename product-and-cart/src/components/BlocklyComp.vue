<script>
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Blockly Vue Component.
 * @author dcoodien@gmail.com (Dylan Coodien)
 */

import { ref, shallowRef } from 'vue'
import Blockly from 'blockly'

export default {
  name: 'BlocklyComp',
  props: ['options'],
  mounted () {
    const options = this.options.options || {}
    if (!options.toolbox) {
      options.toolbox = this.$refs.blocklyToolbox
    }
    this.workspace = Blockly.inject(this.$refs.blocklyDiv, options)
  },
  date () {
    return {
      blocklyToolbox: ref(),
      blocklyDiv: ref(),
      workspace: shallowRef()
    }
  }
}

</script>

<template>
  <div>
    <div class="blocklyDiv" ref="blocklyDiv"></div>
    <xml ref="blocklyToolbox" style="display: none">
     <slot></slot>
    </xml>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.blocklyDiv {
  height: 100%;
  width: 100%;
  text-align: left;
}
</style>
