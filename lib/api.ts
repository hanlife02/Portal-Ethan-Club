const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4567"

// Helper function to handle API requests
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("access_token")

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "An unknown error occurred" }))
    throw new Error(error.error || "API request failed")
  }

  return response.json()
}

// Retry API request with exponential backoff
async function retryApiRequest(endpoint: string, options: RequestInit = {}, maxRetries = 3) {
  let retries = 0

  while (retries < maxRetries) {
    try {
      return await apiRequest(endpoint, options)
    } catch (error) {
      retries++
      if (retries >= maxRetries) throw error

      // Exponential backoff
      const delay = Math.min(1000 * 2 ** retries, 10000)
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }
}

// Services API
export async function fetchServices() {
  return retryApiRequest("/api/portal/services")
}

export async function addService(service: any) {
  return apiRequest("/api/portal/services", {
    method: "POST",
    body: JSON.stringify(service),
  })
}

export async function updateService(id: string, service: any) {
  return apiRequest(`/api/portal/services/${id}`, {
    method: "PUT",
    body: JSON.stringify(service),
  })
}

export async function deleteService(id: string) {
  return apiRequest(`/api/portal/services/${id}`, {
    method: "DELETE",
  })
}
