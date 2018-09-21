import VirtualNodeBuilder from '../../common/VirtualNodeBuilder'
import { convertAndGetClasses } from './VirtualNodesToCreateJS'

// events that fire before rendering and after rendering
// NOTE: because this._render() is called in the constructor, the first firing of these events
// cannot be captured since you can only add an event listener to the widget after it's made.
export const EVENTS = {
  PRE_RENDER: 'pre-render',
  POST_RENDER: 'post-render'
}

const createjs = window.createjs || { Container: () => {} }

export default class extends createjs.Container {
  /**
   * Constructor
   * @namespace Widget
   *
   * @param  {?String} [latex=''] - Sets the initial latex expression
   * @param  {?Object} [options={}] - Any options to apply to the expression
   */
  constructor (latex = '', options = {}) {
    super()
    this._latex = latex
    this._ids = {}
    this._classes = {}

    this._options = options
    this._render()
  }

  /**
   * Returns a flattened 1d array of all createjs.DisplayObject's with the specified className
   * @memberof Widget
   *
   * For example, when calling getObjectsByClass('a') with the latex:
   * `\class{a}{ab} \class{a}{c}`, the return value will be a 1d array with
   * "a" at index 0, "b" at index 1, and "c" in index 2. The return values are not distinguishable
   * based on how they appear in the latex, and thus should not be relied on.
   *
   * @param  {string} className
   * @return {Array<createjs.DisplayObject>}
   */
  getObjectsByClass (className) {
    let objects
    if (this._classes[className]) {
      objects = []
      this._classes[className].forEach((sepClass) => {
        objects = objects.concat(sepClass)
      })
    }
    return objects
  }

  /**
   * Returns a 2d array of createjs.DisplayObject's separated by their className
   * @memberof Widget
   *
   * For example, when calling getObjectsByClassSeparated('a') with the latex:
   * `\class{a}{ab} \class{a}{c}`, the return value will be a 2d array with
   * ["a", "b"] at index 0 and ["c"] at index 1. The return values are distinguishable
   * based on how they appear separated in the latex, and can be relied on as such.
   *
   * @param  {string} className
   * @type {Array<Array<createjs.DisplayObject>>}
   */
  getObjectsByClassSeparated (className) {
    return this._classes[className]
  }

  /**
   * Sets the latex string and renders it appropriately.
   * @memberof Widget
   *
   * @param  {?String} [latex=''] The string to render
   */
  set latex (latex = '') {
    this.removeAllChildren()
    this._latex = latex
    this._render()
  }

  /**
   * Retrieves the latex expression
   * @memberof Widget
   *
   * @return {string} - The latex expression as a string
   */
  get latex () {
    return this._latex
  }

  /**
   * Returns all the classes in the latex expression
   * @memberof Widget
   *
   * @return {Object} - classes
   */
  get classes () {
    return this._classes
  }

  /**
   * Returns all the ids in the latex expression
   * @memberof Widget
   *
   * @return {Object} - ids
   */
  get ids () {
    throw new Error('Not yet implemented.')
  }

  /**
   * Returns the distance from the top of the widget to the baseline of the text
   * @return {Number} distance to the baseline
   */
  get distanceToBaseline () {
    return this._baselineHeight
  }

  /**
   * -------------------------------------------
   * -----------------PRIVATE-------------------
   * -------------------------------------------
   */

  _render () {
    this.dispatchEvent(EVENTS.PRE_RENDER)
    this._bounds = null
    const nodeBuilder = new VirtualNodeBuilder(this._latex, this._options)
    const nodeData = nodeBuilder.build()
    this._classes = convertAndGetClasses(nodeData.rootNode, this)
    this._setWidgetBoundsAndBaseline(nodeData.attributes)
    this.dispatchEvent(EVENTS.POST_RENDER)
  }

  _setWidgetBoundsAndBaseline (attributes) {
    const bounds = this.getBounds()
    if (bounds) {
      const strutBounds = attributes.strutBounds
      this._baselineHeight = attributes.baselineHeight
      this.setBounds(bounds.x, strutBounds.y, bounds.width, strutBounds.height)
      if (this._options.debugBounds) {
        this._showWidgetBounds()
        this._showBaseline()
      }
    }
  }

  _showWidgetBounds () {
    const bounds = this.getBounds()
    const shape = new createjs.Shape(
      new createjs.Graphics()
        .f('blue')
        .dr(bounds.x, bounds.y, bounds.width, bounds.height)
    )
    shape.alpha = 0.3
    this.addChild(shape)
  }

  _showBaseline () {
    const bounds = this.getBounds()
    const shape = new createjs.Shape()
    shape.graphics
      .setStrokeStyle(1)
      .beginStroke('red')
      .moveTo(bounds.x, bounds.y + this.distanceToBaseline)
      .lineTo(bounds.x + bounds.width, bounds.y + this.distanceToBaseline)
    this.addChild(shape)
  }
}
