<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  This is Dynamic Routed Component

  <div>{{ route.params.id ?? '' }}</div>
  <RouterView></RouterView>
</template>
