import { VerticalList } from './virtualCanvasNodes'

const SIZES = [ null, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.2, 1.44, 1.728, 2.074, 2.488 ]

export default class State {
  static defaultOptions (options) {
    return {
      __y: 0,
      __baseSize: options.baseSize || 44,
      __sizeIndex: options.sizeIndex || 6,
      __family: 'KaTeX_Main',
      __variant: 'normal',
      __weight: 'normal',
      __vlist: new VerticalList(options.alignment || 'center', 0),
      __textAlign: null,
      __minWidth: 0,
      __marginRight: 0,
      __marginLeft: 0,
      __delimSizing: false,
      __classes: [],
      __mspace: 0,
      __pstrut: null,
      __color: options.defaultTextColor || 'black'
    }
  }

  constructor (state) {
    Object.keys(state).forEach(key => {
      this[key] = state[key]
    })
  }

  withMarginLeft (marginLeft) {
    const state = new State(this)
    state.__marginLeft += marginLeft
    return state
  }

  withMarginRight (marginRight) {
    const state = new State(this)
    state.__marginRight += marginRight
    return state
  }

  withResetMargin () {
    const state = new State(this)
    state.__marginRight = 0
    state.__marginLeft = 0
    return state
  }

  withDelimSizing () {
    const state = new State(this)
    state.__delimSizing = true
    return state
  }

  withColor (color) {
    const state = new State(this)
    state.__color = color
    return state
  }

  withYShift (y) {
    const state = new State(this)
    state.__y += y
    return state
  }

  withFamily (family) {
    const state = new State(this)
    state.__family = family
    return state
  }

  withWeight (weight) {
    const state = new State(this)
    state.__weight = weight
    return state
  }

  withVlist (table) {
    const state = new State(this)
    state.__vlist = table
    return state
  }

  withClass (className) {
    const state = new State(this)
    state.__classes = state.__classes.concat([className])
    return state
  }

  withMSpace (mspace) {
    const state = new State(this)
    state.__mspace = mspace
    return state
  }

  withVariant (variant) {
    const state = new State(this)
    state.__variant = variant
    return state
  }

  withSize (size) {
    const state = new State(this)
    state.__sizeIndex = size
    return state
  }

  withTextAlign (align) {
    const state = new State(this)
    state.__textAlign = align
    return state
  }

  withMinWidth (width) {
    const state = new State(this)
    state.__minWidth = width
    return state
  }

  withPstrut (pstrut) {
    const state = new State(this)
    state.__pstrut = pstrut
    return state
  }

  get classes () {
    return this.__classes
  }

  get pstrut () {
    return this.__pstrut
  }

  get mspace () {
    return this.__mspace
  }

  get nextX () {
    return this.vlist.getNextNodePlacement() + this.marginLeft
  }

  get marginLeft () {
    return this.__marginLeft
  }

  get marginRight () {
    return this.__marginRight
  }

  get delimSizing () {
    return this.__delimSizing
  }

  get minWidth () {
    return this.__minWidth
  }

  get color () {
    return this.__color
  }

  get textAlign () {
    return this.__textAlign
  }

  get y () {
    return this.__y
  }

  get vlist () {
    return this.__vlist
  }

  get em () {
    return this.__baseSize * SIZES[this.__sizeIndex]
  }

  get font () {
    const weight = this.__weight ? `${this.__weight} ` : ''
    const variant = this.__variant ? `${this.__variant} ` : ''
    const font = `${variant}${weight}${this.em}px ${this.__family}`
    return font
  }
}
