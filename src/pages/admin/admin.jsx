import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {Row,Col} from 'antd'
import MemoryUtils from '../../util/MemoryUtils'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Footer from '../../components/footer'
import './index.less'

export default class Admin extends Component {

  render() {
    //如果用户没有登录，自动跳转到登录界面
    if (!MemoryUtils.user || !MemoryUtils.user._id){
      return <Redirect to='/login'/>
    }

    return (
      <Row className='container'>
        <Col span={4}>
          <LeftNav/>
        </Col>
        <Col span={20} className='main'>
          <Header/>
          <div className='content'>主体内容区</div>
          <Footer/>
        </Col>
      </Row>
    )
  }
}