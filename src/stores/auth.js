import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import useUserStore from "./user";

const useAuthStore = defineStore('auth', {
  state: () => ({
    userId: useLocalStorage('userId', null),
    isLoggedIn: useLocalStorage('isLoggedIn', false),
  }),
  actions: {
    login(username, password) {
      const userStore = useUserStore();
      const currentUser = userStore.users.find(user =>
        user.userName === username &&
        user.password === password
      );
      if (currentUser) {
        this.userId = currentUser.userId;
        this.isLoggedIn = true;
        return true;
      }
      return false;
    },
    logout() {
      this.userId = null;
      this.isLoggedIn = false;
    },
  }
})

export default useAuthStore;
