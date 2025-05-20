<script lang="ts">
import { defineComponent } from 'vue'
import { ref, onMounted, watch } from 'vue'
import { computed } from 'vue'
import router from '@/router'
import { handleLogout } from '@/services/logout'
import NavbarItem from '@/components/NavbarItem.vue'
import { submissionCheck } from '@/services/submission'
import { additionalPositionCheck } from '@/services/additional_position'
import { salaryCheck } from '@/services/salary'
import { listTechCheck } from '@/services/list_tech'
import { listCountrySalaryCheck } from '@/services/list_country_salary'
import { listContractTypeCheck } from '@/services/list_contract_type'
import { dataAmountFilterCheck } from '@/services/data_amount_filter'
import polygonUpturnedGreen from '@/assets/polygon_upturned_green.webp'
import polygonDownturnedRed from '@/assets/polygon_donwturned_red.webp'
import axios from 'axios'
import ResultsFilters from '@/components/results/ResultsFilters.vue'
import ResultsSalaryAmount from '@/components/results/ResultsSalaryAmount.vue'
import ResultsSalaryComparison from '@/components/results/ResultsSalaryComparison.vue'
import Footer from '@/components/Footer.vue'
import type {
    TechOption,
    CountrySalaryOption,
    ContractTypeOption
} from '@/types/results'
import VersionDisplay from '../components/VersionDisplay.vue'

type UserData = {
    name: string
    unique_id: string
}

