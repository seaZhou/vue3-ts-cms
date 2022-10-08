import hpRequest from '../index'
import { Account, LoginInfo } from './types'
// 枚举
enum LoginApi {
  AccountLogin = '/login',
  UserInfo = '/users/',
  UserMenus = '/role/',
  Code = '/code'
}

export function accountLoginRequest(account: Account) {
  console.log(account, 'account')
  return hpRequest.post<LoginInfo>({
    url: LoginApi.AccountLogin,
    data: account,
    showLoading: true
  })
}

export function getUserById(id: number) {
  return hpRequest.get({
    url: LoginApi.UserInfo + id
  })
}

export function getUserMenus(id: number) {
  return hpRequest.get({
    url: LoginApi.UserMenus + id + '/menu'
  })
}

export function getCode() {
  return hpRequest.get({
    url: LoginApi.Code
  })
}
