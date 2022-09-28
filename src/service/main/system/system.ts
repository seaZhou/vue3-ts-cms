import hpRequest from '../../index'
export function getPageList(pageUrl: string, queryInfo: any) {
  return hpRequest.post({
    url: pageUrl,
    data: queryInfo
  })
}
export function deletePageData(pageUrl: string) {
  return hpRequest.delete({
    url: pageUrl
  })
}

export function newPageData(pageUrl: string, newData: any) {
  return hpRequest.post({
    url: pageUrl,
    data: newData
  })
}

export function editPageData(pageUrl: string, editData: any) {
  return hpRequest.patch({
    url: pageUrl,
    data: editData
  })
}
