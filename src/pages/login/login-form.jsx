/*
    1.收集表单数据
    2.表单验证
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button, Form, Icon, Input} from "antd";


const FormItem = Form.Item

class LoginForm extends Component {
  static propTypes = {
    login:PropTypes.func.isRequired
  }

  //获取表单数据
  handleSubmit = (event)=>{
    event.preventDefault()
    //进行表单验证
    this.props.form.validateFields ((err,values)=>{
      if (!err){
        values = this.props.form.getFieldsValue()
        //console.log('发送登录的ajax请求',values)
        this.props.login(values)

      }else{
        //表单验证不通过
      }
    })



  }
  //校验密码
  validatePwd = (rule,value,callback)=>{
    value = value.trim()
    if (value === ''){
      callback('密码不能为空')
    } else if (value.length < 4 || value.length > 8){
      callback('密码长度必须是4到8位')
    }else{
      callback()
    }
  }

  render() {
    const {getFieldDecorator} = this.props.form
    return (
      <Form className="login-form" onSubmit={this.handleSubmit}>
        <FormItem>
          {
            getFieldDecorator('username',{
              initialValue:'admin',
              rules: [
                { whitespace:true, required: true, message: '必须输入用户名' },
                { min: 4, message: '用户名长度不能小于4'}
              ],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />
            )
          }
        </FormItem>
        <FormItem>
          {
            getFieldDecorator('password',{
              initialValue:'',
              rules: [
                { validator: this.validatePwd }
              ]
            })(
              <Input type='password' prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
            )
          }
        </FormItem>
        <Button htmlType="submit" type='primary' className='login-form-button'>登录</Button>
      </Form>
    )
  }
}

const WrapLoginForm = Form.create()(LoginForm)
export default WrapLoginForm

