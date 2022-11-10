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

import Blockly from 'blockly'
import { NavigationController } from '@blockly/keyboard-navigation'

export default {
  name: 'CodeComp',
  props: ['options'],
  mounted () {
    const options = this.options || {}
    if (!options.toolbox) {
      options.toolbox = this.$refs.blocklyToolbox
    }
    this.workspace = Blockly.inject(this.$refs.blocklyDiv, options)
    const navigationController = new NavigationController()
    navigationController.init()
    navigationController.addWorkspace(this.workspace)
    navigationController.enable(this.workspace)
  },
  date () {
    return {
      blocklyToolbox: null,
      blocklyDiv: null,
      workspace: null
    }
  }
}

</script>

<template>
  <div>
    <div class="blocklyDiv" ref="blocklyDiv"></div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.blocklyDiv {
  border: 2px solid blue;
  height: 100%;
  width: 100%;
  text-align: left;
}
</style>
