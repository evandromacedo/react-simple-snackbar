import React from 'react'
import './Header.css'
import ReactIcon from '../Icon/ReactIcon'
import GitHubIcon from '../Icon/GitHubIcon'

export default function() {
  return (
    <header className="header">
      <a
        className="header__github-icon"
        href="https://github.com/evandromacedo/react-simple-snackbar"
        target="blank"
      >
        <GitHubIcon />
      </a>
      <a href="/" className="header__logo">
        <p className="header__logo__text">
          React <strong>Simple</strong> Snackbar
        </p>
        <div className="header__logo__react">
          <ReactIcon />
        </div>
      </a>
      <h1 className="header__title">It's meant to be a REALLY simple Snackbar!</h1>
      <div className="header__badges">
        <a
          href="https://www.npmjs.com/package/react-simple-snackbar"
          title="NPM Version"
          target="blank"
        >
          <img
            src="https://img.shields.io/npm/v/react-simple-snackbar"
            alt="NPM Version"
          />
        </a>
        <a
          href="https://travis-ci.org/evandromacedo/react-simple-snackbar"
          title="Build Status"
          target="blank"
        >
          <img
            src="https://travis-ci.org/evandromacedo/react-simple-snackbar.svg?branch=master"
            alt="Build Status"
          />
        </a>
        <a
          href="https://coveralls.io/github/evandromacedo/react-simple-snackbar?branch=master"
          title="Coverage Status"
          target="blank"
        >
          <img
            src="https://coveralls.io/repos/github/evandromacedo/react-simple-snackbar/badge.svg?branch=master"
            alt="Coverage Status"
          />
        </a>
        <a href="#" title="Gzipped size">
          <img
            src="https://img.badgesize.io/evandromacedo/react-simple-snackbar/master/dist/index.js.svg?compression=gzip"
            alt="Gzipped size"
          />
        </a>
        <a href="https://standardjs.com" title="JavaScript Style Guide" target="blank">
          <img
            src="https://img.shields.io/badge/code_style-standard-brightgreen.svg"
            alt="JavaScript Style Guide"
          />
        </a>
        <a
          href="https://github.com/evandromacedo/react-simple-snackbar/blob/master/LICENSE.md"
          title="MIT License"
          target="blank"
        >
          <img
            src="https://img.shields.io/npm/l/@testing-library/react-hooks.svg"
            alt="MIT License"
          />
        </a>
      </div>
      <nav>
        <ul className="header__nav__list">
          <li>
            <a href="#demo">Demo</a>
          </li>
          <li>
            <a href="#getting-started">Getting Started</a>
          </li>
          <li>
            <a href="#api">API</a>
          </li>
          <li>
            <a href="#testing">Testing</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
