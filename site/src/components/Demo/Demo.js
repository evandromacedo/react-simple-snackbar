import React from 'react'
import './Demo.css'
import Default from './Default'
import CustomPosition from './CustomPosition'
import CustomStyles from './CustomStyles'
import CustomPositionAndStyles from './CustomPositionAndStyles'
import CustomDuration from './CustomDuration'
import LongText from './LongText'

export default function Demo() {
  return (
    <div className="demo">
      <Default />
      <CustomStyles />
      <CustomPosition />
      <CustomPositionAndStyles />
      <CustomDuration />
      <LongText />
    </div>
  )
}
