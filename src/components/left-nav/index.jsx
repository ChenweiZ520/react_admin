/*
  左侧导航
 */

import React, {Component} from 'react'
import {Menu, Icon} from 'antd'
import {NavLink} from 'react-router-dom'
import './index.less'
import menuList from '../../config/menuconfig'
import url from '../../pages/login/images/logo.png'

const SubMenu = Menu.SubMenu
const Item = Menu.Item

export default class LeftNav extends Component {
  /*
  返回包含n个<Item>和<SubMenu>的数组
  */
  getMenuNodes = ()=>{
    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Icon type={item.icon} />
            <span>{item.title}</span>
          </Menu.Item>
        )
      } else {
        return (
          <SubMenu key={item.key} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
            {/*根据item.children数据数组, 生成<Item>的数组*/}
            {
              item.children.map(cItem => (
                <Menu.Item key={cItem.key}>
                  <Icon type={cItem.icon} />
                  <span>{cItem.title}</span>
                </Menu.Item>
              ))
            }
          </SubMenu>
        )
      }
    })
  }

  render() {
    return (
      <div className='left-nav'>
        <NavLink className='logo' to='/home'>
          <img src={url} alt="logo"/>
          <h1>硅谷后台</h1>
        </NavLink>
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
        >
          {
            this.getMenuNodes()
          }
        </Menu>
      </div>
    )
  }
}