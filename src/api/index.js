/*
包含n个接口请求函数的模块
根据接口文档编写(一定要具备这个能力)
接口请求函数: 使用ajax(), 返回值promise对象
 */

import jsonp from 'jsonp'
import ajax from './ajax'

export const reqLogin = (username,password)=>ajax('/login',{username,password},'POST')

/*
  获取天气信息的jsonp请求
 */

export const getWeather = (city)=>{
  return new Promise((resolve,reject)=>{
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url,{},(err,data)=>{
      if (!err && data.status==='success') {
        const {dayPictureUrl, weather} = data.results[0].weather_data[1]
        resolve({dayPictureUrl, weather})
      }else {
        alert('获取天气数据失败')
      }
    })
  })
}

// 获取分类列表
export const reqCategories = (parentId='0') => ajax('/manage/category/list', {parentId})

// 添加分类
export const reqAddCategory = (categoryName, parentId) => ajax('/manage/category/add', {categoryName, parentId}, 'POST')

// 更新分类
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax('/manage/category/update', {categoryId, categoryName}, 'POST')

// 根据分类ID获取分类
export const reqCategory = (categoryId) => ajax('/manage/category/info', {categoryId})

//获取商品分页列表
export const reqProducts = (pageNum,pageSize) => ajax('/manage/product/list',{pageNum,pageSize})

/*
搜索产品分页列表
pageSize: 每页的条目数
pageNum: 当前请求第几页 (从1开始)
searchType: productDesc / productName
searchName: 搜索的关键字
 */
export const reqSearchProducts = ({pageSize, pageNum, searchType, searchName})=>ajax('/manage/product/search',{
  pageSize,pageNum,[searchType]:searchName
})

//更新商品的状态（上架/下架）
export const reqUpdateProductStatus = ({productId,status})=>ajax('/manage/product/updateStatus',{productId,status},'POST')


