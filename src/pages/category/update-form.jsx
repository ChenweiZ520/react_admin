import React, {Component} from 'react'
import {Form,Input} from 'antd'
import PropTypes from 'prop-types'

class UpdateForm extends Component {

  static propTypes = {
    categoryName:PropTypes.string.isRequired,
    setForm:PropTypes.func.isRequired
  }

  componentWillMount() {
    //将当前props中的from传给父组件
    this.props.setForm(this.props.form)
    //console.log('update--',this.props.form)
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const {categoryName} = this.props
    return (
      <Form>
        <Form.Item>
          {
            getFieldDecorator('categoryName',{
              initialValue:categoryName
            })(
              <Input type='text' placeholder='请输入分类名称'/>
            )
          }
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(UpdateForm)