import VirtualCanvasNode from './VirtualCanvasNode'

/**
 * A StretchyNode represents the interface for a node who's size is dynamic.
 * A stretchy nodes' size is determined by the content within or surrounding it.
 * It gets set by the VerticalList.
 *
 * @abstract
 */
export default class StretchyNode extends VirtualCanvasNode {
  /**
   * constructor
   * @param {Number} minWidth
   * @param {Array<String>} classes
   */
  constructor (minWidth, classes) {
    super(classes)

    this.minWidth = minWidth || 0
  }

  /**
   * Converts the VirtualNode model to a JSON Object.
   */
  toJSON () {
    const json = super.toJSON()
    json.minWidth = this.minWidth
    return json
  }

  set listWidth (listWidth) {
    this.bounds.width = listWidth + this.minWidth
  }
}
