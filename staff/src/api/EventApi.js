import axiosInstance from './config/axiosInstance';
import { urls } from './config/urls';

class EventApi {
  static async getNearByEvents({ lng, lat, pageParam = 0 }) {
    const result = await axiosInstance('get', urls.event.nearby, {
      lng,
      lat,
      pageParam: pageParam,
    }).then((res) => res.data);
    return { data: result, nextPage: pageParam + 1 };
  }

  static async participate({ eventId }) {
    const result = await axiosInstance('post', urls.event.participate, {
      eventId,
    }).then((res) => res.data);
    console.log(result);
    return result;
  }
}

export default EventApi;
