export async function getToken(): Promise<string|null>
{
    return window.auth.getToken();
}

export function logout()
{
    window.auth.deleteToken();
}