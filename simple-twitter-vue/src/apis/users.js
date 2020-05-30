import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
    getFollowings(userId) {
        return apiHelper.get(`/users/${userId}/followings`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    getFollowers(userId) {
        return apiHelper.get(`/users/${userId}/followers`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    }
}