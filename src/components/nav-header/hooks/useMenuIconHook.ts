import { ref, SetupContext } from 'vue'
interface useMenuIconProps {
  emit: SetupContext<['foldChange']>['emit']
}
export default function useMenuIcon({ emit }: useMenuIconProps) {
  const isFold = ref(false)
  const handleFoldClick = () => {
    isFold.value = !isFold.value
    emit('foldChange', isFold.value)
  }
  return [isFold, handleFoldClick]
}
