import {
  BoxNode,
  HorizontalLineNode,
  VerticalLineNode,
  HPaddingNode,
  VerticalListRow,
  VerticalList
} from './virtualCanvasNodes'

function withSize (state, size) {
  if (state.delimSizing) {
    return state.withFamily(`KaTeX_Size${size}`)
  } else {
    return state.withSize(size)
  }
}

function withHorizLine (state, node) {
  const lineHeight = node.style.borderBottomWidth.replace('em', '') * state.em
  const lineNode = new HorizontalLineNode(state.color, state.minWidth, state.classes)
  lineNode.setPosition(state.nextX, state.y)
  lineNode.bounds.set({ height: lineHeight })
  lineNode.margin.set({ left: state.marginLeft, right: state.marginRight })
  state.vlist.addCell(lineNode)
  return state.withResetMargin()
}

function withVertLine (state, node) {
  const sepHeight = node.style.height.replace('em', '') * state.em
  const sepWidth = 0.05 * state.em
  const sepVerticalAlign = node.style.verticalAlign.replace('em', '') * state.em
  const sepY = state.y - sepVerticalAlign
  const lineNode = new VerticalLineNode(state.color, state.classes)
  lineNode.setPosition(state.nextX, sepY)
  lineNode.bounds.set({ width: sepWidth, height: sepHeight })
  lineNode.margin.set({ left: state.marginLeft, right: state.marginRight })
  state.vlist.addCell(lineNode)
  return state.withResetMargin()
}

function withBox (state, node, hasBorder) {
  const TRANSPARENT_COLOR = null
  const isTransparentBackground = !node.style.backgroundColor || node.style.backgroundColor === 'none'
  const backgroundColor = isTransparentBackground ? TRANSPARENT_COLOR : node.style.backgroundColor
  const isDefaultColor = !node.style.borderColor || node.style.borderColor === 'default'
  const borderColor = isDefaultColor ? state.color : node.style.borderColor
  const borderWidth = hasBorder ? 0.04 * state.em : 0.0000001
  const height = (+node.style.height.replace('em', '')) * state.em
  const minWidth = ((state.em * 0.3) * 2)
  state.vlist.alignment = 'center'
  const x = state.nextX
  const box = new BoxNode(backgroundColor, borderColor, borderWidth, minWidth, state.classes)
  box.setPosition(x, state.y)
  box.bounds.set({ height })
  box.margin.set({ left: state.marginLeft, right: state.marginRight })
  state.vlist.addCell(box)
  return state.withResetMargin()
}

/**
 * Each function in this singleton represents a mapping between className and
 * how it affects the RenderingState.
 *
 * For example, textbf maps to a bold weight for text.
 *
 * While an mfrac state maps to a center-aligned VerticalList (think how fractions are centered)
 */
class ClassStateMapping {
  colorbox (state, node) {
    return withBox(state, node, false)
  }

  fbox (state, node) {
    return withBox(state, node, true)
  }

  fcolorbox (state, node) {
    return withBox(state, node, true)
  }

  vlist (state, node) {
    const isTrueVlist = node.children[0].children.length
    if (isTrueVlist) {
      const vlist = new VerticalList(state.textAlign, state.nextX, state.classes)
      vlist.setPosition(state.nextX, state.y)
      vlist.margin.set({ left: state.marginLeft, right: state.marginRight })
      return state.withVlist(vlist)
        .withResetMargin()
    }
    return state
  }

  pstrut (state, node) {
    const height = ((+node.style.height.replace('em', '')) * state.em)
    const tableRow = new VerticalListRow(state.classes)
    state.vlist.addRow(tableRow)
    tableRow.setPosition(state.nextX, state.y + height)
    tableRow.bounds.set({ height })
    tableRow.margin.set({ left: state.marginLeft, right: state.marginRight })
    return state.withPstrut(height)
  }

  base (state, node) {
    const height = node.height * state.em
    const strut = new HPaddingNode(state.classes)
    const depth = node.depth * state.em
    strut.setPosition(state.nextX, state.y - height)
    strut.bounds.set({ height: height + depth })
    const lastRow = state.vlist.last()
    lastRow.depth = depth
    lastRow.addBaseStrut(strut)
    return state
  }

  newline (state, node) {
    const tableRow = new VerticalListRow(state.classes)
    const strutBounds = state.vlist.last().strutBounds
    const marginTop = node.style.marginTop
    const topPadding = marginTop ? ((+marginTop.replace('em', '')) * state.em) : 0
    state.vlist.addRow(tableRow)
    tableRow.setPosition(state.nextX, state.y)
    const lineHeight = state.em * 1.2
    const strutHeight = strutBounds.height
    const yOffset = Math.max(lineHeight, strutHeight)
    return state.withPstrut(yOffset + topPadding)
  }

  root (state) {
    const mu = (state.em * (1.0 / 18.0))
    return state.withMarginRight(mu * -10)
      .withMarginLeft(mu * 5)
  }

