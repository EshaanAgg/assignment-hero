import { useAccountStore } from "@/stores/account";

export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path == "/assignments/create" || to.path == "/") {
    let accountStore = useAccountStore();
    let account = accountStore.account;
    if (!account) return navigateTo("/login");
    return navigateTo(from.path);
  }
});
