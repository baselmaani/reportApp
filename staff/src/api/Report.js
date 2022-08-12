import axiosInstance from './config/axiosInstance';
import { urls } from './config/urls';
import axios from 'axios';
import Cloudinary from './Cloudinary';

class Report {
  static async getNearByReports() {
    const result = await axiosInstance('get', urls.report.nearby).then(
      (res) => res.data
    );
    return result;
  }

  static async getReportById(id) {
    const result = await axiosInstance('get', `${urls.report.byid}/${id}`).then(
      (res) => res.data
    );
    return result;
  }

  static async addReaction(data) {
    const result = await axiosInstance('post', urls.report.react, data).then(
      (res) => res.data
    );

    return result;
  }

  static async handle(data) {
    const result = await axiosInstance('post', urls.report.handle, data).then(
      (res) => res.data
    );

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
