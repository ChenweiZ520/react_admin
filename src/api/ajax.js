/*
  发送ajax请求的函数模块
  包装axios
  函数返回值是promise对象
 */

import axios from 'axios'
import {message} from 'antd'

export default function ajax(url,data={},type="GET") {
  return new Promise(function (resolve,reject) {
    let promise
    if (type === 'GET'){
      promise = axios.get(url,{ params: data})
    }else{
      promise = axios.post(url,data)
    }
    promise.then(response=>{
      // 请求成功, 调用resolve()并传递成功的数据
      resolve(response.data)

    }).catch(error=>{
      // 请求失败了, 不调用reject(), 显示请求错误的提示
      message.error('请求异常' + error.message)
    })

  })
}



