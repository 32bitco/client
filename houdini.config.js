/** @type {import('houdini').ConfigFile} */
const config = {
  schemaPath: './schema.graphql',
  sourceGlob: 'src/**/*.svelte',
  module: 'esm',
  framework: 'kit',
  apiUrl: 'http://localhost:7878/graphql',
  scalars: {
    DateTime: {
      type: 'Date',
      unmarshal(val) {
        return new Date(val);
      },
      marshal(val) {
        return val.toJSON();
      }
    },
    UUID: {
      type: 'UUID',
      marshal(val) {
        return val.toString();
      },
      unmarshal(val) {
        return val.toString();
      }
    }
  }
};

export default config;
