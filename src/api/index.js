/*
包含n个接口请求函数的模块
根据接口文档编写(一定要具备这个能力)
接口请求函数: 使用ajax(), 返回值promise对象
 */

import ajax from './ajax'

export const reqLogin = (username,password)=>ajax('/login',{username,password},'POST')
