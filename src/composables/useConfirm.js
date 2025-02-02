import { useConfirmStore } from '@/stores/confirm'

export function useConfirm(options = {}) {
  const confirmStore = useConfirmStore()
  return confirmStore.open(options)
}
