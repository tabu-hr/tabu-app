import axios from 'axios'
import http from './api'

async function dataAmountFilterCheck(
    position_group: string | null,
    position: string | null,
    seniority: string,
    country_salary: string,
    contract_type: string,
    tech: string | null
) {
    try {
        return await http({
            url: 'api/data_amount/filter',
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods':
                    'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            },
            data: {
                parameter_position_group: position_group,
                parameter_position: position,
                parameter_seniority: seniority,
                parameter_country_salary: country_salary,
                parameter_contract_type: contract_type,
                parameter_tech: tech
            }
        })
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                return {
                    data: {
                        success: false,
                        message: 'Not enough data for the filter',
                        response: {
                            exists: false
                        }
                    }
                }
            }
            if (
                error.response?.status === 500 &&
                error.response?.data?.message ===
                    'No data found for the provided filters'
            ) {
                return {
                    data: {
                        success: false,
                        message: 'No data found for the provided filters',
                        response: {
                            exists: false
                        }
                    }
                }
            }
        }

        throw error // Throw the unchanged error for any other case.
    }
}

export { dataAmountFilterCheck }
