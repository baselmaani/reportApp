import axiosInstance from './config/axiosInstance';
import { urls } from './config/urls';

class FeedReaction {
  static async addReaction(data) {
    const result = await axiosInstance(
      'post',
      urls.feedReaction.add,
      data
    ).then((res) => res.data);
    return result;
  }
}

export default FeedReaction;
