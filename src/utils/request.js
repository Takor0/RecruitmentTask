export const request = async ({
                                url,
                                query = {},
                                body = null,
                                method = 'GET',
                                formData = null
                              }) => {
  const jsonMethods = new Set(['POST', 'PUT', 'PATCH', 'DELETE'])

  const urlObj = new URL(url, window.location.origin) // Ensure base URL is provided
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      urlObj.searchParams.append(key, value)
    }
  })
  const finalUrl = urlObj.toString()
  const headers = {}
  if (body && jsonMethods.has(method)) {
    headers['Content-Type'] = 'application/json'
  }

  const options = {
    method,
    headers,
    body: method !== 'GET' && method !== 'HEAD'
      ? formData || (body && typeof body === 'object' ? JSON.stringify(body) : body)
      : null
  }

  try {
    const response = await fetch(finalUrl, options)

    let responseData
    const contentType = response.headers.get('Content-Type')
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json()
    } else {
      responseData = await response.text()
    }

    if (!response.ok) {
      const errorMessage = responseData && responseData.message
        ? responseData.message
        : `Request failed with status ${response.status}`
      throw new Error(errorMessage)
    }

    return { responseData, response }
  } catch (error) {
    console.error('Request error:', error)
    throw error
  }
}
