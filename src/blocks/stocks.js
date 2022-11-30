/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Define custom blocks.
 * @author abbychau@gmail.com (Abby Chau)
 */

// More on defining blocks:
// https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks

import * as Blockly from 'blockly/core'
import { javascriptGenerator } from 'blockly/javascript'

Blockly.Blocks.stock_buy_simple = {
  init: function () {
    this.appendValueInput('Number')
      .setCheck('Number')
      .appendField('Buy Stock ID')
      .appendField(new Blockly.FieldNumber(0), 'ID')
      .appendField('For amount')
      .appendField(new Blockly.FieldNumber(0), 'Amount')
      .appendField('At Price')
      .appendField(new Blockly.FieldNumber(0), 'Price')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, 'String')
    this.setColour(230)
    this.setTooltip('buy id')
    this.setHelpUrl('https://example.com')
  }
}

javascriptGenerator.stock_buy_simple = function (block) {
  // eslint-disable-next-line camelcase
  var number_id = block.getFieldValue('ID')
  // eslint-disable-next-line camelcase
  var number_amount = block.getFieldValue('Amount')
  // eslint-disable-next-line camelcase
  var number_price = block.getFieldValue('Price')
  // eslint-disable-next-line camelcase
  var value_number = javascriptGenerator.valueToCode(
    block,
    'Number',
    javascriptGenerator.ORDER_ATOMIC
  )
  // eslint-disable-next-line camelcase
  var code = `buy(${number_id},${number_amount},${number_price},${value_number});\n`
  return code
}

Blockly.Blocks.stock_buy_prog = {
  init: function () {
    this.appendValueInput('Number')
      .setCheck('Number')
      .appendField('Buy Stock ID')
    this.appendValueInput('NAME').setCheck('Number').appendField('For amount')
    this.appendValueInput('NAME').setCheck('Number').appendField('At Price')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, 'String')
    this.setColour(230)
    this.setTooltip('buy id')
    this.setHelpUrl('https://example.com')
  }
}

javascriptGenerator.stock_buy_prog = function (block) {
  // eslint-disable-next-line camelcase
  var value_number = javascriptGenerator.valueToCode(
    block,
    'Number',
    javascriptGenerator.ORDER_ATOMIC
  )
  // eslint-disable-next-line camelcase
  var value_name = javascriptGenerator.valueToCode(
    block,
    'NAME',
    javascriptGenerator.ORDER_ATOMIC
  )
  // eslint-disable-next-line camelcase
  var code = `buy(${value_number}, ${value_name}, ${value_name});\n`
  return code
}

Blockly.Blocks.stock_fetch_price = {
  init: function () {
    this.appendValueInput('Fetch')
      .setCheck('Number')
      .appendField('Fetch Price of Stock ID:')
    this.appendDummyInput()
      .appendField('And set to:')
      .appendField(new Blockly.FieldVariable('item'), 'variable')
    this.setInputsInline(true)
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour(230)
    this.setTooltip('fetch stock price')
    this.setHelpUrl('https://example.com')
  }
}

javascriptGenerator.stock_fetch_price = function (block) {
  // eslint-disable-next-line camelcase
  var value_fetch = javascriptGenerator.valueToCode(block, 'Fetch', javascriptGenerator.ORDER_ATOMIC)

  // eslint-disable-next-line camelcase
  var variable_variable = javascriptGenerator.nameDB_.getName(
    block.getFieldValue('variable'),
    Blockly.VARIABLE_CATEGORY_NAME
  )
  // eslint-disable-next-line camelcase
  var code = `fetch_price(${value_fetch}, ${variable_variable});\n`
  return code
}
