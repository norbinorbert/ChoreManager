import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'ChoreManager',
        short_name: 'CM',
        description: 'Manage your chores efficiently!',
        theme_color: '#242424',
        display: 'standalone',
        start_url: '/',
        screenshots: [
          {
            src: '/screenshots/chore_manager_screenshot.png',
            sizes: '2493x1222',
            form_factor: 'wide',
            type: 'image/png',
          },
          {
            src: '/screenshots/home_page_screenshot.png',
            sizes: '685x919',
            type: 'image/png',
          },
        ],
        icons: [
          {
            src: '/icons/add_new_chore.png',
            sizes: '280x280',
            type: 'image/png',
          },
          {
            src: '/icons/home_page.png',
            sizes: '279x279',
            type: 'image/png',
          },
          {
            src: '/icons/to_do_list.png',
            sizes: '294x294',
            type: 'image/png',
          },
          {
            src: '/icons/update_chore.png',
            sizes: '272x272',
            type: 'image/png',
          },
          {
            src: '/icons/view_chore.png',
            sizes: '265x265',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) =>
              request.destination === 'style' || request.destination === 'script' || request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 24 * 60 * 60,
              },
            },
          },
          {
            urlPattern: /^http:\/\/localhost\:8080\/chores/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 24 * 60 * 60,
              },
            },
          },
        ],
      },
    }),
  ],
});
