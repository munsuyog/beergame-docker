import React from 'react'
import './RoleHoarding.css'
import Hoarding from '../SVGs/Hoarding'

const RoleHoarding = (props) => {
  return (
    <div id='role-hoarding' style={{...props.hoardingProps}}>
        <Hoarding className='role-hoarding-vector' />
        <span className='role-hoarding-text' style={{...props.textStyle}}>{props.role}</span>
    </div>
  )
}

export default RoleHoarding