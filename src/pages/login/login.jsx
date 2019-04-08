import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import './login.less'
import logo from '../../assets/images/logo.png'
import LoginForm from './login-form'
import {reqLogin} from '../../api/index'
import storageUtil from '../../util/storageUtil'
import MemoryUtils from '../../util/MemoryUtils'

export default class Login extends Component {
  state = {
    errorMsg:''
  }
  login = async ({username,password})=>{
    //alert(`发送ajax请求：username=${username},password=${password}`)
    const result = await reqLogin(username,password)
    //console.log(result)
    if (result.status === 0){
      const user = result.data
      //保存到locall storage中
      //console.log('login()',user)
      storageUtil.saveUser(user)
      //保存到内存中
      MemoryUtils.user = user

      this.props.history.replace('/')
    }else {
      //显示错误信息
      this.setState({
        errorMsg:result.msg
      })
    }
  }

  render() {
    //如果已经登录，自动跳转到admin
    if (MemoryUtils.user && MemoryUtils.user._id) {
      return <Redirect to='/'/>
    }
    const {errorMsg}=this.state
    return (
      <div className='login'>
        <div className='login-header'>
          <img src={logo} alt="logo"/>
          React:后台管理系统
        </div>
        <div className='login-content'>
          <div className='login-box'>
            <div className='error-msg-wrap'>
              <div className={errorMsg?'show':''}>{errorMsg}</div>
            </div>
            <div className='title'>用户登录</div>
            <LoginForm login={this.login}/>
          </div>
        </div>
      </div>
    )
  }
}