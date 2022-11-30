import Interpreter from 'js-interpreter'
import Blockly from 'blockly'

var outputArea = document.getElementById('output')

function initService (workspace) {
  Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n'
  Blockly.JavaScript.addReservedWords('highlightBlock')
  Blockly.JavaScript.addReservedWords('exit')

  const runnerPid = 0
  const myInterpreter = null

  runCode(myInterpreter, workspace, runnerPid)
  workspace.addChangeListener(function (event) {
    if (!event.isUiEvent) {
      // Something changed.  Interpreter needs to be reloaded.
      resetStepUi(true, myInterpreter, runnerPid)
    }
  })
}

function initApi (interpreter, globalObject) {
  // Add an API function for the alert() block, generated for "text_print" blocks.
  var wrapperAlert = function alert (text) {
    text = arguments.length ? text : ''
    outputArea.value += '\n' + text
  }
  interpreter.setProperty(globalObject, 'alert',
    interpreter.createNativeFunction(wrapperAlert))

  // Add an API function for the prompt() block.
  var wrapperPrompt = function prompt (text) {
    return window.prompt(text)
  }
  interpreter.setProperty(globalObject, 'prompt',
    interpreter.createNativeFunction(wrapperPrompt))

  // Add an API function for highlighting blocks.
  var wrapper = function (id) {
    id = String(id || '')
    return highlightBlock(id)
  }
  interpreter.setProperty(globalObject, 'highlightBlock',
    interpreter.createNativeFunction(wrapper))

  // Add an API for the wait block.  See wait_block.js
}

function resetStepUi (clearOutput, myInterpreter, runnerPid) {
  clearTimeout(runnerPid)

  if (clearOutput) {
    outputArea.value = 'Program output:\n================='
  }
  myInterpreter = null
}

function highlightBlock (id, workspace) {
  workspace.highlightBlock(id)
}

function runCode (myInterpreter, workspace, runnerPid) {
  if (!myInterpreter) {
    // First statement of this code.
    // Clear the program output.
    resetStepUi(true)
    const latestCode = Blockly.JavaScript.workspaceToCode(workspace)

    // And then show generated code in an alert.
    // In a timeout to allow the outputArea.value to reset first.
    setTimeout(function () {
      // Begin execution
      myInterpreter = new Interpreter(latestCode, initApi)
      function runner () {
        if (myInterpreter) {
          const hasMore = myInterpreter.run()
          if (hasMore) {
            // Execution is currently blocked by some async call.
            // Try again later.
            runnerPid = setTimeout(runner, 10)
          } else {
            // Program is complete.
            outputArea.value += '\n\n<< Program complete >>'
            resetStepUi(false, myInterpreter, runnerPid)
          }
        }
      }
      runner()
    }, 1)
  }
}

export { initService }
