export function MathInput() {
  const fieldRef = React.useRef(null);
  const [latex, setLatex] = React.useState('');
  const [mathml, setMathml] = React.useState('');

  React.useEffect(() => {
    const mf = new MathLive.MathfieldElement();
    fieldRef.current.appendChild(mf);
    mf.addEventListener('input', () => {
      setLatex(mf.getValue('latex'));
      setMathml(mf.getValue('mathML'));
    });
    fieldRef.current.mathfield = mf;
  }, []);

  const insert = (code) => {
    const mf = fieldRef.current.mathfield;
    mf.insert(code);
    mf.focus();
  };

  return React.createElement(
    'div',
    null,
    React.createElement('div', { ref: fieldRef }),
    React.createElement(
      'div',
      { className: 'keyboard' },
        React.createElement(
          'button',
          { onClick: () => insert('\\frac{}{}') },
          'Fraction'
        ),
        React.createElement(
          'button',
          { onClick: () => insert('\\sqrt{}') },
          'Root'
        ),
      React.createElement(
        'button',
        { onClick: () => insert('^{}') },
        'Exponent'
      )
    ),
    React.createElement('pre', null, `LaTeX: ${latex}`),
    React.createElement('pre', null, `MathML: ${mathml}`)
  );
}
