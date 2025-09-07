import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <div className="header">
            <h1><Link href="/">URS Properties</Link></h1>
            <div className="nav">
              <Link className="button" href="/admin">Admin</Link>
              <a className="button" href="https://www.99acres.com/" target="_blank" rel="noreferrer">Inspiration: 99acres</a>
            </div>
          </div>
          {children}
          <div className="footer">© {new Date().getFullYear()} URS Tech Solution — Mini Property Listing Platform</div>
        </div>
      </body>
    </html>
  );
}
