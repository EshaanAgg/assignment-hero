import dotenv from "dotenv";
dotenv.config();

export const Server = {
  endpoint: process.env.NUXT_APP_ENDPOINT,
  project: process.env.NUXT_APP_PROJECT,
  assignmentCollectionID: process.env.NUXT_APP_ASSIGNMENT_COLLECTION_ID,
  fileCollectionID: process.env.NUXT_APP_FILE_COLLECTION_ID,
  database: process.env.NUXT_APP_DATABASE_ID.toString(),
};
