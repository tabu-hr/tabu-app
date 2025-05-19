<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Login from '@/components/LoginItem.vue'
import VersionDisplay from '../components/VersionDisplay.vue'

const disableScroll = () => {
    document.body.style.overflow = 'hidden'
}

const enableScroll = () => {
    document.body.style.overflow = ''
}

onMounted(() => {
    disableScroll()
})

onUnmounted(() => {
    enableScroll()
})
</script>

<template>
    <div class="login-container">
        <main>
            <Login />
        </main>
        <img
            src="/tabu_big_logo_login.svg"
            alt="Tabu Logo"
            class="big-logo-desktop"
        />
        <img
            src="/tabu_big_logo_mobile.svg"
            alt="Tabu Logo"
            class="big-logo-mobile"
        />
        <VersionDisplay context="login" show-label />
    </div>
</template>

<style scoped>
.login-container {
    position: relative;
    min-height: 100vh;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
}

.big-logo-desktop {
    position: fixed;
    right: 0;
    top: 0;
    height: 100vh;
    width: auto;
    z-index: -1;
    object-fit: contain;
}

.big-logo-mobile {
    width: 100%;
    max-width: 100vw;
    height: auto;
    margin: 0;
    padding: 0;
    display: block;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
}

@media (max-width: 768px) {
    .big-logo-desktop {
        display: none;
    }
}

@media (min-width: 768px) {
    .big-logo-mobile {
        display: none;
    }
}

main {
    position: relative;
    z-index: 1;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
}
</style>
