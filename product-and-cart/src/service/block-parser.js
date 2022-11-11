import { createRequire } from 'module'
import Type from '@/const/block-type'
import Blockly from 'blockly'

const require = createRequire(import.meta.url)
const json = require('../const/example.json')

// const ARI_OPERATOR = {
//   LESS_THAN: "LT",
//   EQUAL: "EQ",
//   NOTEQUAL: "NEQ",
//   GREATER_THAN: "GT",
//   LESS_OR_EQUAL: "LTE",
//   GREATER_OR_EQUAL: "GTE"
// }
// Object.freeze(ARI_OPERATOR)

function makeBlockset () {
  const length = json.root.contents.length
  console.log(length)
  for (let i = 0; i < length; i++) {
    const type = chechBlockType(json.root.contents[i])
    makeBlock(type, json.root.contents[i])
  }
}

function makeCondition (conditionalStatement, workspace) {
  const Condition = conditionalStatement.condition
  const csBk = workspace.newBlock(Condition.type)
  const leftBk = workspace.newBlock(Condition.leftVar.type)
  const rightBk = workspace.newBlock(Condition.rightVar.type)

  csBk.setFieldValue(Condition.expression.name, 'OP')

  csBk.getInput('A').connection.connect(leftBk.outputConnection)
  csBk.getInput('B').connection.connect(rightBk.outputConnection)
  return csBk
}

function makeStatements () {

}

function makeDoStatements(statements ,workspace) {
  const blockArr = []
  for (let i ; i < ; i++){
    blockArr[i] = setDetailedSetting
  }

}

function setDetailedSetting(){
  workspace.newBlock()

}

function makeElseStatements() {

}


function chechBlockType () {

}

function makeControl (type, block) {
  switch (type) {
    case Type.IF_ELSE: {
      const workspace = Blockly.getMainWorkspace()
      const parentBlock = workspace.newBlock(Type.IF_ELSE)
      const controlBlock = makeCondition()
      parentBlock.getInput('IF0').connection.connect(controlBlock.outputConnection)

      const statementBlock = makeStatements()
      parentBlock.getInput('ELSE').connection.connect(statementBlock.outputConnection)

      break
    }
    case Type.IF_ELIF:
      break
    case Type.IF_ELIF_ELSE:
      break
  }
}

makeBlockset()
