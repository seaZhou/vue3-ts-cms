export interface ISystemState {
  usersTotalCount: number
  usersList: any[]
  departmentTotalCount: number
  departmentList: any[]
  menuList: any[]
  roleList: any[]
  roleTotalCount: number
}

export interface IPagePayload {
  pageName: string
  queryInfo: any
  id?: number
}
