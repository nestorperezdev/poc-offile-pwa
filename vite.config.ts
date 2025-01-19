import {defineConfig} from 'vite';
import solidPlugin from 'vite-plugin-solid';
import {VitePWA} from "vite-plugin-pwa";
import fs from 'fs';

export default defineConfig({
    plugins: [
        solidPlugin(),
        VitePWA({
                injectRegister: 'script',
                registerType: 'autoUpdate',
                devOptions: {
                    enabled: true,
                },
                // cache all the imports
                workbox: {
                    globPatterns: ['**/*.{js,css,html,ico,png,svg,tsx}'],
                    runtimeCaching: [{
                        // cache the contabostorage photos
                        // this url pattern will match https://usc1.contabostorage.com/742e23541f0d4956a64c98b5c5cc2e63:test-images/2806.jpg and similar
                        urlPattern: new RegExp('^https://usc1.contabostorage.com/.*'),
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'contabostorage',
                            expiration: {
                                maxAgeSeconds: 60 * 60 * 24 * 365,
                            },
                            cacheableResponse: {
                                statuses: [200],
                            },
                        }
                    }],
                },
                // static assets in the public folder
                includeAssets: [
                    "**/*",
                ],
                manifest: {
                    "scope": "/",
                    "start_url": "/",
                    "name": "vite-template-solid",
                    "short_name": "vite-template-solid",
                    "display": "standalone",
                    "background_color": "#ffffff",
                    "lang": "en",
                    "theme_color": "#000000",
                    "icons": [
                        {
                            "src": "web-app-manifest-192x192.png",
                            "sizes": "192x192",
                            "type": "image/png",
                            "purpose": "any"
                        },
                        {
                            "src": "web-app-manifest-512x512.png",
                            "sizes": "512x512",
                            "type": "image/png",
                            "purpose": "any"
                        }
                    ],
                },
            }
        )
    ],
    server: {
        port: 3000,
        host: '0.0.0.0',
        https: {
            key: fs.readFileSync('./secrets/key.pem'),
            cert: fs.readFileSync('./secrets/cert.pem')
        } as any
    },
    build: {
        target: 'esnext',
    }
});
