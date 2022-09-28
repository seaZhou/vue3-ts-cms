import { ref } from 'vue'
import pageContent from '@/components/page-content'
export const usePageSearch = () => {
  const pageContentRef = ref<InstanceType<typeof pageContent>>()
  const handleQueryClick = (queryInfo: any) => {
    console.log(pageContentRef.value)
    pageContentRef.value?.getPageData(queryInfo)
  }
  const handleRestClick = () => {
    pageContentRef.value?.getPageData()
  }
  return [pageContentRef, handleQueryClick, handleRestClick]
}
