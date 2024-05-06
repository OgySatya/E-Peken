import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import useAuthStore from "./auth";

const useUserStore = defineStore('user', {
  state: () => ({
    users: useLocalStorage('users', []),
  }),
  getters: {
    currentUser: (state) => {
      const authStore = useAuthStore();
      return state.users.find(user => user.id === authStore.userId);
    }
  },
  actions: {
    addUser(user) {
      user.id = new Date().valueOf()
      this.users.push(user)
    }
  }
});

export default useUserStore;
