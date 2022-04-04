import adapter from '@sveltejs/adapter-cloudflare';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // an array of file extensions that should be treated as Svelte components
  extensions: ['.svelte'],

  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [preprocess()],
  kit: {
    adapter: adapter(),
    vite: {
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
