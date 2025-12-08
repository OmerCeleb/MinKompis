// src/app/not-found.tsx
export default function NotFound() {
    return (
        <html lang="en">
        <head>
            <link rel="stylesheet" href="/globals.css" />
        </head>
        <body>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-neutral-50 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center">
                <div className="mb-8 relative">
                    <div style={{ fontSize: '200px', fontWeight: 'bold', color: '#fed7aa', lineHeight: 1, userSelect: 'none' }}>
                        404
                    </div>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: '128px', height: '128px', background: 'linear-gradient(to bottom right, #fb923c, #ea580c)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
                            <svg style={{ width: '64px', height: '64px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div>
                        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#171717', marginBottom: '16px' }}>
                            Page Not Found
                        </h1>
                        <p style={{ fontSize: '1.125rem', color: '#525252', maxWidth: '28rem', margin: '0 auto' }}>
                            The page you're looking for might have been moved, deleted, or never existed.
                        </p>
                    </div>

                    <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #e5e5e5', padding: '24px', maxWidth: '28rem', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#171717', marginBottom: '16px' }}>
                            What can you do?
                        </h2>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left', listStyle: 'none', padding: 0 }}>
                            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                <span style={{ fontSize: '1.5rem' }}>🔍</span>
                                <span style={{ fontSize: '0.875rem', color: '#525252', paddingTop: '4px' }}>Check the URL and try again</span>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                <span style={{ fontSize: '1.5rem' }}>🏠</span>
                                <span style={{ fontSize: '0.875rem', color: '#525252', paddingTop: '4px' }}>Return to the homepage</span>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                <span style={{ fontSize: '1.5rem' }}>📧</span>
                                <span style={{ fontSize: '0.875rem', color: '#525252', paddingTop: '4px' }}>Contact us if you need help</span>
                            </li>
                        </ul>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
                        <a href="/" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '12px 24px', background: '#ea580c', color: 'white', fontWeight: 500, borderRadius: '8px', textDecoration: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
                            Go to Homepage
                        </a>
                        <a href="/services" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '12px 24px', background: 'white', border: '1px solid #d4d4d4', color: '#404040', fontWeight: 500, borderRadius: '8px', textDecoration: 'none' }}>
                            Browse Services
                        </a>
                    </div>

                    <p style={{ fontSize: '0.875rem', color: '#737373' }}>
                        Need help? <a href="/contact" style={{ color: '#ea580c', fontWeight: 500, textDecoration: 'none' }}>Contact support</a>
                    </p>
                </div>
            </div>
        </div>
        </body>
        </html>
    );
}