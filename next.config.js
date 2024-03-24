const nextConfig = {
    headers() {
        const CSP = [
            "default-src 'self'",
            "connect-src 'self' storage.googleapis.com",
            "frame-src 'self' youtube.com",
            "font-src 'self'",
            'img-src * pasacademy.storage.googleapis.com blob: data:',
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
            "style-src 'self' 'unsafe-inline'"
        ]

        const headers = [
            { key: 'Content-Security-Policy', value: CSP.join(';') },
            { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
            { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ]

        return [{ 
            source: '/:path*',
            headers: headers
        }]
    },
    images: {
        remotePatterns: [
            {
                hostname: 'pasacademy.storage.googleapis.com',
                protocol: 'https'
            },
            {
                hostname: 'picsum.photos',
                protocol: 'https'
            }
        ]
    },
    redirects() {
        return [
            {
                source: '/instagram',
                destination: 'https://instagram.com/pasacademy',
                permanent: false
            },
            {
                source: '/:path(twitter|x)',
                destination: 'https://twitter.com/pasacademy.com.br',
                permanent: false
            }
        ]
    },
    poweredByHeader: false
}

module.exports = nextConfig
