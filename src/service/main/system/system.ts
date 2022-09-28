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
