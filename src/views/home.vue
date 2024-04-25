<script setup>

</script>
<template>
 <header>
        <h1 class="grad">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat reprehenderit sunt doloribus assumenda expedita eos, quia, accusantium, mollitia labore minima iure modi illo suscipit dignissimos eius amet repudiandae dolores recusandae!</h1>
    </header>
</template>
<style>
@import url("https://fonts.googleapis.com/css2?family=Asap&family=Roboto:ital,wght@0,500;0,900;1,500&display=swap");

header {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  margin: 0;
}
.grad {
  color: transparent;
  background-image: linear-gradient(to right ,#553c9a, #ee4b2b, #00c2cb, #ff7f50, #553c9a);
  -webkit-background-clip: text;
  background-clip: text;    
  background-size: 200%;
  background-position: -200%;
  animation: animated-gradient 5s infinite alternate-reverse;      
}
@keyframes animated-gradient{
  to{
    background-position: 200%;
  }
}
</style>