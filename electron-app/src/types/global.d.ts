// global.d.ts
export {};

declare global {
  interface Window {
    auth: {
      getToken: () => string | null;
      setToken(token: string);
      deleteToken();
    }
  }
}
