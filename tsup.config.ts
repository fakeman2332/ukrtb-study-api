import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  target: 'es2020',
  dts: true,
  sourcemap: true,
  clean: true,
  keepNames: true,
  splitting: true, // Для tree-shaking
  treeshake: true, // Удаление неиспользуемого кода
  minify: false
});
