/*
  右边头部
 */

import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {Row,Col} from 'antd'
import {formateDate} from '../../util/util'
import {getWeather} from '../../api/index'
import menuList from '../../config/menuconfig'
import MemoryUtils from '../../util/MemoryUtils'
import LinkButton from '../link-button/index'
import './index.less'

class Header extends Component {

  state = {
    sysTime:formateDate(Date.now()),
    dayPictureUrl:'',
    weather:''
  }

  //根据请求路径查找对应的title
  getTitle = ()=>{
    const path = this.props.location.pathname
    for(var i = 0;i < menuList.length;i++){
      const item = menuList[i]
      if (item.key === path){
        return item.title
      }else if (item.children){
        const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
        if (cItem){
          return cItem.title
        }
      }
    }
  }
  //异步获取天气
  getWeather = async ()=>{
    const {dayPictureUrl, weather} = await getWeather('北京')
    this.setState({
      dayPictureUrl,
      weather
    })
  }
  //每隔1s获取一下当前时间
  getSysTime = ()=>{
    this.intervalId=setInterval(()=>{
      const sysTime = formateDate(Date.now())
      this.setState({sysTime})
    },1000)
  }
  // 在当前组件对象死亡前,清除定时器
  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  componentDidMount() {
    this.getWeather()
    this.getSysTime()
  }

  render() {
    const {sysTime,dayPictureUrl,weather} = this.state
    const username = MemoryUtils.user.username
    const title = this.getTitle()

    return (
      <div className='header'>
        <div className="header-top">
          <span>欢迎，{username}</span>
          <LinkButton>退出</LinkButton>
        </div>
        <Row className='header-bottom'>
          <Col span={4} className='title'>
            {title}
          </Col>
          <Col span={20} className='weather'>
            <span className='date'>{sysTime}</span>
            <img className='weather-img' src={dayPictureUrl} alt="weather"/>
            <span className='weather-detail'>{weather}</span>
          </Col>
        </Row>
      </div>
    )
  }
}

export default withRouter(Header)