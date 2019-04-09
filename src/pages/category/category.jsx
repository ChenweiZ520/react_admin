import React, {Component} from 'react'
import {
  Card,
  Table,
  Button,
  Icon,
  message,
  Modal
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
    loading:false
  }

  //异步获取分类列表
  getCategories = async ()=>{
    this.setState({
      loading:true
    })
    const {parentId} = this.state
    const result = await reqCategories(parentId)
    this.setState({
      loading:false
    })
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
    }else{
      message.error('获取列表失败')
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
      subCategories : [],
      showStatus:0   //0:不显示 1：显示添加 2：显示修改
    })
  }
  //添加分类
  addCategory = ()=>{

  }
  //修改分类
  updataCategory = ()=>{

  }
  //显示添加对话框
  showAdd = ()=>{
    this.setState({showStatus:1})
  }
  //显示修改对话框
  showUpdata = (category)=>{
    this.setState({showStatus:2})
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
          <LinkButton onClick={()=>this.showUpdata(category)}>修改分类</LinkButton>
          {
            this.state.parentId==='0'?<LinkButton onClick={()=>this.showSubcategories(category)}>查看子分类</LinkButton>:null
          }
        </span>
      )}
    ]
  }

  render() {

    const {categories,subCategories,parentId,parentName,loading,showStatus} = this.state

    const title = parentId==='0'?'一级分类列表':(
      <span>
        <LinkButton onClick={this.showCategories}>一级列表</LinkButton>
        <Icon type='arrow-right'/> &nbsp;
        <span>{parentName}</span>
      </span>
    )
    const extra = (
      <Button type='primary' onClick={this.showAdd}>
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
          loading={loading}
          dataSource={parentId==='0'?categories:subCategories}
          columns={this.columns}
          pagination={{pageSize:5,showQuickJumper:true,showSizeChanger:true}}
        />
        <Modal
          title="添加分类"
          visible={showStatus===1}
          onOk={this.addCategory}
          onCancel={()=>this.setState({showStatus:0})}
        >
          <p>添加分类</p>
        </Modal>
        <Modal
          title="修改分类"
          visible={showStatus===2}
          onOk={this.updataCategory}
          onCancel={()=>this.setState({showStatus:0})}
        >
          <p>修改分类</p>
        </Modal>
      </Card>
    )
  }
}