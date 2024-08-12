import {
  defineNuxtModule,
  createResolver,
  installModule,
  addComponentsDir,
} from "@nuxt/kit";

// Module options TypeScript interface definition
export interface ModuleOptions {
  css: boolean;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "@match-colours/ui",
    configKey: "matchColoursUi",
  },
  // Default configuration options of the Nuxt module
  defaults: {
    css: true,
  },
  async setup(options) {
    const resolver = createResolver(import.meta.url);

    await installModule("@nuxtjs/tailwindcss", {
      cssPath: options.css
        ? resolver.resolve("./runtime/assets/css/tailwind.css")
        : false,
      configPath: resolver.resolve("../tailwind.config"),
    });

    await addComponentsDir({
      path: resolver.resolve("./runtime/components"),
      pathPrefix: false,
      prefix: "",
      global: true,
    });
  },
});
