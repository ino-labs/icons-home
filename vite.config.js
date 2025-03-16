import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePluginRadar } from 'vite-plugin-radar'

export default defineConfig({
    plugins: [
        react(),
        VitePluginRadar({
            // Google Analytics tag injection
            analytics: {
                id: 'G-NLEXF5J2LQ',
            },
        })
    ],
    server: {
        open: true,
        host: true,
        historyApiFallback: true,
    }
});
