<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ResultsSalaryAmount',
    props: {
        dataAmount: {
            type: Number,
            required: true
        }
    }
})
</script>

<template>
    <div class="salaries-amount-container">
        <p class="salaries-amount-number" id="amount-of-salaries">
            {{ dataAmount }}
        </p>
        <p class="salaries-amount-label">salaries in this filter</p>
        <p class="salaries-amount-note">
            Modify the filters to change the salaries you're compared to.
        </p>
        <p class="salaries-amount-refresh-note">
            <strong>NOTE:</strong> Data is refreshed every 5 minutes.
        </p>
    </div>
</template>

<style scoped>
.salaries-amount-container {
    order: 2;
}

.salaries-amount-number {
    font-weight: 700;
    line-height: 1;
    margin-bottom: 10px;
}

.salaries-amount-label {
    font-weight: 500;
    margin-top: 0;
    margin-bottom: 10px;
}

.salaries-amount-note {
    font-weight: 300;
    margin-top: 0;
}

.salaries-amount-refresh-note {
    font-weight: 300;
    margin-top: 0;
    font-style: italic;
}

@media (min-width: 768px) {
    .salaries-amount-number {
        font-size: 48px;
    }

    .salaries-amount-label {
        font-size: 24px;
    }

    .salaries-amount-note {
        font-size: 14px;
    }

    .salaries-amount-refresh-note {
        font-size: 14px;
        margin-top: 55px;
    }
}

@media (max-width: 768px) {
    .salaries-amount-number {
        font-size: 32px;
    }

    .salaries-amount-label {
        font-size: 18px;
    }

    .salaries-amount-note {
        font-size: 12px;
    }

    .salaries-amount-refresh-note {
        font-size: 12px;
        margin-top: 30px;
    }
}
</style>
