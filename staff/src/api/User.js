import axiosInstance from './config/axiosInstance';
import { urls } from './config/urls';
import Cloudinary from './Cloudinary';

export class User {
  static async getProfile() {
    return axiosInstance('get', urls.user.profile).then((res) => res.data);
  }

  static async updateProfile(data) {
    const newImage = data.pickedImage
      ? await Cloudinary.uploadImage(data.pickedImage)
      : data.image;

    return axiosInstance('post', urls.user.saveProfile, {
      ...data,
      image: newImage,
    }).then((res) => res.data);
  }
}