export default defineComponent({
    name: 'ResultsView',
    components: {
        NavbarItem,
        ResultsFilters,
        ResultsSalaryAmount,
        ResultsSalaryComparison,
        Footer,
        VersionDisplay
    },
    setup() {
        const userData = ref<UserData>({ name: '', unique_id: '' })
        const submissionData = ref({
            position_group: '',
            position: '',
            seniority: '',
            tech: '',
            contract_type: '',
            country_salary: ''
        })
        const additionalPositionData = ref({
            additional_position_group: '',
            additional_position: ''
        })

        const selectedPosition = ref<string>('')
        const selectedSeniorities = ref<string[]>([])
        const hasTechOptions = ref(false)
        const techOptions = ref<TechOption[]>([])
        const selectedTech = ref<string[]>([])
        const countrySalaryOptions = ref<CountrySalaryOption[]>([])
        const selectedCountries = ref<string[]>([])
        const contracTypeOptions = ref<ContractTypeOption[]>([])
        const selectedContractTypes = ref<string[]>([])
        const salaryData = ref({
            salary_net: 0,
            salary_gross: 0
        })

        const dataAmount = ref(0)
        const salaryAverage_net = ref(0)
        const salaryMedian_net = ref(0)
        const salaryAverage_gross = ref(0)
        const salaryMedian_gross = ref(0)

        const locale = ref('en-US')
        const currencyStyle = ref<'currency' | 'decimal' | 'percent'>(
            'currency'
        )
        const currencyType = ref('EUR')

        const logout = () => {
            handleLogout()
        }

        function formatSalary(amount: number | null | undefined): string {
            if (!amount) return 'N/A'
            return amount.toLocaleString(locale.value, {
                style: currencyStyle.value,
                currency: currencyType.value,
                minimumFractionDigits: 0
            })
        }

        const formattedUserSalary_net = computed(() => {
            return formatSalary(salaryData.value.salary_net)
        })

        const formattedUserSalary_gross = computed(() => {
            return formatSalary(salaryData.value.salary_gross)
        })

        const formattedMarketSalaryAverage_net = computed(() => {
            return formatSalary(salaryAverage_net.value)
        })

        const formattedMarketSalaryAverage_gross = computed(() => {
            return formatSalary(salaryAverage_gross.value)
        })

        const formattedMarketSalaryMedian_net = computed(() => {
            return formatSalary(salaryMedian_net.value)
        })

        const formattedMarketSalaryMedian_gross = computed(() => {
            return formatSalary(salaryMedian_gross.value)
        })

        const diffUserToAverageDisplay = computed(() => {
            const diff_net =
                salaryData.value.salary_net - salaryAverage_net.value
            const diff_gross =
                salaryData.value.salary_gross - salaryAverage_gross.value

            const isPositive_net = diff_net >= 0
            const isPositive_gross = diff_gross >= 0

            const formattedDiff_net = formatSalary(Math.abs(diff_net))
            const formattedDiff_gross = formatSalary(Math.abs(diff_gross))

            const polygonSrc_net = isPositive_net
                ? polygonUpturnedGreen
                : polygonDownturnedRed
            const polygonSrc_gross = isPositive_gross
                ? polygonUpturnedGreen
                : polygonDownturnedRed

            const altText_net = isPositive_net
                ? 'Upward Polygon'
                : 'Downward Polygon'
            const altText_gross = isPositive_gross
                ? 'Upward Polygon'
                : 'Downward Polygon'

            const lowerHigher_net = isPositive_net ? 'higher' : 'lower'
            const lowerHigher_gross = isPositive_gross ? 'higher' : 'lower'

            return {
                isPositive_net,
                isPositive_gross,
                formattedDiff_net,
                formattedDiff_gross,
                polygonSrc_net,
                polygonSrc_gross,
                altText_net,
                altText_gross,
                lowerHigher_net,
                lowerHigher_gross
            }
        })

        const diffUserToMedianDisplay = computed(() => {
            const diff_net =
                salaryData.value.salary_net - salaryMedian_net.value
            const diff_gross =
                salaryData.value.salary_gross - salaryMedian_gross.value

            const isPositive_net = diff_net >= 0
            const isPositive_gross = diff_gross >= 0

            const formattedDiff_net = formatSalary(Math.abs(diff_net))
            const formattedDiff_gross = formatSalary(Math.abs(diff_gross))

            const polygonSrc_net = isPositive_net
                ? polygonUpturnedGreen
                : polygonDownturnedRed
            const polygonSrc_gross = isPositive_gross
                ? polygonUpturnedGreen
                : polygonDownturnedRed

            const altText_net = isPositive_net
                ? 'Upward Polygon'
                : 'Downward Polygon'
            const altText_gross = isPositive_gross
                ? 'Upward Polygon'
                : 'Downward Polygon'

            const lowerHigher_net = isPositive_net ? 'higher' : 'lower'
            const lowerHigher_gross = isPositive_gross ? 'higher' : 'lower'

            return {
                isPositive_net,
                isPositive_gross,
                formattedDiff_net,
                formattedDiff_gross,
                polygonSrc_net,
                polygonSrc_gross,
                altText_net,
                altText_gross,
                lowerHigher_net,
                lowerHigher_gross
            }
        })

        const dataLoaded = ref(false)

        const updateDataAmount = async () => {
            try {
                const chosenDepartment = (() => {
                    if (
                        selectedPosition.value ===
                        'other_positions_in_department'
                    ) {
                        return submissionData.value.position_group
                    } else {
                        return null
                    }
                })()

                const chosenPosition = (() => {
                    if (selectedPosition.value === 'my_position') {
                        return submissionData.value.position
                    } else if (
                        selectedPosition.value === 'additional_position'
                    ) {
                        return additionalPositionData.value.additional_position
                    } else {
                        return null
                    }
                })()

                const chosenSeniority = selectedSeniorities.value.length
                    ? selectedSeniorities.value.join('|')
                    : 'N/A'

                const chosenTech = selectedTech.value.length
                    ? selectedTech.value.join('|')
                    : null

                const chosenCountrySalary = selectedCountries.value.length
                    ? selectedCountries.value.join('|')
                    : null

                const chosenContractType = selectedContractTypes.value.length
                    ? selectedContractTypes.value.join('|')
                    : null

                // don't call backend APIs with certain failure (quick fix)
                if (
                    chosenContractType == null ||
                    chosenCountrySalary == null
                ) {
                    if (dataLoaded.value) {
                        console.warn('Please select all required fields.')
                    }
                    dataAmount.value = 0
                    salaryAverage_net.value = 0
                    salaryMedian_net.value = 0
                    return
                }
                const api_response = await dataAmountFilterCheck(
                    chosenDepartment,
                    chosenPosition,
                    chosenSeniority,
                    chosenCountrySalary,
                    chosenContractType,
                    chosenTech
                )

                if (api_response.data.success) {
                    dataAmount.value =
                        api_response.data.response.data.data_amount
                    salaryAverage_net.value =
                        api_response.data.response.data.salary_net_avg
                    salaryMedian_net.value =
                        api_response.data.response.data.salary_net_median
                } else {
                    dataAmount.value = 0
                    salaryAverage_net.value = 0
                    salaryMedian_net.value = 0
                }
            } catch (error) {
                console.error(error)
                dataAmount.value = 0
                salaryAverage_net.value = 0
                salaryMedian_net.value = 0
            }
        }

        onMounted(async () => {
            let localStorageString = localStorage.getItem('userData') ?? ''
            if (localStorageString === '') {
                router.push('/login')
            } else {
                userData.value = JSON.parse(localStorageString) as UserData
                try {
                    const submissionResponse = await submissionCheck(
                        userData.value.unique_id
                    )
                    if (
                        submissionResponse.data.success &&
                        submissionResponse.data.response.exists
                    ) {
                        submissionData.value = submissionResponse.data.response

                        if (submissionData.value.position) {
                            selectedPosition.value = 'my_position'
                        }

                        if (submissionData.value.seniority !== 'N/A') {
                            selectedSeniorities.value = [
                                submissionData.value.seniority
                            ]
                        }

                        if (submissionData.value.country_salary) {
                            selectedCountries.value = [
                                submissionData.value.country_salary
                            ]
                        }

                        const [
                            additionalPositionResponse,
                            salaryResponse,
                            listTechResponse,
                            listCountrySalaryResponse,
                            listContractTypeResponse
                        ] = await Promise.all([
                            additionalPositionCheck(
                                userData.value.unique_id
                            ).catch(error => {
                                console.error(
                                    'Error fetching additional position:',
                                    error
                                )
                                return {
                                    data: {
                                        success: false,
                                        response: { exists: false }
                                    }
                                }
                            }),
                            salaryCheck(userData.value.unique_id),
                            listTechCheck(userData.value.unique_id),
                            listCountrySalaryCheck(userData.value.unique_id),
                            listContractTypeCheck(userData.value.unique_id)
                        ])

                        if (
                            additionalPositionResponse.data.success &&
                            additionalPositionResponse.data.response.exists
                        ) {
                            additionalPositionData.value =
                                additionalPositionResponse.data.response
                        } else {
                            additionalPositionData.value = {
                                additional_position_group: '',
                                additional_position: ''
                            }
                        }

                        if (
                            salaryResponse.data.success &&
                            salaryResponse.data.response.exists
                        ) {
                            salaryData.value = salaryResponse.data.response
                        }

                        if (
                            listTechResponse.data.success &&
                            listTechResponse.data.data
                        ) {
                            techOptions.value = listTechResponse.data.data
                            hasTechOptions.value = techOptions.value
                                .map(tech => tech.tech)
                                .every(tech => tech !== null)
                        }

                        if (
                            listCountrySalaryResponse.data.success &&
                            listCountrySalaryResponse.data.data
                        ) {
                            countrySalaryOptions.value =
                                listCountrySalaryResponse.data.data
                        }

                        if (
                            listContractTypeResponse.data.success &&
                            listContractTypeResponse.data.data
                        ) {
                            contracTypeOptions.value =
                                listContractTypeResponse.data.data
                            if (submissionData.value.contract_type) {
                                selectedContractTypes.value = [
                                    submissionData.value.contract_type
                                ]
                            }
                        }

                        updateDataAmount()
                        dataLoaded.value = true
                    } else {
                        console.log('No submission data found')
                    }
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        console.error(
                            'Axios error:',
                            error.response?.data.message ?? error.message
                        )
                    } else {
                        console.error('Error fetching submission data:', error)
                    }
                }
            }
        })

        // Add watchers for filter changes
        watch([selectedPosition, selectedSeniorities, selectedTech], () => {
            if (dataLoaded.value) updateDataAmount()
        })

        watch(selectedCountries, () => {
            if (dataLoaded.value) updateDataAmount()
        })

        watch(selectedContractTypes, () => {
            if (dataLoaded.value) updateDataAmount()
        })

        watch(
            () => submissionData.value.contract_type,
            () => {
                if (dataLoaded.value) updateDataAmount()
            }
        )

        return {
            userData,
            submissionData,
            selectedPosition,
            selectedSeniorities,
            hasTechOptions,
            techOptions,
            selectedTech,
            countrySalaryOptions,
            selectedCountries,
            selectedContractTypes,
            contracTypeOptions,
            dataAmount,
            salaryAverage_net,
            salaryMedian_net,
            additionalPositionData,
            salaryData,
            formattedUserSalary_net,
            formattedUserSalary_gross,
            formattedMarketSalaryAverage_net,
            formattedMarketSalaryAverage_gross,
            formattedMarketSalaryMedian_net,
            formattedMarketSalaryMedian_gross,
            diffUserToAverageDisplay,
            diffUserToMedianDisplay,
            logout,
            updateDataAmount,
            dataLoaded
        }
    }
})
</script>

