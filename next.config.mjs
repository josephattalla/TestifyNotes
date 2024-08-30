/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        removeConsole: process.env.NODE_ENV !== 'development' ? { exclude: ['error', 'warn'] } : false,
    }
};

export default nextConfig;
