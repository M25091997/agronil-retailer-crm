import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // Load env file based on `mode` (development/production)
    const env = loadEnv(mode, process.cwd(), '');
    // console.log(env);

    return {
        plugins: [
            laravel({
                input: [
                    'resources/css/auth.css',
                    'resources/css/admin.css',
                    'resources/js/app.jsx',
                ],
                refresh: true,
            }),
            react(),
        ],
        define: {
            BASE_URL: JSON.stringify(env.VITE_BASE_URL), // load from .env
        },
    };
});
