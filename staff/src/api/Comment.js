import axiosInstance from './config/axiosInstance';
import { urls } from './config/urls';
import Cloudinary from './Cloudinary';

class Comment {
  static async addComment(data) {
    const images = data.images.map((c) => `data:image/png;base64,${c}`);
    const saveImagesPromises = images.map((c) => Cloudinary.uploadImage(c));

    const savedImages = await Promise.all(saveImagesPromises);
    data.images = savedImages;
    const result = await axiosInstance('post', urls.comment.add, data).then(
      (res) => res.data
    );
    return result;
  }

  static async getFeedComments({ feedId, limit }) {
    const result = await axiosInstance('get', urls.comment.getByFeed, {
      feedId,
      limit,
    }).then((res) => res.data);
    return result;
  }

  static async removeComment({ id }) {
    const result = await axiosInstance('delete', urls.comment.delete, {
      id,
    }).then((res) => res.data);
    return result;
  }
}

export default Comment;
