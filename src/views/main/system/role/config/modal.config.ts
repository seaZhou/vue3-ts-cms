import { IForm } from '@/base-ui/from'

export const modalConfig: IForm = {
  title: '新建角色',
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '角色名称',
      placeHolder: '请输入角色名称'
    },
    {
      field: 'intro',
      type: 'input',
      label: '角色描述',
      placeHolder: '请输入角色描述'
    }
  ],
  colLayout: { span: 24 },
  itemStyle: { padding: 0 }
}
