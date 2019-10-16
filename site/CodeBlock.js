import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/github'

export const LineNo = {
  display: 'inline-block',
  width: '2em',
  userSelect: 'none',
  opacity: '0.3',
  textAlign: 'right',
  marginRight: '16px',
}

export default ({ children, className }) => {
  const language = className.replace(/language-/, '')
  const code = children.trim()

  return (
    <Highlight {...defaultProps} theme={theme} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              <span style={LineNo}>{i + 1}</span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}
