function MathInput () {
  const fieldRef = React.useRef(null)
  const [latex, setLatex] = React.useState('')
  const [mathml, setMathml] = React.useState('')

  React.useEffect(() => {
    const mf = fieldRef.current
    if (!mf) return
    const getLatex = () =>
      typeof mf.getValue === 'function' ? mf.getValue('latex') : mf.value ?? ''
    const getMathML = () =>
      typeof mf.getValue === 'function' ? mf.getValue('math-ml') : ''
    const update = () => {
      setLatex(getLatex())
      setMathml(getMathML())
    }
    mf.addEventListener('input', update)
    mf.addEventListener('change', update)
    update()
    return () => {
      mf.removeEventListener('input', update)
      mf.removeEventListener('change', update)
    }
  }, [])

  const insert = code => {
    const mf = fieldRef.current
    if (!mf) return
    if (typeof mf.focus === 'function') mf.focus()
    if (typeof mf.insert === 'function') {
      mf.insert(code)
    } else {
      mf.value = (mf.value || '') + code
    }
  }

  const exec = cmd => {
    const mf = fieldRef.current
    if (!mf) return
    if (typeof mf.executeCommand === 'function') {
      mf.executeCommand(cmd)
    }
  }

  const clearAll = () => {
    const mf = fieldRef.current
    if (!mf) return
    if (typeof mf.setValue === 'function') mf.setValue('')
    else mf.value = ''
    if (typeof mf.focus === 'function') mf.focus()
    setLatex('')
    setMathml('')
  }

  const digitButtons = '1234567890'
    .split('')
    .map(d =>
      React.createElement(
        'button',
        { key: `d-${d}`, onClick: () => insert(d) },
        d
      )
    )

  const opButtons = [
    React.createElement(
      'button',
      { key: 'plus', onClick: () => insert('+') },
      '+'
    ),
    React.createElement(
      'button',
      { key: 'minus', onClick: () => insert('-') },
      '−'
    ),
    React.createElement(
      'button',
      { key: 'cdot', onClick: () => insert('\\cdot') },
      '·'
    ),
    React.createElement(
      'button',
      { key: 'times', onClick: () => insert('\\times') },
      '×'
    ),
    React.createElement(
      'button',
      { key: 'div', onClick: () => insert('\\div') },
      '÷'
    ),
    React.createElement(
      'button',
      { key: 'lpar', onClick: () => insert('(') },
      '('
    ),
    React.createElement(
      'button',
      { key: 'rpar', onClick: () => insert(')') },
      ')'
    ),
    React.createElement(
      'button',
      { key: 'eq', onClick: () => insert('=') },
      '='
    ),
    React.createElement(
      'button',
      { key: 'x', onClick: () => insert('x') },
      'x'
    ),
    React.createElement(
      'button',
      { key: 'y', onClick: () => insert('y') },
      'y'
    ),
    React.createElement(
      'button',
      { key: 'frac', onClick: () => insert('\\frac{}{}') },
      'Fraction'
    ),
    React.createElement(
      'button',
      { key: 'sqrt', onClick: () => insert('\\sqrt{}') },
      'Root'
    ),
    React.createElement(
      'button',
      { key: 'exp', onClick: () => insert('^{}') },
      'Exponent'
    ),
    React.createElement(
      'button',
      { key: 'left', onClick: () => exec('moveToPreviousChar') },
      '←'
    ),
    React.createElement(
      'button',
      { key: 'right', onClick: () => exec('moveToNextChar') },
      '→'
    ),
    React.createElement(
      'button',
      { key: 'back', onClick: () => exec('deleteBackward') },
      'Backspace'
    ),
    React.createElement('button', { key: 'clear', onClick: clearAll }, 'Clear')
  ]

  const keyboardChildren = [].concat(digitButtons, opButtons)

  return React.createElement(
    'div',
    null,
    React.createElement('math-field', { ref: fieldRef }),
    React.createElement('div', { className: 'keyboard' }, ...keyboardChildren),
    React.createElement('pre', null, 'LaTeX: ' + (latex || '(leer)')),
    React.createElement('pre', null, 'MathML: ' + (mathml || '(leer)'))
  )
}

window.MathInput = MathInput
