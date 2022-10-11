import { Permission, Role } from "appwrite";
import { defineStore, acceptHMRUpdate } from "pinia";
import { useGlobalStore } from "./global";
import { useAccountStore } from "./account";
import api from "@/api";

/* 
All the actions in this store automatically fetch/add the the documents for the current user due to creation of a session with Appwrite
Thus you can directly use these from the pages without worrying about the current user
*/

export const useAssignmentStore = defineStore("assignment", {
  state: () => ({
    assignments: [],
  }),
  actions: {
    async getAssignment(documentID) {
      try {
        const Server = useRuntimeConfig().public;
        const data = await api.getDocument(
          Server.databaseID,
          Server.assignmentCollectionID,
          documentID
        );
        return data;
      } catch (e) {
        console.log("Could not fetch document ", e);
        const globalStore = useGlobalStore();
        globalStore.setError({
          show: true,
          message: "Failed to fetch the assignment.",
        });
      }
    },
    async fetchAssignments() {
      try {
        const Server = useRuntimeConfig().public;
        const data = await api.listDocuments(
          Server.databaseID,
          Server.assignmentCollectionID
        );
        this.assignments = data.documents;
      } catch (e) {
        console.log("Could not fetch documents ", e);
        const globalStore = useGlobalStore();
        globalStore.setError({
          show: true,
          message: "Failed to fetch assignments",
        });
      }
    },
    async addAssignment(data) {
      try {
        const accountStore = useAccountStore();
        const Server = useRuntimeConfig().public;

        const userID = accountStore.account["$id"];

        const response = await api.createDocument(
          Server.databaseID,
          Server.assignmentCollectionID,
          data,
          [
            Permission.read(Role.user(userID)),
            Permission.write(Role.user(userID)),
          ]
        );
        // Only the particular user has read and write access to the same
        this.assignments.push(response);
        return response;
      } catch (e) {
        console.log("Could not create document", e);
        const globalStore = useGlobalStore();
        globalStore.setError({
          show: true,
          message: "Failed to create this assignment.",
        });
      }
    },
  },
  async deleteAssignment(documentID) {
    try {
      const Server = useRuntimeConfig().public;
      await api.deleteDocument(
        Server.databaseID,
        Server.assignmentCollectionID,
        documentID
      );
      this.assignments = this.assignments.filter(
        (document) => document["$id"] !== documentID
      );
    } catch (e) {
      console.log("Could not delete document", e);
      const globalStore = useGlobalStore();

      globalStore.setError({
        show: true,
        message: "Failed to delete Assignment",
      });
    }
  },
  async updateAssignment({ documentID, data }) {
    try {
      const accountStore = useAccountStore();
      const Server = useRuntimeConfig().public;
      const userID = accountStore.account["$id"];

      const response = await api.updateDocument(
        Server.databaseID,
        Server.assignmentCollectionID,
        documentID,
        data,
        [
          Permission.read(Role.user(userID)),
          Permission.write(Role.user(userID)),
        ]
      );
      const index = this.assignments.findIndex(
        (doc) => doc["$id"] === response["$id"]
      );
      if (index !== -1) this.assignments.splice(index, 1, response);
    } catch (e) {
      console.log("Could not update document", e);
      const globalStore = useGlobalStore();
      globalStore.setError({
        show: true,
        message: "Failed to updated Assignment",
      });
    }
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAssignmentStore, import.meta.hot));
}
