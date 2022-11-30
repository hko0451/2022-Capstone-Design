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
  // eslint-disable-next-line no-unused-vars
  makeBlockset
} from '@/service/block-parser'
// eslint-disable-next-line no-unused-vars
import controlJson from '@/const/if-else.json'
// eslint-disable-next-line no-unused-vars
import blockSetJson from '@/const/example.json'
// eslint-disable-next-line no-unused-vars
import loopJson from '@/const/count-with.json'
// eslint-disable-next-line no-unused-vars
import loopJson1 from '@/const/count-with1.json'
// eslint-disable-next-line no-unused-vars
import loopJson2 from '@/const/count-with2.json'
// eslint-disable-next-line no-unused-vars
import controlJson1 from '@/const/if-else1.json'
// eslint-disable-next-line no-unused-vars
import controlJson2 from '@/const/if-else2.json'
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
    this.workspace.zoom(1000, 0, 5)
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
    /**
     * JSON 파싱 부분
     */
    test () {
      // eslint-disable-next-line no-unused-vars
      const workspace = Blockly.common.getMainWorkspace()
      /**
       * const/if-else.json => controlJson
       * const/example.json => blockSetJson
       * const/count-with => loopJson
       * method는 block-parser에 있음
       */
      makeBlockset(controlJson1, workspace)
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
