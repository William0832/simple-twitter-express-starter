import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
    getFollowers(userId) {
        return apiHelper.get(`/users/${userId}/followers`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    }
}
