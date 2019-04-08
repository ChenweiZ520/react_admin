/*
通用的像链接的按钮的组件
 */

import React, {Component} from 'react'
import './index.less'

export default function LinkButton(props) {
  return <button {...props} className='link-button'/>
}