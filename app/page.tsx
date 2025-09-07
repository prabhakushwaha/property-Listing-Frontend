'use client';
import { useEffect, useState } from 'react';
import PropertyCard from '@/components/PropertyCard';
import { listProperties, Property } from '@/lib/api';

export default function HomePage() {
  const [items, setItems] = useState<Property[]>([]);
  const [q, setQ] = useState('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      setLoading(true);
      const data = await listProperties({
        q: q || undefined,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
      });
      setItems(data);
    } catch (e:any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); /* initial */ }, []);

  return (
    <div>
      <div className="row" style={{marginBottom: 16}}>
        <input className="input" placeholder="Search by title or location (e.g., Noida)"
               value={q} onChange={e=>setQ(e.target.value)} />
        <input className="input" type="number" placeholder="Min Price" value={minPrice} onChange={e=>setMinPrice(e.target.value)} />
        <input className="input" type="number" placeholder="Max Price" value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} />
        <button className="button" onClick={load}>Search</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{color:'crimson'}}>{error}</p>}
      <div className="grid">
        {items.map((p: any) => <PropertyCard key={p._id} p={p} />)}
      </div>
    </div>
  );
}