  arraycolsep (state, node) {
    const colWidth = node.style.width.replace('em', '') * state.em
    const hPad = new HPaddingNode(state.classes)
    hPad.setPosition(state.nextX, state.y)
    hPad.bounds.set({ width: colWidth })
    state.vlist.addCell(hPad)
    return state.withResetMargin()
  }

  colAlignR (state) {
    return state.withTextAlign('right')
  }

  colAlignL (state) {
    return state.withTextAlign('left')
  }

  xArrow (state) {
    return state.withTextAlign('center')
  }

  accent (state) {
    return state.withTextAlign('center')
  }
  colAlignC (state) {
    return state.withTextAlign('center')
  }

  opLimits (state) {
    return state.withTextAlign('center')
  }

  mfrac (state) {
    return state.withTextAlign('center')
  }

  verticalSeparator (state, node) {
    return withVertLine(state, node)
  }

  hline (state, node) {
    return withHorizLine(state, node)
  }

  overlineLine (state, node) {
    return withHorizLine(state, node)
  }

  underlineLine (state, node) {
    return withHorizLine(state, node)
  }

  fracLine (state, node) {
    return withHorizLine(state, node)
  }

  svgAlign (state) {
    return state.withTextAlign('left')
  }

  delimsizing (state) {
    return state.withDelimSizing()
  }

  size1 (state) {
    return withSize(state, 1)
  }

  size2 (state) {
    return withSize(state, 2)
  }

  size3 (state) {
    return withSize(state, 3)
  }

  size4 (state) {
    return withSize(state, 4)
  }

  size5 (state) {
    return withSize(state, 5)
  }

  size6 (state) {
    return withSize(state, 6)
  }

  size7 (state) {
    return withSize(state, 7)
  }

  size8 (state) {
    return withSize(state, 8)
  }

  size9 (state) {
    return withSize(state, 9)
  }
  size10 (state) {
    return withSize(state, 10)
  }

  size11 (state) {
    return withSize(state, 11)
  }

  nulldelimiter (state) {
    const ptperem = 10.0
    const nullDelimSpace = 1.2 / ptperem
    const nullPaddWidth = nullDelimSpace * state.em
    const node = new HPaddingNode(state.classes)
    node.setPosition(state.nextX, state.y)
    node.bounds.set({ width: nullPaddWidth })
    state.vlist.addCell(node)
    return state.withResetMargin()
  }

  textbf (state) {
    return state.withWeight('bold')
  }

  textit (state) {
    return state.withVariant('italic')
  }

  textrm (state) {
    return state.withFamily('KaTeX_Main')
  }

  textsf (state, node, options) {
    return state.withFamily('KaTeX_SansSerif')
  }

  texttt (state) {
    return state.withFamily('KaTeX_Typewriter')
  }

  mathit (state) {
    return state.withWeight('normal')
      .withVariant('italic')
      .withFamily('KaTeX_Math')
  }

  mspace (state, node) {
    if (node.style.marginRight) {
      const mspace = node.style.marginRight.replace('em', '')
      return state.withMSpace(mspace)
    }
    return state
  }

  mathbf (state) {
    return state.withWeight('bold')
      .withVariant('normal')
      .withFamily('KaTeX_Main')
  }

  mathbb (state) {
    return state.withWeight('normal')
      .withVariant('normal')
      .withFamily('KaTeX_AMS')
  }

  mathcal (state) {
    return state.withWeight('normal')
      .withVariant('normal')
      .withFamily('KaTeX_Caligraphic')
  }

  mathfrak (state) {
    return state.withWeight('normal')
      .withVariant('normal')
      .withFamily('KaTeX_Fraktur')
  }

  mathtt (state) {
    return state.withWeight('normal')
      .withVariant('normal')
      .withFamily('KaTeX_Typewriter')
  }

  mathscr (state) {
    return state.withWeight('normal')
      .withVariant('normal')
      .withFamily('KaTeX_Script')
  }

  mathsf (state) {
    return state.withWeight('normal')
      .withVariant('normal')
      .withFamily('KaTeX_SansSerif')
  }

  mathrm (state) {
    return state.withWeight('normal')
      .withVariant('normal')
      .withFamily('Katex_Main')
  }
  mainit (state) {
    return state.withVariant('italic')
      .withFamily('KaTeX_Main')
  }

  amsrm (state) {
    return state.withFamily('KaTeX_AMS')
  }

  boldsymbol (state) {
    return state.withWeight('bold')
      .withVariant('italic')
      .withFamily('KaTeX_Math')
  }

  smallOp (state) {
    return state.withWeight('normal')
      .withVariant('normal')
      .withFamily('KaTeX_Size1')
  }

  largeOp (state) {
    return state.withWeight('normal')
      .withVariant('normal')
      .withFamily('KaTeX_Size2')
  }
}

const classStateMapping = new ClassStateMapping()
export default classStateMapping
