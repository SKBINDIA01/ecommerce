/**
 * API utility functions for making requests to backend endpoints
 */

/**
 * Base URL for API requests - handles both server and client components
 */
export function getBaseUrl() {
  // For server-side requests we need to use the full URL
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3002';
  }
  
  // For client-side requests we can use relative URLs
  return '';
}

/**
 * Helper function to make GET requests
 * Works in both server and client components
 */
export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Helper function to make POST requests
 * Works in both server and client components
 */
export async function postApi<T>(endpoint: string, data: any, options: RequestInit = {}): Promise<T> {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}${endpoint}`;
  
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
}
