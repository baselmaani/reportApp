import axiosInstance from './config/axiosInstance';
import { urls } from './config/urls';
import axios from 'axios';
import Cloudinary from './Cloudinary';

class Report {
  static async getNearByReports({ lng, lat }) {
    const result = await axiosInstance('get', urls.report.nearby, {
      lng,
      lat,
    }).then((res) => res.data);
    return result;
  }

  static async saveReport(report) {
    const images = report.images.map((c) => `data:image/png;base64,${c}`);
    const saveImagesPromises = images.map((c) => Cloudinary.uploadImage(c));

    const savedImages = await Promise.all(saveImagesPromises);
    report.images = savedImages;
    const result = await axiosInstance('post', urls.report.saveReport, {
      ...report,
    }).then((res) => res.data);
    return result;
  }

  static async addReaction(data) {
    const result = await axiosInstance(
      'post',
      urls.report.addReaction,
      data
    ).then((res) => res.data);

    return result;
  }

  static async comment(comment) {
    const result = await axiosInstance('post', urls.report.addComment, {
      comment,
    }).then((res) => res.data);
    return result;
  }
}
export default Report;
