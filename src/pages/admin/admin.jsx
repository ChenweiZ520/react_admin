import React, {Component} from 'react'
import {Redirect,Switch,Route} from 'react-router-dom'
import {Layout} from 'antd'
import MemoryUtils from '../../util/MemoryUtils'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Footer from '../../components/footer'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Line from '../charts/line'
import Bar from '../charts/bar'
import Pie from '../charts/pie'

const {Sider, Content} = Layout

export default class Admin extends Component {

  render() {
    //如果用户没有登录，自动跳转到登录界面
    if (!MemoryUtils.user || !MemoryUtils.user._id){
      return <Redirect to='/login'/>
    }

    return (
      <Layout>
        <Sider>
          <LeftNav/>
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{background:'white',margin:10}}>
            <Switch>
              <Route path='/home' component={Home}/>
              <Route path='/category' component={Category}/>
              <Route path='/product' component={Product}/>
              <Route path='/user' component={User}/>
              <Route path='/role' component={Role}/>
              <Route path="/charts/bar" component={Bar}/>
              <Route path="/charts/pie" component={Pie}/>
              <Route path="/charts/line" component={Line}/>
              <Redirect to='/home'/>
            </Switch>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    )
  }
}