import adapter from '@sveltejs/adapter-cloudflare';
import autoprefixer from 'autoprefixer';
import houdini from 'houdini/preprocess';
import tailwindcss from 'tailwindcss';
import path from 'path';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // an array of file extensions that should be treated as Svelte components
  extensions: ['.svelte'],
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [preprocess(), houdini()],
  kit: {
    adapter: adapter(),
    vite: {
      resolve: {
        alias: {
          $graphql: path.resolve('./src/lib/graphql'),
          $houdini: path.resolve('.', '$houdini'),
          $lib: path.resolve('./src/lib')
        }
      },
      server: {
        fs: {
          allow: ['.']
        }
      },
      css: {
        postcss: {
          plugins: [
            tailwindcss({
              content: ['./src/**/*.svelte'],
              theme: {
                extend: {}
              },
              variants: {
                extend: {}
              },
              plugins: []
            }),
            autoprefixer
          ]
        }
      }
    }
  }
};

export default config;
