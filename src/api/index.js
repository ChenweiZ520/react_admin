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
        const {dayPictureUrl, weather} = data.results[0].weather_data[0]
        resolve({dayPictureUrl, weather})
      }else {
        alert('获取天气数据失败')
      }
    })
  })
}
