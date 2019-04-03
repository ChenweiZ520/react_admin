/*
  应用根组件
 */
import React, {Component} from 'react'
import {Button} from 'antd'

export default class App extends Component {

  render() {
    return (
      <div>
        <Button type='primary'>测试antd</Button>
      </div>
    )
  }
}

