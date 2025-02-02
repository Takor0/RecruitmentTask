import { useAlertStore } from '@/stores/alert'

export const useAlert = (options = {}) => {
  const alertStore = useAlertStore()
  alertStore.open(options)
}