<template>
    <img
        src="/tabu_big_logo_login.svg"
        alt="Tabu Logo"
        class="big-logo-desktop"
    />
    <div class="page-container">
        <NavbarItem />
        <div class="results">
            <h1>My salary comparison</h1>
            <div class="overall-filter-section">
                <ResultsFilters
                    :submission-data="submissionData"
                    :additional-position-data="additionalPositionData"
                    :selected-position="selectedPosition"
                    :selected-seniorities="selectedSeniorities"
                    :has-tech-options="hasTechOptions"
                    :tech-options="techOptions"
                    :selected-tech="selectedTech"
                    :country-salary-options="countrySalaryOptions"
                    :selected-countries="selectedCountries"
                    :selected-contract-types="selectedContractTypes"
                    :contrac-type-options="contracTypeOptions"
                    @update:selectedPosition="selectedPosition = $event"
                    @update:selectedSeniorities="selectedSeniorities = $event"
                    @update:selectedTech="selectedTech = $event"
                    @update:countrySalary="
                        submissionData.country_salary = $event
                    "
                    @update:selectedCountries="selectedCountries = $event"
                    @update:contractType="submissionData.contract_type = $event"
                    @update:selectedContractTypes="
                        selectedContractTypes = $event
                    "
                />
                <ResultsSalaryAmount :data-amount="dataAmount" />
            </div>
            <ResultsSalaryComparison
                :salary-data="salaryData"
                :salary-average_net="salaryAverage_net"
                :salary-median_net="salaryMedian_net"
                :formatted-user-salary_net="formattedUserSalary_net"
                :formatted-market-salary-average_net="
                    formattedMarketSalaryAverage_net
                "
                :formatted-market-salary-median_net="
                    formattedMarketSalaryMedian_net
                "
                :diff-user-to-average-display="diffUserToAverageDisplay"
                :diff-user-to-median-display="diffUserToMedianDisplay"
            />
        </div>
        <Footer />
    </div>
