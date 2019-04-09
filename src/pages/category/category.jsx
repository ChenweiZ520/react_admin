import React, {Component} from 'react'
import {
  Card,
  Table,
  Button,
  Icon
} from 'antd'

import {reqCategories,reqAddCategory,reqUpdateCategory} from '../../api/index'
import LinkButton from '../../components/link-button/index'


/*
分类管理路由组件
 */
export default class Category extends Component {
  state = {
    categories:[], //一级分类列表
    subCategories:[], //二级分类列表
    parentId:'0', //父分类id
    parentName:'', //父分类名称
  }

  //异步获取分类列表
  getCategories = async ()=>{
    const {parentId} = this.state
    const result = await reqCategories(parentId)
    if (result.status===0){
      const categories = result.data
      if (parentId==='0'){
        //更新一级分类列表
        this.setState({
          categories
        })
      }else{
        //更新二级分类列表
        this.setState({
          subCategories:categories
        })
      }
    }
  }
  //显示指定的子分类列表
  showSubcategories = (category)=>{
    this.setState({
      parentId:category._id,
      parentName:category.name
    },()=>{
      this.getCategories()
    })
  }
  //显示一级列表
  showCategories = ()=>{
    this.setState({
      parentId : '0',
      parentName : '',
      subCategories : []
    })
  }

  componentDidMount() {
    this.getCategories()
  }
  componentWillMount() {
    this.columns = [{
      title: '分类列表',
      dataIndex: 'name',
    }, {
      title: '操作',
      width:300,
      render:(category)=>(
        <span>
          <LinkButton>修改分类</LinkButton>
          {
            this.state.parentId==='0'?<LinkButton onClick={()=>this.showSubcategories(category)}>查看子分类</LinkButton>:null
          }
        </span>
      )}
    ]
  }

  render() {

    const {categories,subCategories,parentId,parentName} = this.state

    const title = parentId==='0'?'一级分类列表':(
      <span>
        <LinkButton onClick={this.showCategories}>一级列表</LinkButton>
        <Icon type='arrow-right'/> &nbsp;
        <span>{parentName}</span>
      </span>
    )
    const extra = (
      <Button type='primary'>
        <Icon type='plus'/>添加
      </Button>
    )

    return (
      <Card
        title={title}
        extra={extra}
      >
        <Table
          bordered
          rowKey='_id'
          dataSource={parentId==='0'?categories:subCategories}
          columns={this.columns}
          pagination={{pageSize:5,showQuickJumper:true,showSizeChanger:true}}
        />
      </Card>
    )
  }
}