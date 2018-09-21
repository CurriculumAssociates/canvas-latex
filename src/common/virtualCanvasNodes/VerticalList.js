import ContainerNode from './ContainerNode'
import StretchyNode from './StretchyNode'
/**
 * The VerticalList class represents a 1D array of VerticalListRow's
 * which can be horizontally aligned left, right, or center
 *
 * @type {VerticalList}
 */
export default class VerticalList extends ContainerNode {
  /**
   * constructor
   * @param {String} alignment
   * @param {Number} rowStart
   * @param {Array<String>} classes
   */
  constructor (alignment, rowStart, classes) {
    super(classes)

    this.alignment = alignment
    this.rowStart = rowStart
    this.strutBounds = this.bounds.clone()
  }

  /**
   * Converts the VirtualNode model to a JSON Object.
   */
  toJSON () {
    const json = super.toJSON()
    json.alignment = this.alignment
    json.rowStart = this.rowStart
    return json
  }

  /**
   * Returns the type of the VirtualCanvasNode
   *
   * @return {String}
   */
  get type () {
    return 'VerticalList'
  }

  /**
   * Returns the x coordinate of the next node to be placed into the List.
   * @return {Number}
   */
  getNextNodePlacement () {
    let x
    const lastRow = this.last()
    if (lastRow) {
      const lastNode = lastRow.last()
      if (lastNode) {
        const bounds = lastNode.getBounds()
        x = bounds.x + bounds.width + lastNode.margin.right
      } else {
        x = this.rowStart + lastRow.margin.left
      }
    } else {
      // This is the first node in the List
      x = this.rowStart + this.margin.left
    }
    return x
  }

  /**
   * Sets the width of the stretchy nodes contained within.
   */
  setStretchyWidths () {
    const width = this.getBounds().width
    this.nodes.forEach((rowNode) => {
      rowNode.nodes.forEach((node) => {
        if (node instanceof StretchyNode) {
          node.listWidth = width
        }
      })
    })
  }

  /**
   * Aligns the List based on the specified alignment
   */
  align () {
    switch (this.alignment) {
      case 'left':
        this.leftAlign()
        break
      case 'center':
        this.centerAlign()
        break
      case 'right':
        this.rightAlign()
        break
    }
  }

  /**
   * Adds a row to the List.
   */
  addRow (row) {
    this.addNode(row)
  }

  /**
   * Adds a VirtualCanvasNode to current row
   * @param {VirtualCanvasNode}
   */
  addCell (node) {
    const lastRow = this.last()
    lastRow.addNode(node)
  }

  getStrutBounds () {
    this.nodes.forEach((row) => {
      if (row.strutBounds) {
        this.strutBounds.extend(row.strutBounds)
      }
    })
    return this.strutBounds
  }

  centerAlign () {
    const bounds = this.getBounds()
    const center = bounds.x + bounds.width / 2
    this.nodes.forEach(row => {
      row.centerAlign(center)
    })
  }

  rightAlign () {
    const bounds = this.getBounds()
    const right = bounds.x + bounds.width
    this.nodes.forEach((row) => {
      row.rightAlign(right)
    })
  }

  leftAlign () {
    const bounds = this.getBounds()
    const left = bounds.x
    this.nodes.forEach((row) => {
      row.leftAlign(left)
    })
  }
}
