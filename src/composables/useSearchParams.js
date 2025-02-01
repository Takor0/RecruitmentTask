import { useRoute, useRouter } from 'vue-router'

export function useSearchParams() {
  const route = useRoute()
  const router = useRouter()

  /**
   * Sets or removes a query parameter in the URL.
   *
   * @param {string} key - The query parameter key.
   * @param {string|null} value - The value to set. If null or undefined, the parameter is removed.
   */
  const setSearchParam = (key, value) => {
    if (!key) return
    const query = { ...route.query }

    if (!value) {
      delete query[key]
    } else {
      query[key] = value
    }

    router.replace({ query })
  }

  return {
    setSearchParam
  }
}
