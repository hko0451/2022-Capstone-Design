// import { createRequire } from 'module'
import Type from '@/const/block-type'
// eslint-disable-next-line no-unused-vars
import Blockly from 'blockly'

// const require = createRequire(import.meta.url)
// const json = require('../const/example.json')

// eslint-disable-next-line no-unused-vars
function makeBlockset (json, workspace) {
  const length = json.root.contents.length
  const blockarr = []
  for (let i = 0; i < length; i++) {
    blockarr[i] = makeBlock(json.root.contents[i], workspace)
    if (i !== 0) {
      blockarr[i - 1].nextConnection.connect(blockarr[i].previousConnection)
    }
  }
}

function makeConditionVar (varJson, workspace) {
  let ret = null
  if (varJson.type === 'var') {
    console.log(varJson)
    ret = workspace.newBlock(Type.GET_VARIABLE)
    ret.initSvg()
    ret.render()

    ret.setFieldValue(varJson.id, 'VAR')
  } else {
    ret = workspace.newBlock('math_number')

    ret.initSvg()
    ret.render()

    ret.setFieldValue(varJson.value, 'NUM')
  }
  return ret
}

function makeCondition (conditionJson, workspace) {
  const csBk = workspace.newBlock(conditionJson.type)
  const leftBk = makeConditionVar(conditionJson.leftVar, workspace)
  const rightBk = makeConditionVar(conditionJson.rightVar, workspace)

  csBk.initSvg()
  csBk.render()
  leftBk.initSvg()
  leftBk.render()
  rightBk.initSvg()
  rightBk.render()

  csBk.setFieldValue(conditionJson.expression.name, 'OP')
  csBk.getInput('A').connection.connect(leftBk.outputConnection)
  csBk.getInput('B').connection.connect(rightBk.outputConnection)
  return csBk
}

function makeStatements (statementsJson, workspace) {
  const blockader = []
  console.log(statementsJson)
  const blockJson = statementsJson.blocks
  for (let i = 0; i < blockJson.length; i++) {
    blockader[i] = makeBlock(blockJson[i], workspace)
    blockader[i].initSvg()
    blockader[i].render()
    if (i !== 0) {
      blockader[i - 1].nextConnection.connect(blockader[i].previousConnection)
    }
  }
  return blockader[0]
}

function makeLoop (loopJson, workspace) {
  const parentBlock = workspace.newBlock(Type.REPEAT)
  const times = workspace.newBlock(Type.NUMBER)
  const doStatements = makeStatements(loopJson.do_statements, workspace)

  parentBlock.initSvg()
  parentBlock.render()
  times.initSvg()
  times.render()

  times.setFieldValue(loopJson.index, 'NUM')
  parentBlock.getInput('TIMES').connection.connect(times.outputConnection)
  parentBlock.getInput('DO').connection.connect(doStatements.previousConnection)
  return parentBlock
}

function makeLoop2 (loopJson, workspace) {
  const parentBlock = workspace.newBlock(Type.REPEAT)
  const times = workspace.newBlock(Type.NUMBER)

  parentBlock.initSvg()
  parentBlock.render()
  times.initSvg()
  times.render()

  times.setFieldValue(loopJson.index, 'NUM')
  parentBlock.getInput('TIMES').connection.connect(times.outputConnection)
  return parentBlock
}

function makeLoop1 (loopJson, workspace) {
  const parentBlock = workspace.newBlock(Type.REPEAT)

  parentBlock.initSvg()
  parentBlock.render()

  return parentBlock
}

function makePrint (printJson, workspace) {
  const parentBlock = workspace.newBlock('text_print')
  const childBlock = workspace.newBlock('text')

  childBlock.initSvg()
  childBlock.render()
  parentBlock.initSvg()
  parentBlock.render()

  childBlock.setFieldValue(printJson.message, 'TEXT')
  parentBlock.getInput('TEXT').connection.connect(childBlock.outputConnection)
  return parentBlock
}

function makeControl (conditionalJson, workspace) {
  const parentBlock = workspace.newBlock(Type.IF_ELSE)
  const conditionJson = conditionalJson.condition
  const controlBlock = makeCondition(conditionJson, workspace)
  // const elStatementsJson = conditionalJson.else_statements
  const doStatementsJson = conditionalJson.do_statements
  // const elStatementBlock = makeStatements(elStatementsJson, workspace)
  const doStatementsBlock = makeStatements(doStatementsJson, workspace)

  parentBlock.initSvg()
  parentBlock.render()
  controlBlock.initSvg()
  controlBlock.render()
  // elStatementBlock.initSvg()
  // elStatementBlock.render()
  doStatementsBlock.initSvg()
  doStatementsBlock.render()

  // parentBlock.domToMutation(Blockly.Xml.textToDom('<xml><mutation else="1"/></xml>').firstChild)
  parentBlock.getInput('IF0').connection.connect(controlBlock.outputConnection)
  // parentBlock.getInput('ELSE').connection.connect(elStatementBlock.previousConnection)
  parentBlock.getInput('DO0').connection.connect(doStatementsBlock.previousConnection)
  return parentBlock
}

function makeControl1 (conditionalJson, workspace) {
  const parentBlock = workspace.newBlock(Type.IF_ELSE)

  parentBlock.initSvg()
  parentBlock.render()

  return parentBlock
}

function makeControl2 (conditionalJson, workspace) {
  const parentBlock = workspace.newBlock(Type.IF_ELSE)
  const conditionJson = conditionalJson.condition
  const controlBlock = makeCondition(conditionJson, workspace)

  parentBlock.initSvg()
  parentBlock.render()
  controlBlock.initSvg()
  controlBlock.render()

  parentBlock.getInput('IF0').connection.connect(controlBlock.outputConnection)
  return parentBlock
}

function makeVar (varJson, workspace) {
  workspace.createVariable(varJson.name, Type.NUMBER, varJson.id)
  const mathNumBlock = workspace.newBlock(Type.NUMBER)
  const setVarBlock = workspace.newBlock(Type.SET_VARIABLE)

  mathNumBlock.initSvg()
  mathNumBlock.render()
  setVarBlock.initSvg()
  setVarBlock.render()

  mathNumBlock.setFieldValue(varJson.value, 'NUM')
  setVarBlock.setFieldValue(varJson.id, 'VAR')
  setVarBlock.getInput('VALUE').connection.connect(mathNumBlock.outputConnection)
  return setVarBlock
}

function makeBlock (blockJson, workspace) {
  let ret = null
  switch (blockJson.type) {
    case Type.REPEAT: {
      ret = makeLoop(blockJson, workspace)
      break }
    case Type.IF_ELSE: {
      ret = makeControl(blockJson, workspace)
      break }
    case Type.SET_VARIABLE: {
      ret = makeVar(blockJson, workspace)
      break
    }
    case Type.PRINT_TEXT: {
      ret = makePrint(blockJson, workspace)
      break
    }
    case 'controls_if1': {
      ret = makeControl1(blockJson, workspace)
      break
    }
    case 'controls_if2': {
      ret = makeControl2(blockJson, workspace)
      break
    }
    case 'controls_repeat_ext1': {
      ret = makeLoop1(blockJson, workspace)
      break
    }
    case 'controls_repeat_ext2': {
      ret = makeLoop2(blockJson, workspace)
      break
    }
  }
  return ret
}

export { makeVar, makeControl, makePrint, makeLoop, makeStatements, makeCondition, makeBlockset }
