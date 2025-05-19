<script setup lang="ts">
import { APP_VERSION } from '../utils/version'

defineProps<{
    position?: 'top' | 'bottom' | 'left' | 'right'
    showLabel?: boolean
    context?: 'login' | 'results'
}>()
</script>

<template>
    <div class="version-display" :class="[position, context]">
        <span v-if="showLabel">Tabu app v{{ APP_VERSION }}</span>
    </div>
</template>

<style scoped>
.version-display {
    color: #000000;
}

.version-display.login {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}

.version-display.results {
    position: static;
    width: auto;
    text-align: right;
    display: block;
}

.version-display span {
    white-space: nowrap;
}

@media (min-width: 768px) {
    .version-display.login {
        font-size: 14px;
        bottom: 40px;
    }

    .version-display.results {
        font-size: 14px;
        right: auto;
        left: auto;
        transform: none;
        width: auto;
        text-align: right;
        display: block;
    }
}

@media (max-width: 768px) {
    .version-display.login {
        font-size: 12px;
        bottom: 120px;
    }

    .version-display.results {
        font-size: 12px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
