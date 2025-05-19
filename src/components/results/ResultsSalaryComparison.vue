<script lang="ts">
import { defineComponent } from 'vue'
import polygonUpturnedGreen from '@/assets/polygon_upturned_green.webp'
import polygonDownturnedRed from '@/assets/polygon_donwturned_red.webp'

export default defineComponent({
    name: 'ResultsSalaryComparison',
    props: {
        salaryData: {
            type: Object,
            required: true
        },
        salaryAverage_net: {
            type: Number,
            required: true
        },
        salaryMedian_net: {
            type: Number,
            required: true
        },
        formattedUserSalary_net: {
            type: String,
            required: true
        },
        formattedMarketSalaryAverage_net: {
            type: String,
            required: true
        },
        formattedMarketSalaryMedian_net: {
            type: String,
            required: true
        },
        diffUserToAverageDisplay: {
            type: Object,
            required: true
        },
        diffUserToMedianDisplay: {
            type: Object,
            required: true
        }
    },
    setup() {
        return {
            polygonUpturnedGreen,
            polygonDownturnedRed
        }
    }
})
</script>

<template>
    <div class="overall-data-section">
        <div class="my-salary-container">
            <p class="data-type-label">My salary</p>
            <div class="salary-container-no-border">
                <p class="salary-my">{{ formattedUserSalary_net }}</p>
                <p class="salary-type-label">net salary</p>
            </div>
        </div>
        <div class="average-salary-container">
            <p class="data-type-label">Average</p>
            <div class="salary-container-border">
                <p class="salary-value">
                    {{ formattedMarketSalaryAverage_net }}
                </p>
                <p class="salary-type-label">net salary</p>
            </div>
            <div class="salary-message-overall" v-if="salaryAverage_net > 0">
                <div class="salary-icon-container">
                    <img
                        id="salary-message-average-icon"
                        class="salary-icon"
                        :src="diffUserToAverageDisplay.polygonSrc_net"
                        :alt="diffUserToAverageDisplay.altText_net"
                    />
                </div>
                <div class="salary-message-container">
                    <span class="salary-message-part-1">your salary is</span>
                    <span
                        id="salary-message-average-value"
                        class="salary-message-part-2"
                        :class="{
                            'diff-positive':
                                diffUserToAverageDisplay.isPositive_net,
                            'diff-negative':
                                !diffUserToAverageDisplay.isPositive_net
                        }"
                    >
                        {{ diffUserToAverageDisplay.formattedDiff_net }}</span
                    >
                    <span
                        id="salary-message-average-lowerhigher"
                        class="salary-message-part-3"
                    >
                        {{ diffUserToAverageDisplay.lowerHigher_net }}</span
                    >
                    <span class="salary-message-part-4"
                        >than the average for these filters</span
                    >
                </div>
            </div>
        </div>
        <div class="median-salary-container">
            <p class="data-type-label">Median</p>
            <div class="salary-container-border">
                <p class="salary-value">
                    {{ formattedMarketSalaryMedian_net }}
                </p>
                <p class="salary-type-label">net salary</p>
            </div>
            <div class="salary-message-overall" v-if="salaryMedian_net > 0">
                <div class="salary-icon-container">
                    <img
                        id="salary-message-average-icon"
                        class="salary-icon"
                        :src="diffUserToMedianDisplay.polygonSrc_net"
                        :alt="diffUserToMedianDisplay.altText_net"
                    />
                </div>
                <div class="salary-message-container">
                    <span class="salary-message-part-1">your salary is</span>
                    <span
                        id="salary-message-median-value"
                        class="salary-message-part-2"
                        :class="{
                            'diff-positive':
                                diffUserToAverageDisplay.isPositive_net,
                            'diff-negative':
                                !diffUserToAverageDisplay.isPositive_net
                        }"
                    >
                        {{ diffUserToMedianDisplay.formattedDiff_net }}</span
                    >
                    <span
                        id="salary-message-median-lowerhigher"
                        class="salary-message-part-3"
                    >
                        {{ diffUserToMedianDisplay.lowerHigher_net }}</span
                    >
                    <span class="salary-message-part-4"
                        >than the median for these filters</span
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.overall-data-section {
    display: flex;
    flex-wrap: wrap;
}

.my-salary-container {
    order: 1;
    margin-right: 50px;
    display: flex;
    flex-direction: column;
    width: fit-content;
}

.average-salary-container {
    order: 2;
    margin-right: 50px;
    display: flex;
    flex-direction: column;
    width: fit-content;
}

.median-salary-container {
    order: 3;
    display: flex;
    flex-direction: column;
    width: fit-content;
}

.salary-container-no-border {
    padding: 20px;
}

.salary-container-border {
    border-radius: 13px;
}

.data-type-label {
    font-weight: 600;
    color: #333333;
    margin-bottom: 40px;
    line-height: 1;
}

.salary-my {
    font-weight: 600;
    color: #ff9883;
    margin: 0;
    line-height: 1;
    text-align: center;
}

.salary-value {
    font-weight: 400;
    color: #333333;
    margin: 0;
    line-height: 1;
    text-align: center;
}

.salary-type-label {
    font-weight: 500;
    color: #333333;
    margin-top: 5px;
    text-align: right;
}

.salary-message-overall {
    display: flex;
    margin-top: 5px;
}

.salary-icon-container {
    order: 1;
    margin-right: 5px;
}

.salary-message-container {
    order: 2;
    font-weight: 500;
}

.salary-message-overall span {
    margin-right: 4px;
}

.salary-message-part-2 {
    font-weight: 700;
}

.diff-positive {
    color: #15be02;
}

.diff-negative {
    color: #ff0404;
}

@media (min-width: 768px) {
    .overall-data-section {
        margin-top: 50px;
    }

    .salary-container-border {
        border: 5px solid white;
        padding: 20px;
    }

    .data-type-label {
        font-size: 18px;
    }

    .salary-value,
    .salary-my {
        font-size: 72px;
    }

    .salary-type-label {
        font-size: 18px;
    }

    .salary-message-overall {
        max-width: 300px;
        font-size: 18px;
    }
}

@media (max-width: 768px) {
    .salary-container-border {
        border: 3px solid white;
        padding: 10px;
    }

    .data-type-label {
        font-size: 24px;
    }

    .salary-value,
    .salary-my {
        font-size: 48px;
    }

    .salary-type-label {
        font-size: 12px;
    }

    .salary-message-overall {
        max-width: 250px;
        font-size: 12px;
    }
}
</style>
