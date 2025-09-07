'use client';
import { useEffect, useState } from 'react';
import { createProperty, login, Property } from '@/lib/api';

export default function AdminPage() {
  const [email, setEmail] = useState('admin@test.com');
  const [password, setPassword] = useState('admin123');
  const [token, setToken] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (t) setToken(t);
  }, []);

  async function doLogin() {
    try {
      const res = await login(email, password);
      localStorage.setItem('token', res.token);
      setToken(res.token);
      setMsg('Logged in as admin.');
    } catch (e:any) {
      setMsg(e.message);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data: Property = {
      title: String(form.get('title')||''),
      price: Number(form.get('price')||0),
      location: String(form.get('location')||''),
      image: String(form.get('image')||''),
      description: String(form.get('description')||''),
      bedrooms: Number(form.get('bedrooms')||0),
      bathrooms: Number(form.get('bathrooms')||0),
      areaSqFt: Number(form.get('areaSqFt')||0),
      propertyType: String(form.get('propertyType')||'Apartment'),
    };
    try {
      if (!token) throw new Error('Not authenticated');
      const created = await createProperty(token, data);
      setMsg(`Created: ${created.title}`);
      (e.target as HTMLFormElement).reset();
    } catch (e:any) {
      setMsg(e.message);
    }
  }

  if (!token) {
    return (
      <div className="card">
        <h3>Admin Login</h3>
        <div className="form">
          <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="button" onClick={doLogin}>Login</button>
          {msg && <p>{msg}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h3>Add New Property</h3>
      <form className="form" onSubmit={handleSubmit}>
        <input className="input" name="title" placeholder="Title e.g., 2BHK Apartment in Noida" required />
        <div className="row">
          <input className="input" name="price" type="number" placeholder="Price (INR)" required />
          <input className="input" name="location" placeholder="Location e.g., Sector 62, Noida" required />
        </div>
        <input className="input" name="image" placeholder="Image URL" />
        <textarea className="input" name="description" placeholder="Description" rows={4} />
        <div className="row">
          <input className="input" name="bedrooms" type="number" placeholder="Bedrooms" />
          <input className="input" name="bathrooms" type="number" placeholder="Bathrooms" />
          <input className="input" name="areaSqFt" type="number" placeholder="Area (sq.ft.)" />
          <select name="propertyType">
            <option>Apartment</option>
            <option>House</option>
            <option>Villa</option>
            <option>Plot</option>
            <option>Other</option>
          </select>
        </div>
        <button className="button" type="submit">Create</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
