import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
    getFollowings(userId) {
        return apiHelper.get(`/users/${userId}/followings`, {
            headers: { Authorization: `Bearer ${getToken()}` },
            validateStatus: function (status) {
                return status < 500;
            }
        })
    },
    getFollowers(userId) {
        return apiHelper.get(`/users/${userId}/followers`, {
            headers: { Authorization: `Bearer ${getToken()}` },
            validateStatus: function (status) {
                return status < 500;
            }
        })
    },
    follow(followingId) {
        return apiHelper.post('/followships/', { id: followingId }, {
            headers: { Authorization: `Bearer ${getToken()}` },
            validateStatus: function (status) {
                return status < 500;
            }
        })
    },
    unfollow(followingId) {
        return apiHelper.delete(`/followships/${followingId}`, {
            headers: { Authorization: `Bearer ${getToken()}` },
            validateStatus: function (status) {
                return status < 500;
            }
        })
    },
    getUserProfile(userId) {
        return apiHelper.get(`/users/${userId}`, {
            headers: { Authorization: `Bearer ${getToken()}` },
            validateStatus: function (status) {
                return status < 500; // Resolve only if the status code is less than 500
            }
        })
    },
    putUser({ userId, formData }) {
        return apiHelper.post(`/users/${userId}/edit`, formData, {
            headers: { Authorization: `Bearer ${getToken()}` },
            validateStatus: function (status) {
                return status < 500;
            }
        })
    },
    getTweets(userId) {
        return apiHelper.get(`/users/${userId}/tweets`, {
            headers: { Authorization: `Bearer ${getToken()}` },
            validateStatus: function (status) {
                return status < 500;
            }
        })
    },
    getLikes(userId) {
        return apiHelper.get(`/users/${userId}/likes`, {
            headers: { Authorization: `Bearer ${getToken()}` },
            validateStatus: function (status) {
                return status < 500;
            }
        })
    },
    getReplies(tweetId) {
        return apiHelper.get(`/tweets/${tweetId}/replies`, {
            headers: { Authorization: `Bearer ${getToken()}` },
            validateStatus: function (status) {
                return status < 500;
            }
        })
    },
    like(tweetId) {
        return apiHelper.post(`/tweets/${tweetId}/like`, null, {
            headers: { Authorization: `Bearer ${getToken()}` },
            validateStatus: function (status) {
                return status < 500;
            }
        })
    },
    unlike(tweetId) {
        return apiHelper.post(`/tweets/${tweetId}/unlike`, null, {
            headers: { Authorization: `Bearer ${getToken()}` },
            validateStatus: function (status) {
                return status < 500;
            }
        })
    },
    // getUserProfile(userId) {
    //     return apiHelper.get(`/users/${userId}`, {
    //         headers: { Authorization: `Bearer ${getToken()}` }
    //     })
    // }
}
