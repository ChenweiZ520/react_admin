import React, {Component} from 'react'
import {
  Card,Icon,Form,Input,Button,Cascader
} from 'antd'
import LinkButton from '../../components/link-button'
import PictureWall from './picture-wall'
import RichTextEditor from './rich-text-editor'
import {reqCategories} from '../../api/index'

const {Item} = Form

class ProductAddUpdate extends Component {

  state = {
    options:[]
  }

  //获取指定一级列表的对应二级列表
  loadData = async (selectedOptions)=>{
    //console.log('loadData()',selectedOptions)
    const targetOption = selectedOptions[0]
    targetOption.loading = true
    await this.getCategories(targetOption.value)
    targetOption.loading = false
    const subcategories = this.subcategories
    if (subcategories && subcategories.length>0){
      const cOption = subcategories.map((c)=>({
        value:c._id,
        label:c.name,
        isLeaf: true
      }))
      targetOption.children = cOption
    }else{
      targetOption.isLeaf = true
    }
    this.setState({
      options:[...this.state.options]
    })

  }

  //获取一级列表
  getCategories = async (parentId)=>{
    const result = await reqCategories(parentId)
    if (result.status===0){
      const categories = result.data
      if (parentId===0){
        this.categories = categories
        this.initOption()

      }else{
        this.subcategories = categories
      }
    }
  }
  //生成级联的一级列表
  initOption = ()=>{
    const options = this.categories.map((c)=>({
      value:c._id,
      label:c.name,
      isLeaf: false
    }))
    this.setState({
      options
    })
  }

  componentDidMount() {
    this.getCategories(0)
  }

  render() {
    const {options} = this.state
    const {getFieldDecorator} = this.props.form
    const title = (
      <span>
        <LinkButton onClick={()=>this.props.history.goBack()}>
          <Icon type='arrow-left' style={{fontSize:20}}/>
        </LinkButton>
        添加商品
      </span>
    )
    //页面布局
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 }
    }

    return (
      <Card title={title}>
        <Form>
          <Item label="商品名称" {...formItemLayout}>
            {
              getFieldDecorator('name',{
                initialValue: '',
                rules: [{required: true, message: '商品名称必须输入'}]
              })(
                <Input placeholder='请输入商品名称'/>
              )
            }
          </Item>
          <Item label="商品描述" {...formItemLayout}>
            {
              getFieldDecorator('desc',{
                initialValue: ''
              })(
                <Input placeholder='请输入商品描述'/>
              )
            }
          </Item>
          <Item label="商品价格" {...formItemLayout}>
            {
              getFieldDecorator('price',{
                initialValue: '',
              })(
                <Input type='number' placeholder='请输入商品价格' addonAfter="元"/>
              )
            }
          </Item>
          <Item label="商品分类" {...formItemLayout}>
            {
              getFieldDecorator('categories',{
                initialValue: []
              })(
                <Cascader
                  options={options}
                  loadData={this.loadData}
                  placeholder="请选择分类"
                />
              )
            }
          </Item>
          <Item label="商品图片" {...formItemLayout}>
            <PictureWall/>
          </Item>
          <Item
            label="商品详情"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 20 }}
          >
            <RichTextEditor/>
          </Item>
          <Button type='primary'>提交</Button>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(ProductAddUpdate)