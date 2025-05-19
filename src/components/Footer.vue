<script lang="ts">
import { defineComponent } from 'vue'
import VersionDisplay from './VersionDisplay.vue'

export default defineComponent({
    name: 'Footer',
    components: {
        VersionDisplay
    }
})
</script>

<template>
    <footer class="footer">
        <div class="footer-content">
            <div class="looker-info">
                <p>
                    Looking for more data? You can still access additional
                    insights in
                    <a
                        href="https://results.tabu.hr/"
                        target="_blank"
                        rel="noopener noreferrer"
                        >Looker Studio</a
                    >.
                </p>
            </div>
            <div class="version-display-container">
                <div class="version-info">
                    <div class="version-block">
                        <VersionDisplay context="results" show-label />
                    </div>
                    <div class="release-link-block">
                        <a
                            href="https://github.com/tabu-hr/tabu-app/wiki/Release-notes"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="release-notes-link"
                            >Release notes</a
                        >
                    </div>
                </div>
            </div>
        </div>
        <img src="/tabu_footer_logo.svg" alt="Tabu Logo" class="footer-logo" />
    </footer>
</template>

<style scoped>
.footer {
    margin-top: auto;
    position: relative;
    width: 100%;
    padding-bottom: 120px;
}

.footer-logo {
    width: 100%;
    object-fit: cover;
    position: absolute;
    bottom: -75px;
    left: 0;
    z-index: -1;
}

.footer-content {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0;
}

.looker-info {
    font-size: 14px;
    max-width: 600px;
    margin-top: 200px;
}

.version-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.release-notes-link {
    font-size: 14px;
}

.release-notes-link:hover {
    text-decoration: underline;
}

.version-block {
    display: block;
}
.release-link-block {
    display: block;
    margin-top: 12px;
    text-align: center;
}

@media (max-width: 769px) {
    .footer-content {
        flex-direction: column;
        align-items: center;
        padding: 0;
    }

    .looker-info {
        margin-top: 20px;
        text-align: center;
        margin-bottom: 20px;
        font-size: 12px;
    }

    .version-display-container {
        margin-bottom: 50px;
        margin-top: 20px;
    }

    .release-notes-link {
        font-size: 12px;
    }
}

@media (min-width: 769px) {
    .version-display-container {
        margin-top: 200px;
    }
    .version-info {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        position: absolute;
        right: 35px;
        min-width: unset;
        gap: 4px;
    }
    .version-block,
    .release-link-block {
        text-align: right;
        width: auto;
    }
    .footer-logo {
        display: none;
    }
}
</style>
