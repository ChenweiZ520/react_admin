/*
  左侧导航
 */

import React, {Component} from 'react'
import {Menu, Icon} from 'antd'
import {Link} from 'react-router-dom'
import './index.less'
import menuList from '../../config/menuconfig'
import url from '../../assets/images/logo.png'

const SubMenu = Menu.SubMenu
const Item = Menu.Item

export default class LeftNav extends Component {
  /*
  返回包含n个<Item>和<SubMenu>的数组
  */

  getMenuNodes = (list)=>{
    return list.reduce((pre,item)=>{
      if (!item.children) {
        pre.push((
          <Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Item>
        ))
      }else{
        pre.push((
          <SubMenu key={item.key} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
            {
              this.getMenuNodes(item.children)
            }
          </SubMenu>
        ))
      }
      return pre
    },[])
  }

  getMenuNodes_map = ()=>{
    return menuList.map(item => {
      if (!item.children) {
        return (
          <Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Item>
        )
      } else {
        return (
          <SubMenu key={item.key} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
            {/*根据item.children数据数组, 生成<Item>的数组*/}
            {
              item.children.map(cItem => (
                <Item key={cItem.key}>
                  <Link to={cItem.key}>
                    <Icon type={cItem.icon}/>
                    <span>{cItem.title}</span>
                  </Link>
                </Item>
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
        <Link className='logo' to='/home'>
          <img src={url} alt="logo"/>
          <h1>硅谷后台</h1>
        </Link>
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
        >
          {
            this.getMenuNodes(menuList)
          }
        </Menu>
      </div>
    )
  }
}