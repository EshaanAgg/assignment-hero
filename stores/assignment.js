import { Role } from "appwrite";
import { defineStore, acceptHMRUpdate } from "pinia";
import { useGlobalStore } from "./global";
import { useAccountStore } from "./account";
import api from "@/api";

const globalStore = useGlobalStore();
const accountStore = useAccountStore();
/* 
All the actions in this store automatically fetch/add the the documents for the current user due to creation of a session with Appwrite
Thus you can directly use these from the pages without worrying about the current user
*/

export const useAssignmentStore = defineStore("assignment", {
  state: () => ({
    assignments: [],
  }),
  actions: {
    async fetchAssignments() {
      try {
        const data = await api.listDocuments(Server.assignmentCollectionID);
      } catch (e) {
        console.log("Could not fetch documents ", e);
        globalStore.setError({
          show: true,
          message: "Failed to fetch assignments",
        });
      }
    },
    async addAssignment(data) {
      try {
        const userId = accountStore.account["$id"];
        data.userId = userId;
        const response = await api.createDocument(
          Server.assignmentCollectionID,
          data,
          Role.any(),
          [`user:${userId}`]
        );
        // Only the particular user has read and write access to the same
        this.assignments.push(response);
      } catch (e) {
        console.log("Could not create document", e);
        globalStore.setError({
          show: true,
          message: "Failed to this assignment group",
        });
      }
    },
  },
  async deleteAssignment(documentId) {
    try {
      await api.deleteDocument(Server.assignmentCollectionID, documentId);
      this.assignments = this.assignments.filter(
        (document) => document["$id"] !== documentId
      );
    } catch (e) {
      console.log("Could not delete document", e);
      globalStore.setError({
        show: true,
        message: "Failed to delete Todo",
      });
    }
  },
  async updateAssignment({ documentId, data }) {
    try {
      const userId = accountStore.account["$id"];
      data.userId = userId;
      const response = await api.updateDocument(
        Server.assignmentCollectionID,
        documentId,
        data,
        Role.any(),
        [`user:${userId}`]
      );
      const index = this.assignments.findIndex(
        (doc) => doc["$id"] === response["$id"]
      );
      if (index !== -1) this.assignments.splice(index, 1, response);
    } catch (e) {
      console.log("Could not update document", e);
      globalStore.setError({
        show: true,
        message: "Failed to updated Todo",
      });
    }
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAccountStore, import.meta.hot));
}
