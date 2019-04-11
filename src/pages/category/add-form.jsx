import React, {Component} from 'react'
import {Form,Input,Select} from 'antd'
import PropTypes from 'prop-types'

const Option = Select.Option

class AddForm extends Component {

  static propTypes = {
    categories:PropTypes.array.isRequired,
    parentId:PropTypes.string.isRequired,
    setForm:PropTypes.func.isRequired
  }

  componentWillMount() {
    //将当前props中的from传给父组件
    this.props.setForm(this.props.form)
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const {categories,parentId} = this.props
    return (
      <Form>
        <Form.Item>
          {
            getFieldDecorator('parentId',{
              initialValue:parentId
            })(
              <Select>
                <Option value="0">一级分类</Option>
                {
                  categories.map(c => <Option key={c._id} value={c._id}>{c.name}</Option>)
                }
              </Select>
            )
          }
        </Form.Item>

        <Form.Item>
          {
            getFieldDecorator('categoryName',{
              initialValue:''
            })(
              <Input type='text' placeholder='请输入分类名称'/>
            )
          }
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(AddForm)