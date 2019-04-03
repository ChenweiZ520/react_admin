import React, {Component} from 'react'

import './login.less'
import logo from './images/logo.png'
import LoginForm from './login-form'

export default class Login extends Component {
  state = {
    errorMsg:''
  }
  login = ({username,password})=>{
    alert(`发送ajax请求：username=${username},password=${password}`)
  }

  render() {
    return (
      <div className='login'>
        <div className='login-header'>
          <img src={logo} alt="logo"/>
          React:后台管理系统
        </div>
        <div className='login-content'>
          <div className='login-box'>
            <div className='title'>用户登录</div>
            <LoginForm login={this.login}/>
          </div>
        </div>
      </div>
    )
  }
}