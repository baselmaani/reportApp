import axiosInstance from './config/axiosInstance';
import { urls } from './config/urls';

class Feed {
  static async getNearByFeed({ lng, lat, pageParam = 0 }) {
    const result = await axiosInstance('get', urls.feed.nearby, {
      lng,
      lat,
      pageParam,
    }).then((res) => res.data);
    console.log(result);
    return { data: result, nextPage: pageParam + 1 };
  }
}

export default Feed;
