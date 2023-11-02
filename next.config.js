const nextConfig = {
    headers() {
        const headers = [
            { key: 'Content-Security-Policy', value: 'default-src \'self\'; img-src *; font-src *; script-src \'self\' \'unsafe-inline\' \'unsafe-eval\'; style-src *' },
            { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
            { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
            { key: 'X-Powered-By', value: 'PAS Academy' }
        ]

        return [{ 
            source: '/:path*',
            headers: headers
        }]
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
