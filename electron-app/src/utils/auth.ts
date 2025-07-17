import request from "./request";

export async function getToken(): Promise<string | null> {
    return window.auth.getToken();
}

export async function logout() {
    window.auth.deleteToken();
    window.location.reload();
}

export async function register(username: string, email: string, password: string) {
    const res = await request<{ token: string }>([
        '/user/register',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        }
    ]);
    if(res.token)
    {
        window.auth.setToken(res.token);
        window.location.reload();
    }
    return res;
}

export async function login(email: string, password: string) {
    const res = await request<{ token: string }>(['/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
    }]);

    if(res.token)
    {
        window.auth.setToken(res.token);
        window.location.reload();
    }
    return res;
}