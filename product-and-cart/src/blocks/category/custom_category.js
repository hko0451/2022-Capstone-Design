import { ToolboxCategory, utils } from 'blockly'

// eslint-disable-next-line no-undef
class CustomCategory extends ToolboxCategory {
  /**
   * Constructor for a custom category
   */
  // eslint-disable-next-line no-useless-constructor,camelcase
  constructor (categoryDef, toolbox, opt_parent) {
    super(categoryDef, toolbox, opt_parent)
  }

  /**
   * @override
   */
  addColourBorder_ (colour) {
    this.rowDiv_.style.backgroundColor = colour
  }

  /**
   * @override
   * change the look of a category when it has been clicked
   */
  setSelected (isSelected) {
    const labelDom = this.rowDiv_.getElementsByClassName('blocklyTreeLabel')[0]
    if (isSelected) {
      this.rowDiv_.style.backgroundColor = 'white'
      labelDom.style.color = this.colour_
    } else {
      this.rowDiv_.style.backgroundColor = this.colour_
      labelDom.style.color = 'white'
    }
    // eslint-disable-next-line no-undef
    utils.aria.setState(/** @type {!Element} */ (this.htmlDiv_),
      // eslint-disable-next-line no-undef
      utils.aria.State.SELECTED, isSelected)
  }
}

export { CustomCategory }
