<template>
    <nav>
        <img
            src="/tabu_small_logo_app.svg"
            alt="Tabu Logo"
            class="small-logo-app"
        />
        <div class="nav-right">
            <button @click="handleLogout" class="logout-button">Logout</button>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { handleLogout } from '@/services/logout'
</script>

<style scoped>
nav {
    background-color: white;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.nav-right {
    display: flex;
    align-items: center;
    height: 100%;
}

.logout-button {
    background: none;
    border: none;
    color: inherit;
    font-family: Matter, Helvetica, Arial, sans-serif;
    font-weight: 500;
    text-decoration: underline;
    cursor: pointer;
    padding: 0;
    position: relative;
    z-index: 1;
}

@media (max-width: 768px) {
    nav {
        height: 60px;
    }

    .small-logo-app {
        padding: 20px;
    }

    .logout-button {
        font-size: 12px;
        margin-right: 20px;
    }
}

@media (min-width: 768px) {
    nav {
        height: 88px;
    }

    .small-logo-app {
        padding: 20px;
    }

    .logout-button {
        font-size: 18px;
        margin-right: 80px;
    }
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline;
    margin-right: 1em;
}

a {
    color: white;
    text-decoration: none;
}
</style>
