import hpRequest from '../index'
import { Account, LoginInfo } from './types'
// 枚举
enum LoginApi {
  AccountLogin = '/api/public/user/login',
  route = '/system/menu/getRouters'
}

export function accountLoginRequest(account: Account) {
  console.log(account, 'account')
  return hpRequest.post<LoginInfo>({
    url: LoginApi.AccountLogin,
    data: account,
    showLoading: true
  })
}

export function getRoutes() {
  return hpRequest.get({
    url: LoginApi.route
  })
}
