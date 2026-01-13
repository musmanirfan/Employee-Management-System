const BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function apiGet<T>(path: string): Promise<T> {
    const res = await fetch(`${BASE}${path}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
}

export async function apiSend<T>(path: string, method: 'POST' | 'PUT' | 'DELETE', body?: unknown): Promise<T> {
    const res = await fetch(`${BASE}${path}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json().catch(() => ({} as T));
}


const BASE2 = process.env.NEXT_PUBLIC_API_BASE_URL;


export async function apiGet1<T>(path: string): Promise<T> {
    const res1 = await fetch(`${BASE2}, ${path}`, { cache: 'no-store' });
    if (!res1.ok) throw new Error(await res1.text());
    return res1.json();
}


export async function apiSend1<T>(path: string, method: 'POST' | 'PUT' | 'DELETE', body?: unknown): Promise<T> {
    const res1 = await fetch(`${BASE2}, ${path}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined
    });
    if (!res1.ok) throw new Error(await res1.text());
    return res1.json().catch(()=>({} as T));
}