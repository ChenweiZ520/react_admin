import React, {Component} from 'react'
import {Card,List,Icon} from 'antd'
import LinkButton from '../../components/link-button'
import {reqCategory} from '../../api/index'
import {BASE_IMG_URL} from '../../util/constent'

const {Item} = List


export default class ProductDetail extends Component {
  state = {
    cName1:'',//一级分类名称
    cName2:'' //二级分类名称
  }

  //获取当前所属分类名称
  getCategoryNames = async ()=>{
    const {pCategoryId,categoryId} = this.props.location.state.product
    if (pCategoryId==='0'){//当前商品是一级分类下的商品
      const result = await reqCategory(categoryId)
      const cName1 = result.data.name
      this.setState({
        cName1
      })
    }else{//当前商品是二级分类下的商品
      const [result1,result2] = await Promise.all([reqCategory(pCategoryId),reqCategory(categoryId)])
      const cName1 = result1.data.name
      const cName2 = result2.data.name
      this.setState({
        cName1,
        cName2
      })
    }

  }

  componentDidMount() {
    this.getCategoryNames()
  }

  render() {

    const title = (
      <span>
        <LinkButton onClick={()=>this.props.history.goBack()}>
          <Icon type='arrow-left' style={{fontSize:20}}/>
        </LinkButton>
        商品详情
      </span>
    )
    const {name,desc,price,imgs,detail} = this.props.location.state.product
    const {cName1,cName2} = this.state

    return (
      <Card title={title}>
        <List className='detail'>
          <Item>
            <span className='left'>商品名称：</span>
            <span>{name}</span>
          </Item>
          <Item>
            <span className='left'>商品描述：</span>
            <span>{desc}</span>
          </Item>
          <Item>
            <span className='left'>商品价格：</span>
            <span>{price}元</span>
          </Item>
          <Item>
            <span className='left'>所属分类：</span>
            <span>{cName1}-->{cName2}</span>
          </Item>
          <Item>
            <span className='left'>商品图片：</span>
            <span>
              {
                imgs.map((img)=> <img key={img} src={BASE_IMG_URL + img} style={{width:120,height:120}}/>)
              }
            </span>
          </Item>
          <Item>
            <span className='left'>商品详情：</span>
            <div dangerouslySetInnerHTML={{__html: detail}}></div>
          </Item>
        </List>
      </Card>
    )
  }
}