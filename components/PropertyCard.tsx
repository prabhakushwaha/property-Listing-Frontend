'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/lib/api';

export default function PropertyCard({ p }: { p: Property & { _id: string } }) {
  return (
    <Link href={`/property/${p._id}`} className="card">
      <Image src={p.image || 'https://via.placeholder.com/600x400?text=Property'} alt={p.title} width={600} height={400} />
      <h3 style={{margin:'10px 0 6px 0'}}>{p.title}</h3>
      <div className="row">
        <span className="badge">₹ {p.price.toLocaleString('en-IN')}</span>
        <span className="badge">{p.location}</span>
        {p.propertyType ? <span className="badge">{p.propertyType}</span> : null}
      </div>
    </Link>
  );
}
