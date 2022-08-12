import axiosInstance from './config/axiosInstance';
import { urls } from './config/urls';

class Auth {
  static async login({ email, password }) {
    const result = await axiosInstance('post', urls.auth.login, {
      email,
      password,
    }).then((res) => res.data);
    return result;
  }

  static async register(data) {
    const result = await axiosInstance('post', urls.auth.register, data).then(
      (res) => res.data
    );
    return result;
  }

  static async getUserInfo() {
    const result = await axiosInstance('get', urls.auth.getUser).then(
      (res) => res.data
    );
  }
}
export default Auth;
