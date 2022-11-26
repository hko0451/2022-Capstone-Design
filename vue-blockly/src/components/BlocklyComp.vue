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
import { CustomCategory } from '@/blocks/category/custom_category'
// eslint-disable-next-line no-unused-vars
import {
  makeBlockset
} from '@/service/block-parser'
import Json from '@/const/example.json'
import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'

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

    this.workspace = this.crateWorkspace(this.$refs.blocklyDiv, options)

    this.test()
    // this.connect()
  },
  methods: {

    /**
     * workspace 생성 및 keyboardNavigation plugin 적용
     * @param blocklyDiv
     * @param options
     * @param controller
     * @returns {*|WorkspaceSvg}
     */
    crateWorkspace (blocklyDiv, options) {
      const workspace = Blockly.inject(blocklyDiv, options)
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
    },
    test () {
      const workspace = Blockly.common.getMainWorkspace()
      console.log(Json)
      makeBlockset(Json, workspace)
    },
    send () {
      const msg = {
        type: 'ENTER',
        sender: 'Kim',
        content: 'hello'
      }
      console.log('Send message: hello')
      this.stompClient.send('app/chat/message', JSON.stringify(msg), {})
    },
    connect () {
      const socket = new SockJS('http://localhost:8080/ws/chat')
      this.stompClient = Stomp.over(socket)
      this.stompClient.connect(
        {},
        frame => {
          // 소켓 연결 성공
          this.connected = true
          this.stompClient.subscribe('/queue/chat/room', res => {
            console.log(res.body)
          })
          console.log(JSON.stringify({ type: 'ENTER', sender: 'Kim', message: 'hello' }))
          this.stompClient.send('/app/chat/message', JSON.stringify({ type: 'ENTER', sender: 'Kim', message: 'hello' }), {})
        },
        error => {
          // 소켓 연결 실패
          console.log('소켓 연결 실패', error)
          this.connected = false
        }
      )
    }
  },
  data () {
    return {
      connected: false,
      stompClient: null,
      toolbox: null,
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

<style scoped>
@import '../assets/styles/css/toolbox_style.css';
.blocklyDiv {
  height: 100%;
  width: 100%;
  text-align: left;
}
</style>
