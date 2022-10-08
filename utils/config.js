import dotenv from "dotenv";
dotenv.config();

export const Server = {
  endpoint: process.env.NUXT_APP_ENDPOINT,
  project: process.env.NUXT_APP_PROJECT,
  collectionID: process.env.NUXT_APP_COLLECTION_ID,
  database: process.env.NUXT_APP_DATABASE_ID.toString(),
};
