import VirtualCanvasNode from './VirtualCanvasNode'

/**
 * A VerticalLineNode represents a vertical line with a configurable color.
 *
 * Examples include \begin{array}{|l|}...\end{array}
 */
export default class VerticalLineNode extends VirtualCanvasNode {
  /**
   * constructor
   * @param {String} color
   * @param {Array<String>} classes
   */
  constructor (color, classes) {
    super(classes)

    this.color = color
  }

  /**
   * Converts the VirtualNode model to a JSON Object.
   */
  toJSON () {
    const json = super.toJSON()
    json.color = this.color
    return json
  }

  /**
   * Returns the type of the VirtualCanvasNode
   *
   * @return {String}
   */
  get type () {
    return 'VerticalLineNode'
  }
}
