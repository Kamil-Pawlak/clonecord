import { logout } from "./auth";

async function request<TResponse>(
  input: string | [string, RequestInit?]
): Promise<TResponse> {
  let url: string;
  let config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (typeof input === 'string') {
    url = input;
  } else {
    [url, config = { headers: { 'Content-Type': 'application/json' } }] = input;
  }

  const PORT = import.meta.env.VITE_PORT ?? 5000;
  try {
    // Create a URL using the current location as a fallback base.
    const parsedUrl = new URL(url, window.location.origin);
    parsedUrl.port = PORT;
    url = parsedUrl.toString();
  } catch (error) {
    console.warn(`Could not update port in URL: ${url}`, error);
  }

  const token = await window.auth.getToken?.();
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  const res = await fetch(url, config);

  if(res.status === 401) {
    console.warn('Unauthorized request, redirecting to login.');
    await logout();
  }

  if (!res.ok) {
    let message = 'unknown error';
    try{
      const errorBody = await res.json();
      message = errorBody.error ?? JSON.stringify(errorBody);
    }
    catch{
      message = await res.text();
    }
    throw new Error(`${message}`);
  }

  return res.json() as Promise<TResponse>;
}

export default request;
