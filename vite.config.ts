import { defineConfig } from 'vite'
import ViteFonts from 'vite-plugin-fonts'

export default defineConfig({
    plugins: [
        ViteFonts({
            google: {
              preconnect: true,
              families: [
                {
                  name: 'Roboto',
                  defer: true
                }
              ]
            },
        })
    ],
    esbuild: {
        jsxFactory: 'h',
        
    }
});