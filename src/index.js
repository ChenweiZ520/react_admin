/*
  入口js
 */
import React from 'react'
import ReactDOM from 'react-dom'
import storageUtil from './util/storageUtil'
import MemoryUtils from './util/MemoryUtils'
import App from './App'

//将localStorage存储的user保存到内存中
const user = storageUtil.getUser()
//console.log('index---',user)
if (user._id){
  MemoryUtils.user = user
}

ReactDOM.render(<App/>,document.getElementById('root'))