</template>

<style scoped>
.page-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.results {
    text-align: left;
    padding-left: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    padding-bottom: 60px;
    margin-top: 88px; /* Match navbar height for desktop */
    z-index: 2;
}

.version-display-container {
    margin-top: 50px;
}

h1 {
    align-self: flex-start;
    font-weight: 600;
    color: #333;
    position: relative;
    display: inline-block;
    margin-bottom: 1vh;
}

h1::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: -1;
    background-color: #d9ff80;
}

.overall-filter-section {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 5vh;
}

.big-logo-desktop {
    position: absolute;
    right: 0;
    top: 0;
    max-width: 233px; /* Maximum width matching original SVG */
    width: 100%; /* Allow it to be smaller if needed */
    height: auto; /* Height will adjust automatically to maintain aspect ratio */
    z-index: 1;
}

.big-logo-mobile {
    width: 100%;
    object-fit: cover;
    margin-top: auto;
    z-index: -1;
    position: absolute;
    bottom: -10px;
    left: 0;
}

@media (min-width: 768px) {
    .big-logo-mobile {
        display: none;
    }

    h1 {
        font-size: 48px;
    }

    h1::after {
        height: 10px;
    }

    .overall-filter-section {
        margin-top: 50px;
    }
}

@media (max-width: 768px) {
    .big-logo-desktop {
        display: none;
    }

    h1 {
        font-size: 24px;
    }

    h1::after {
        height: 5px;
    }

    .results {
        display: flex;
        flex-direction: column;
        min-height: calc(100vh - 97px);
        position: relative;
        margin-top: 60px; /* Match navbar height for mobile */
    }
}
</style>
