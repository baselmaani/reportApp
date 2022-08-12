import axiosInstance from './config/axiosInstance';
import { urls } from './config/urls';

class Category {
  static async getAll() {
    const result = await axiosInstance('get', urls.category.all).then(
      (res) => res.data
    );
    return result;
  }
}
export default Category;
