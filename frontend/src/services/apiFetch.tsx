export async function apiFetch(url: string, options: RequestInit) {
    const response = await fetch(url, options);
    if(response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        window.dispatchEvent(new Event("auth:unauthorized"));
    }
    return response
}
