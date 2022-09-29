import { ILoginState } from './login/types'
import { ISystemState } from './main/system/types'
import { IAnalysis } from './main/analysis/types'
export interface IRootState {
  name: string
  entireRoles: any[]
  entireDepartments: any[]
  entireMenus: any[]
}

export interface IRootAndLogin {
  login: ILoginState
  analysis: IAnalysis
  system: ISystemState
}
export type IStore = IRootState & IRootAndLogin
