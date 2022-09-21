import hpRequest from '../index'
import { Account, LoginInfo } from './types'
// 枚举
enum LoginApi {
  AccountLogin = '/auth/login',
  GetCode = '/code'
}

export function accountLoginRequest(account: Account) {
  return hpRequest.post<LoginInfo>({
    url: LoginApi.AccountLogin,
    data: account
  })
}
export function getCodeImg() {
  return hpRequest.get<LoginInfo>({
    url: LoginApi.GetCode
  })
}
