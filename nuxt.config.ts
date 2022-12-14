// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ["@/assets/main.css"],
  buildModules: ["@pinia/nuxt"],
  runtimeConfig: {
    public: {
      endpoint: process.env.NUXT_APP_ENDPOINT,
      project: process.env.NUXT_APP_PROJECT,
      assignmentCollectionID: process.env.NUXT_APP_ASSIGNMENT_COLLECTION_ID,
      fileCollectionID: process.env.NUXT_APP_FILE_COLLECTION_ID,
      databaseID: process.env.NUXT_APP_DATABASE_ID.toString(),
    },
  },
});
