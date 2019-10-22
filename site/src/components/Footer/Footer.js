import React from 'react'
import './Footer.css'
import GitHubIcon from '../Icon/GitHubIcon'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>
          Created by{' '}
          <a href="https://github.com/evandromacedo" target="blank">
            Evandro Macedo
          </a>{' '}
          under the{' '}
          <a
            href="https://github.com/evandromacedo/react-simple-snackbar/blob/master/LICENSE.md"
            target="blank"
          >
            MIT License
          </a>
          .
        </p>
        <a href="https://github.com/evandromacedo/react-simple-snackbar" target="blank">
          <GitHubIcon />
        </a>
      </div>
    </footer>
  )
}
