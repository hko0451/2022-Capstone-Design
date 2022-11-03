import Blockly from 'blockly'

export class CustomCursor extends Blockly.Cursor {
  // eslint-disable-next-line no-useless-constructor
  constructor () {
    super()
  }

  next () {
    // 현재 Blockly.ASTNode
    const curNode = this.getCurNode()
    if (!curNode) {
      return null
    }
    // 다음 Blockly.ASTNode
    let newNode = curNode.next()
    //  만약 newNode가 previous 혹은 next 타입일시 다음 Node를 가져온다
    // eslint-disable-next-line no-undef
    while (newNode && (newNode.getType() === Blockly.ASTNode.types.PREVIOUS ||
      // eslint-disable-next-line no-undef
      newNode.getType() === Blockly.ASTNode.types.NEXT)) {
      newNode = newNode.next()
    }
    if (newNode) {
      // 현재 Blockly.ASTNode 업데이트
      this.setCurNode(newNode)
    }
    return newNode
  }

  in () {
    const curNode = this.getCurNode()
    if (!curNode) {
      return null
    }
    // 현재 Blockly.ASTNode 내부 노드
    const newNode = curNode.in()
    if (newNode) {
      this.setCurNode(newNode)
    }
    return newNode
  }

  prev () {
    const curNode = this.getCurNode()
    if (!curNode) {
      return null
    }
    // 이전 Blockly.ASTNode
    let newNode = curNode.prev()

    // eslint-disable-next-line no-undef
    while (newNode && (newNode.getType() === Blockly.ASTNode.types.PREVIOUS ||
      // eslint-disable-next-line no-undef
      newNode.getType() === Blockly.ASTNode.types.NEXT)) {
      newNode = newNode.prev()
    }
    if (newNode) {
      // this is in
      this.setCurNode(newNode)
    }
    return newNode
  }

  out () {
    const curNode = this.getCurNode()
    if (!curNode) {
      return null
    }
    let newNode = curNode.out()
    // eslint-disable-next-line no-undef
    if (newNode.getType() === Blockly.ASTNode.types.PREVIOUS) {
      newNode = newNode.next()
    }
    if (newNode) {
      this.setCurNode(newNode)
    }
    return newNode
  }
}
