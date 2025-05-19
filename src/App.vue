<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <RouterView />
</template>

<style scoped>
.app-container {
    min-height: 100vh;
    position: relative;
}

.version-footer {
    position: fixed;
    bottom: 0;
    right: 0;
    padding: 8px 16px;
    background-color: rgba(0, 0, 0, 0.1);
    font-size: 0.8em;
    color: #666;
}
</style>
