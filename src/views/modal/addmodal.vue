<script setup>
const props = defineProps({
  data: Object,
});
</script>
<template>
  <div class="inset-0 fixed left-0 top-0 bg-gray-500 bg-opacity-50">
    <div class="flex justify-center text-center mt-56">
      <div
        class="bg-white bg-opacity-80 text-black rounded-lg text-center shadow-xl p-6 w-64"
        role="dialog"
        aria-modal="true"
      >
        <div class="w-20 mx-auto text-xl">
          <img :src="data.image" class="mx-auto" />
          {{ data.title }}
        </div>
        <h2 class="text-lg font-bold">item added to Cart</h2>
      </div>
    </div>
  </div>
</template>
