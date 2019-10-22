import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/github'

export const LineNumber = {
  display: 'inline-block',
  width: '2em',
  userSelect: 'none',
  opacity: '0.3',
  textAlign: 'right',
  marginRight: '16px',
  marginLeft: '-16px',
}

const emptyLine = `
`

export default ({ children, className, noLines }) => {
  const language = className.replace(/language-/, '')
  const code = children.trim()

  return (
    <Highlight {...defaultProps} theme={theme} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {!noLines && <span style={LineNumber}>{i + 1}</span>}
              {line.map((token, key) => {
                if (token.empty) {
                  token.content = emptyLine
                }
                return <span key={key} {...getTokenProps({ token, key })} />
              })}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}
