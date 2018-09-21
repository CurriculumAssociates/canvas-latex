import ContainerNode from './ContainerNode'

export default class VerticalListRow extends ContainerNode {
  /**
   * constructor
   * @param {Array<String>} classes
   */
  constructor (...args) {
    super(...args)

    this.strutBounds = null
  }

  /**
   * Returns the type of the VirtualCanvasNode
   *
   * @return {String}
   */
  get type () {
    return 'VerticalListRow'
  }

  addBaseStrut (padNode) {
    if (!this.strutBounds) {
      this.strutBounds = padNode.getBounds().clone()
    } else {
      this.strutBounds.extend(padNode.getBounds())
    }
  }

  leftAlign (tableLeft) {
    this.setPosition(tableLeft)
  }

  centerAlign (tableCenter) {
    const width = this.getBounds().width
    const center = tableCenter - width / 2
    this.setPosition(center)
  }

  rightAlign (tableRight) {
    const width = this.getBounds().width
    const right = tableRight - width
    this.setPosition(right)
  }
}
