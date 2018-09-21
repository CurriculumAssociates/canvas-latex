// NOTE: Once the next KaTeX release is out, we'll include this as an npm module
// However, we need this for features that are not yet available.
import Katex from './katex.min.js'

import State from './RenderingState'
import classStateMapping from './classStateMapping'
import styleStateMapping from './styleStateMapping'

import { SvgNode, TextNode, HPaddingNode, VerticalListRow } from './virtualCanvasNodes'

const IDENTIFIER_CLASS = 'enclosing'

/**
 * NodeData represents the data returned from the build method
 */
class NodeData {
  constructor (rootNode, attributes) {
    this.rootNode = rootNode
    this.attributes = attributes
  }
}

/**
 * The NodeBuilder represents the entry point for all renderers.
 * The only method public method available is the "build method".
 */
export default class VirtualNodeBuilder {
  /**
   * Constructor
   *
   * @param  {String} latex - Sets the initial latex expression
   * @param  {Object} options - Any options to apply to the expression
   */
  constructor (latex, options) {
    this._latex = latex
    this._options = options
  }

  /**
   * Builds all the Virtual Nodes and retrieves the appropriate attributes
   * for the given latex/options. This is the entry point for any renderer
   * implementation.
   *
   * @return {NodeData}
   */
  build () {
    this._state = new State(State.defaultOptions(this._options))
    const row = new VerticalListRow()
    this._state.vlist.addRow(row)
    this._classIndexes = {}
    const virtualDomTree = Katex.__renderToHTMLTree(this._latex, this._options).children[0]
    this._createRenderingState(virtualDomTree)
    const rootNode = this._state.vlist
    rootNode.align()
    const attributes = this._getNodeAttributes(virtualDomTree, rootNode)
    const nodeData = new NodeData(rootNode, attributes)
    return nodeData
  }

  _getNodeAttributes (virtualDomTree, root) {
    const attributes = {}
    const strutBounds = root.getStrutBounds()
    attributes.baselineHeight = strutBounds.height - (virtualDomTree.depth * this._state.em)
    attributes.strutBounds = strutBounds
    return attributes
  }

  _createRenderingState (node) {
    const parentState = this._state
    this._getGlyphDataFromNode(node)
    if (node.children) {
      node.children.forEach(child => this._createRenderingState(child))
    }
    this._resetState(parentState)
  }

  _resetState (parentState) {
    const vlist = this._state.vlist
    const parentVlist = parentState.vlist
    if (vlist !== parentVlist) {
      vlist.setStretchyWidths()
      vlist.align()
      parentVlist.addCell(vlist)
    }
    if (this._state.classes !== parentState.classes) {
      this._state.classes.forEach((classData) => {
        if (!(classData in parentState.classes)) {
          this._classIndexes[classData.name]++
        }
      })
    }
    if (this._state.pstrut) {
      parentState = parentState.withYShift(this._state.pstrut)
        .withResetMargin()
    }
    this._state = parentState
  }

  _getGlyphDataFromNode (node) {
    this._extractClassDataFromNode(node)
    this._extractStyleDataFromNode(node)
    this._createMSpace()
    this._createSvgNode(node)
    this._createTextNode(node)
    this._createItalicNode(node)
  }

  _extractClassDataFromNode (node) {
    const classes = node.classes || []
    let nextClassIsLatexClass = false
    classes.forEach((name) => {
      if (name === IDENTIFIER_CLASS) {
        nextClassIsLatexClass = true
      } else if (nextClassIsLatexClass) {
        nextClassIsLatexClass = false
        this._classIndexes[name] = this._classIndexes[name] || 0
        this._state = this._state.withClass({ name, index: this._classIndexes[name] })
      } else {
        const camelName = this._toCamelCase(name)
        if (classStateMapping[camelName]) {
          this._state = classStateMapping[camelName](this._state, node, this._options)
        }
      }
    })
  }

  _toCamelCase (str) {
    return str.replace(/-([a-z])/g, function (g) {
      return g[1].toUpperCase()
    })
  }

  _createMSpace () {
    if (this._state.mspace) {
      const mspace = new HPaddingNode(this._state.classes)
      mspace.setPosition(this._state.nextX, this._state.y)
      mspace.bounds.set({ width: this._state.mspace * this._state.em })
      this._state.vlist.addCell(mspace)
      this._state = this._state.withResetMargin()
    }
  }

  _extractStyleDataFromNode (node) {
    if (!node.style) return
    Object.keys(node.style).forEach((key) => {
      const value = node.style[key]
      if (styleStateMapping[key]) {
        this._state = styleStateMapping[key](this._state, value, node)
      }
    })
  }

  _createSvgNode (node) {
    if (node instanceof Katex.__domTree.svgNode) {
      const virtualSvg = node
      const state = this._state
      const height = (+virtualSvg.attributes.height.replace('em', '')) * this._state.em
      virtualSvg.attributes.height = height
      virtualSvg.attributes.fill = this._state.color
      const svgNode = new SvgNode(virtualSvg, state.minWidth, state.classes)
      svgNode.setPosition(state.nextX, state.y)
      svgNode.bounds.set({ height })
      svgNode.margin.set({ left: state.marginLeft, right: state.marginRight })
      this._state.vlist.addCell(svgNode)
      this._state = this._state.withResetMargin()
    }
  }

  _createTextNode (node) {
    // The '' is NOT an empty string. It's some invisible character (U+200B) aka ZERO-WIDTH Space
    const isNonZeroWidthSpaceText = node.value && node.value !== '​'
    if (isNonZeroWidthSpaceText) {
      const state = this._state
      const textNode = new TextNode(node.value, state.font, state.color, state.classes)
      textNode.setPosition(state.nextX, state.y)
      textNode.margin.set({ left: state.marginLeft, right: state.marginRight })
      this._state.vlist.addCell(textNode)
      this._state = this._state.withResetMargin()
    }
  }

  _createItalicNode (node) {
    if (node.italic) {
      const italic = this._state.em * node.italic
      const italicNode = new HPaddingNode(this._state.classes)
      italicNode.setPosition(this._state.nextX, 0)
      italicNode.bounds.set({ width: italic })
      this._state.vlist.addCell(italicNode)
      this._state = this._state.withResetMargin()
    }
  }
}
