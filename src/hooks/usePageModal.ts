import { ref } from 'vue'
import PageModal from '@/components/page-modal'
type CallbackFn = (item?: any) => void
export const usePageModal = (
  newHandleCallback?: CallbackFn,
  editHandleCallback?: CallbackFn
) => {
  const modaInfo = ref({})
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const handleNewData = () => {
    modaInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    newHandleCallback && newHandleCallback()
  }
  const handleEditData = (item: any) => {
    modaInfo.value = { ...item }
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    editHandleCallback && editHandleCallback()
  }
  return [modaInfo, pageModalRef, handleNewData, handleEditData]
}
