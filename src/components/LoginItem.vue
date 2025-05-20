<template>
    <div class="login">
        <img
            src="/tabu_small_logo_black.svg"
            alt="Tabu Small Logo"
            class="small-logo-login"
        />
        <h1>Login to your Tabu account</h1>
        <GoogleLogin
            :buttonConfig="buttonConfig"
            :callback="callback"
            prompt
            auto-login
        />
        <div v-if="showRegister" class="register">
            You are not registered yet. <br /><br />
            Please,
            <a
                href="https://tabuhr.pro.typeform.com/new-user?utm_source=webapp&utm_medium=login"
            >
                fill out the questionnaire</a
            >
            to get started. <br /><br />
            If you have already filled out the questionnaire, <br />please wait
            approximately <b>5 minutes</b> for your account to be created.
            <br /><br />
            If it still doesn't work, please contact us at info@tabu.hr
        </div>
        <div v-if="showUpdateRequired" class="register">
            Your data is older than 3 months and needs to be updated.
            <br /><br />
            Please update your information via one of these links:<br /><br />
            <div class="update-buttons">
                <a
                    :href="croatianUpdateLink"
                    class="update-button"
                    target="_blank"
                    rel="noopener noreferrer"
                    >Croatian</a
                >
                <a
                    :href="englishUpdateLink"
                    class="update-button"
                    target="_blank"
                    rel="noopener noreferrer"
                    >English</a
                >
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { decodeCredential, GoogleLogin } from 'vue3-google-login'
import type { CallbackTypes } from 'vue3-google-login'
import { checkEmail } from '@/services/auth/google'
import router from '@/router'
import { ref, computed } from 'vue'
import { handleLogout } from '@/services/logout'

type GoogleUserData = {
    email: string
    given_name: string
}

type UserData = {
    name: string
    unique_id: string
    needs_to_update: boolean
}

const showRegister = ref(false)
const showUpdateRequired = ref(false)
const userUniqueId = ref('')

const croatianUpdateLink = computed(() => {
    return `https://tabuhr.typeform.com/azuriranje?utm_source=app&utm_medium=login#unique_id=${userUniqueId.value}`
})

const englishUpdateLink = computed(() => {
    return `https://tabuhr.typeform.com/update?utm_source=app&utm_medium=login#unique_id=${userUniqueId.value}`
})

const callback: CallbackTypes.CredentialCallback = async response => {
    // This callback will be triggered when the user selects or logs in to their Google account from the popup
    const userData: GoogleUserData = decodeCredential(
        response.credential
    ) as GoogleUserData
    checkEmail(userData.given_name, userData.email, response.credential)
        .then(function (resp) {
            if (!resp.success) {
                console.error('Error', resp.error ?? ' logging in!')
                showRegister.value = true // Show registration message on error
                return
            }

            // Get the stored userData which includes the needs_to_update flag
            const userDataString = localStorage.getItem('userData')
            if (userDataString) {
                const userData = JSON.parse(userDataString) as UserData
                if (userData.needs_to_update) {
                    // Set the unique_id for the update links
                    userUniqueId.value = userData.unique_id
                    // If user needs to update, show message and clear tokens
                    showUpdateRequired.value = true
                    // Clear tokens but don't redirect
                    localStorage.removeItem('accessToken')
                    localStorage.removeItem('refreshToken')
                    return
                }
            }

            if (!resp.response.exists) {
                showRegister.value = true
                router.push('/logout')
            } else {
                router.push('/results')
            }
        })
        .catch(error => {
            console.error('Login error:', error)
            showRegister.value = true // Show registration message on error
        })
}

const screenWidth = ref(window.innerWidth)

const buttonConfig = computed(() => {
    let width = '500px' // Default width for desktops
    if (screenWidth.value < 768) width = '250px' // Mobile

    return {
        text: 'continue_with', // "signin_with", "signup_with", "continue_with"
        size: 'large',
        width, // Dynamic width update
        shape: 'pill'
    }
})
</script>

<style scoped>
h1 {
    font-weight: 500;
}

.login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;
}

.register {
    margin-top: 20px;
    text-align: center;
    font-weight: 300;
}

.update-buttons {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-top: 10px;
}

.update-button {
    background-color: #bcb2f7;
    color: #000;
    padding: 10px 20px;
    border-radius: 20px;
    text-decoration: none;
    font-weight: 500;
    transition: opacity 0.2s;
}

.update-button:hover {
    opacity: 0.8;
}

@media (max-width: 768px) {
    .small-logo-login {
        top: calc(50% - 150px);
        /* Adjust this value to position the logo slightly above the text */
        text-align: center;
    }
}

@media (min-width: 768px) {
    .small-logo-login {
        position: absolute;
        left: 10px;
        top: 10px;
        max-height: 50vh;
        max-width: 50vw;
        z-index: 1;
        padding: 10px;
    }
}
</style>
