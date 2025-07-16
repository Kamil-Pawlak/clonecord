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

  if (!res.ok) {
    const message = await res.text();
    throw new Error(`Error ${res.status}: ${message}`);
  }

  return res.json() as Promise<TResponse>;
}

export default request;
