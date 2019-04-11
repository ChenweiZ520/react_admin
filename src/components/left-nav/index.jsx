/*
  左侧导航
 */

import React, {Component} from 'react'
import {Menu, Icon} from 'antd'
import {Link,withRouter} from 'react-router-dom'
import './index.less'
import menuList from '../../config/menuconfig'
import url from '../../assets/images/logo.png'

const SubMenu = Menu.SubMenu
const Item = Menu.Item

class LeftNav extends Component {
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
        const path = this.props.location.pathname
        const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
        if (cItem){
          const openKey = item.key
          this.openKey = openKey
        }

        //item有children递归调用
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

  /*
  在第一次render()前调用一次
  componentWillMount: 在第一次render()前调用一次, 为第一次render()准备数据(同步)
  componentDidMount: 在第一次render()之后调用一次, 启动异步任务, 后面异步更新状态重新render
  */
  componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList)
  }

  render() {
    const menuNodes = this.menuNodes
    let selectKey = this.props.location.pathname
    // 如果请求的路径是商品的子路由路径, selectKey置为商品的key
    if (selectKey.indexOf('/product/')===0){
      selectKey = '/product'
    }
    const openKey = this.openKey

    return (
      <div className='left-nav'>
        <Link className='logo' to='/home'>
          <img src={url} alt="logo"/>
          <h1>硅谷后台</h1>
        </Link>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[selectKey]}
          defaultOpenKeys={[openKey]}
        >
          {
            menuNodes
          }
        </Menu>
      </div>
    )
  }
}

export default withRouter(LeftNav)