import { apiHelper } from './../utils/helpers';
const getToken = () => localStorage.getItem('token');

export default {
  postBlock(userId) {
    let blockingId = userId;
    return apiHelper.post(
      `/blocks`,
      { blockingId },
      {
        headers: { Authorization: `Bearer ${getToken()}` },
        validateStatus: function(status) {
          return status < 500; // Resolve only if the status code is less than 500
        }
      }
    );
  },
  getBlocks() {
    return apiHelper.get(`/blocks`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
  },
  deleteBlock(userId) {
    let blockingId = userId;
    return apiHelper.delete(`/blocks/${blockingId}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
      validateStatus: function(status) {
        return status < 500; // Resolve only if the status code is less than 500
      }
    });
  }
};
