import { buildBrowserDevRuntimeEnvDocument } from '../../../sdkwork-specs/tools/browser-runtime-env.mjs';
import { createBrowserRuntimeEnvVitePlugin } from '../../../sdkwork-specs/tools/browser-runtime-env-vite.mjs';
import { createSdkworkCredentialEntryBootstrapVitePlugin } from '../../../sdkwork-iam/apps/sdkwork-iam-common/packages/sdkwork-iam-credential-entry/src/vite.ts';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const deploymentProfile = process.env.SDKWORK_DEPLOYMENT_PROFILE ?? 'standalone';
const configuredEnvironment = process.env.SDKWORK_ENVIRONMENT ?? 'development';
const environment = configuredEnvironment === 'prod'
  ? 'production'
  : configuredEnvironment === 'dev'
    ? 'development'
    : configuredEnvironment;
const profileId = `${deploymentProfile}.${environment}`;
const distEnvironment = environment === 'production' ? 'prod' : environment === 'development' ? 'dev' : environment;
const port = Number(process.env.SDKWORK_DEV_PORT ?? '4173');

export default defineConfig({
  base: './',
  plugins: [
    createBrowserRuntimeEnvVitePlugin({
      name: 'recruitment-runtime-env-document',
      path: '/runtime-env.json',
      resolveServeDocument: () => JSON.stringify(buildBrowserDevRuntimeEnvDocument({ profileId })),
    }),
    createSdkworkCredentialEntryBootstrapVitePlugin({ environment }),
    react(),
  ],
  define: {
    'import.meta.env.VITE_SDKWORK_DEPLOYMENT_PROFILE': JSON.stringify(deploymentProfile),
    'import.meta.env.VITE_SDKWORK_ENVIRONMENT': JSON.stringify(environment),
  },
  server: {
    host: '127.0.0.1',
    port,
    strictPort: true,
  },
  preview: {
    host: '127.0.0.1',
    port,
    strictPort: true,
  },
  build: {
    outDir: `dist/${deploymentProfile}/${distEnvironment}`,
    emptyOutDir: true,
    sourcemap: true,
  },
});
