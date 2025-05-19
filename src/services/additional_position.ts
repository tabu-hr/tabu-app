import axios from 'axios'
import http from './api'

async function additionalPositionCheck(id: string) {
    try {
        return await http({
            url: 'api/additional_position/check',
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods':
                    'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            },
            data: {
                unique_id: id
            }
        })
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            //console.log('Got 404, returning fallback instead of throwing.')
            return {
                data: {
                    success: false,
                    message: 'No additional position found',
                    response: {
                        exists: false
                    }
                }
            }
        }

        throw error // Throw the unchanged error for any other case.
    }
}

export { additionalPositionCheck }
