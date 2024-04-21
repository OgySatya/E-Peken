<script setup>
import { ref } from 'vue'


</script>

<template>
  <nav
    class="flex mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 justify-between bg-gradient-to-r from-indigo-100 via-white to-lime-100 rounded-md">
    <ul class="flex p-1">
      <li class="mr-6 text-2xl font-bold text-sky-500 hover:bg-gray-700 hover:text-white rounded-md px-2.5 py-1">
        <RouterLink to="/">Home</RouterLink>
      </li>
      <li class="mr-6 text-2xl font-bold text-sky-500 hover:bg-gray-700 hover:text-white rounded-md px-2.5 py-1">
        <RouterLink to="/product">Product</RouterLink>
      </li>
      <li class="mr-6 text-2xl font-bold text-sky-500 hover:bg-gray-700 hover:text-white rounded-md px-2.5 py-1">
        <RouterLink to="/about">About</RouterLink>
      </li>
    </ul>

  </nav>
</template>

<style scoped></style>
