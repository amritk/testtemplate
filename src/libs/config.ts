/**
 * Config to be shared with app
 */
const config = {
    debug: process.env.NODE_ENV === 'development',
    version: '0.0.1',
    os: 'web'
}

// Env vars
switch (process.env.NODE_ENV) {
    case 'production':
        break
    case 'staging':
        break
    case 'ngrok':
        break
}

export default config
