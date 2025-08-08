/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STRIPE_PUBLISHABLE_KEY: string;
  readonly VITE_ZOOLOGIC_SERVER_URL?: string; // si lo tienes también
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
