import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
    // getCurrentUser() {
    //     return apiHelper.get(`/get_current_user`, {
    //         headers: { Authorization: `Bearer ${getToken()}` }
    //     })
    // },
    get({ userId }) {
        return apiHelper.get(`/users/${userId}`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    getfollowers({ userId }) {
        return apiHelper.get(`/users/${userId}/followers`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    }
}