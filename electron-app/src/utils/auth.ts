import request from "./request";

export async function getToken(): Promise<string | null> {
    return window.auth.getToken();
}

export function logout() {
    window.auth.deleteToken();
}

export function register(username: string, email: string, password: string) {
    return request<{ token: string }>([
        '/user/register',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        }
    ]);
}

export function login(email: string, password: string) {
    return request<{ token: string }>(['/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
    }])
}