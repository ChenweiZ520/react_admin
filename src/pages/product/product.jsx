import React, {Component} from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'

import ProductIndex from './index'
import ProductDetail from './detail'
import ProductAddUpdate from './add-update'
import './product.less'

/*
产品管理路由组件
 */
export default class Product extends Component {
  render() {
    return (
      <Switch>
        <Route exact={true} path='/product' component={ProductIndex}/>
        <Route path='/product/detail' component={ProductDetail}/>
        <Route path='/product/addupdate' component={ProductAddUpdate}/>
        <Redirect to='/product'/>
      </Switch>
    )
  }
}