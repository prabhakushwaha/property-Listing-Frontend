import { getProperty } from '@/lib/api';
import Image from 'next/image';

type Props = { params: { id: string } };

export default async function PropertyDetails({ params }: Props) {
  const p = await getProperty(params.id);

  return (
    <div className="card" style={{padding:16}}>
      <Image src={p.image || 'https://via.placeholder.com/600x400?text=Property'} alt={p.title} width={900} height={500} />
      <h2 style={{marginTop:12}}>{p.title}</h2>
      <div className="row">
        <span className="badge">₹ {p.price.toLocaleString('en-IN')}</span>
        <span className="badge">{p.location}</span>
        {p.propertyType ? <span className="badge">{p.propertyType}</span> : null}
        {p.areaSqFt ? <span className="badge">{p.areaSqFt} sq.ft.</span> : null}
        {p.bedrooms ? <span className="badge">{p.bedrooms} BHK</span> : null}
      </div>
      <p style={{marginTop:12, lineHeight:1.6}}>{p.description}</p>
      <p style={{opacity:0.7, fontSize:12, marginTop:8}}>Inspired by layout patterns from 99acres.com</p>
    </div>
  );
}
