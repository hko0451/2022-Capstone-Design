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
import { CustomCategory } from '@/blocks/category/custom_category'
import { CustomCursor } from '@/blocks/keyboardnav/custom_cursor'
// import {CustomMarkerSvg, CustomRenderer} from '@/blocks/keyboardnav/custom_marker_svg'

export default {
  name: 'BlocklyComp',
  props: ['options'],
  mounted () {
    // custom toolbox
    Blockly.registry.register(
      Blockly.registry.Type.TOOLBOX_ITEM,
      Blockly.ToolboxCategory.registrationName,
      CustomCategory, true)

    const options = this.getOptions()

    // keyboardNavigation controller 생성
    const controller = new NavigationController()
    controller.init()

    this.workspace = this.crateWorkspace(this.$refs.blocklyDiv, options, controller)
    controller.enable(this.workspace)
  },
  methods: {

    /**
     * workspace 생성 및 keyboardNavigation plugin 적용
     * @param blocklyDiv
     * @param options
     * @param controller
     * @returns {*|WorkspaceSvg}
     */
    crateWorkspace (blocklyDiv, options, controller) {
      const workspace = Blockly.inject(blocklyDiv, options)
      controller.addWorkspace(workspace)
      // custom cursor 적용
      workspace.getMarkerManager().setCursor(new CustomCursor())
      return workspace
    },
    /**
     * options 할당
     * @returns {*|{}}
     */
    getOptions () {
      const options = this.options || {}
      if (!options.toolbox) {
        options.toolbox = this.$refs.blocklyToolbox
      }
      return options
    }
  },
  date () {
    return {
      toolbox: Blockly.common.getMainWorkspace().getToolbox(),
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
@import '../assets/styles/css/toolbox_style.css';
.blocklyDiv {
  height: 100%;
  width: 100%;
  text-align: left;
}
</style>
