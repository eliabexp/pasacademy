const nextConfig = {
    headers() {
        const CSP = [
            'default-src \'self\'',
            'img-src *',
            'font-src *',
            'script-src \'self\' \'unsafe-inline\' \'unsafe-eval\'',
            'style-src * \'unsafe-inline\''
        ]

        const headers = [
            { key: 'Content-Security-Policy', value: CSP.join(';') },
            { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
            { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
            { key: 'X-Powered-By', value: 'PAS Academy' }
        ]

        return [{ 
            source: '/:path*',
            headers: headers
        }]
    },
    images: {
        remotePatterns: [
            {
                hostname: 'picsum.photos',
                protocol: 'https'
            },
            {
                hostname: 'upload.wikimedia.org',
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
