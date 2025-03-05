<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header >
    <div class="w-4/5 mx-auto my-0">

      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

