/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        removeConsole: process.env.NODE_ENV !== 'development' ? { exclude: ['info', 'error'] } : false,
    }
};

export default nextConfig;
