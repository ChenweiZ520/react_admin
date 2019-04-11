import React, {Component} from 'react'
import {
  Card,Table,Button,Icon,Select,Input,message
} from 'antd'
import LinkButton from '../../components/link-button'
import {reqProducts,reqSearchProducts,reqUpdateProductStatus} from '../../api/index'

import {PAGE_SIZE} from '../../util/constent'

const {option} = Select

export default class ProductIndex extends Component {
  state={
    products:[],
    total:0,
    loading:false,
    searchType:'productName',// 搜索的类型, productName: 按名称搜索, productDesc: 按描述搜索
    searchName:'' //搜索关键字
  }

  //获取指定页码的商品列表(可能带搜索)
  getProducts = async (pageNum)=>{
    //保存当前页
    this.pageNum = pageNum

    this.setState({
      loading:true
    })
    const {searchName,searchType} = this.state
    let result
    if (!searchName){
      //一般分页
      result = await reqProducts(pageNum,PAGE_SIZE)
    } else{
      //搜索分页
      result = await reqSearchProducts({pageSize:PAGE_SIZE, pageNum, searchType, searchName})
    }

    this.setState({
      loading:false
    })
    if (result.status===0){
      const {list,total} = result.data
      this.setState({
        total,
        products:list
      })
    }
  }

  //更新状态（上架/下架）
  updateProductStatus = async (productId,status)=>{
    const result = await reqUpdateProductStatus({productId,status})
    message.success('更新成功!')
    if (result.status===0){
      this.getProducts(this.pageNum)
    }
  }

  componentDidMount() {
    this.getProducts(1)
  }

  componentWillMount() {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (price) => ('¥' + price)
      },
      {
        title: '状态',
        width:150,
        render: (product) => {
          const btnText = product.status===1?'下架':'上架'
          const text = product.status===1?'在售':'已下架'
          const status = product.status===1 ? 2 : 1
          return (
            <span>
              <Button
                type='primary'
                onClick={()=>this.updateProductStatus(product._id,status)}
              >{btnText}</Button> &nbsp;
              <span>{text}</span>
            </span>
          )
        }
      },
      {
        title: '操作',
        width:115,
        render: (product) => (
          <span>
            <LinkButton onClick={()=>this.props.history.push('/product/detail',{product})}>详情</LinkButton>
            <LinkButton>修改</LinkButton>
          </span>
        )
      }
    ]
  }

  render() {

    const {products,total,loading,searchType,searchName} = this.state

    const title = (
      <span>
        <Select
          value={searchType}
          style={{width:120,marginRight:8}}
          onChange={(val)=> this.setState({searchType:val})}
        >
          <option value="productName">按名称搜索</option>
          <option value="productDesc">按描述搜索</option>
        </Select>
        <Input
          placeholder='关键字'
          style={{width:150,marginRight:8}}
          value={searchName}
          onChange={(event)=>this.setState({searchName:event.target.value})}
        />
        <Button type='primary' onClick={()=>this.getProducts(1)}>搜索</Button>
      </span>
    )
    const extra = (
      <Button type='primary'>
        <Icon type='plus'/>
        添加商品
      </Button>
    )

    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey='_id'
          loading={loading}
          dataSource={products}
          columns={this.columns}
          pagination={{total,pageSize:PAGE_SIZE,showQuickJumper:true,showSizeChanger:true}}
          onChange={(page)=>this.getProducts(page.current)}
        />
      </Card>
    )
  }
}