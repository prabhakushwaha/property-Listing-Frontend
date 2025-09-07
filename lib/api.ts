const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';

export type Property = {
  _id?: string;
  title: string;
  price: number;
  location: string;
  image?: string;
  description?: string;
  bedrooms?: number;
  bathrooms?: number;
  areaSqFt?: number;
  propertyType?: string;
};

export async function apiFetch(path: string, init?: RequestInit) {
  const res = await fetch(`${base}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    cache: 'no-store'
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`API ${res.status}: ${t}`);
  }
  return res.json();
}

export async function listProperties(params?: { q?: string; minPrice?: number; maxPrice?: number; }) {
  const qs = new URLSearchParams();
  if (params?.q) qs.set('q', params.q);
  if (params?.minPrice != null) qs.set('minPrice', String(params.minPrice));
  if (params?.maxPrice != null) qs.set('maxPrice', String(params.maxPrice));
  return apiFetch(`/api/properties?${qs.toString()}`);
}

export async function getProperty(id: string) {
  return apiFetch(`/api/properties/${id}`);
}

export async function login(email: string, password: string) {
  const res = await apiFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  return res;
}

export async function createProperty(token: string, data: Property) {
  return apiFetch('/api/properties', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
}
