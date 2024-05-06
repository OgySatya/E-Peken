import { defineStore } from 'pinia'
import{ ref, reactive, computed } from 'vue'
export const useUserStore = defineStore('auth', () => {
  const newUser = ref({})
  
  const fullName = ref(localStorage.getItem("name"))
  function addUser () {
    let getData = localStorage.getItem("userData")
    let allUser = getData ? JSON.parse(getData) : [];
    let combine = allUser.concat(newUser.value)
    localStorage.setItem("userData", JSON.stringify(combine));
   }
    return {newUser, addUser,fullName}
  })