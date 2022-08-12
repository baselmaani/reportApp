import axios from 'axios';

class Cloudinary {
  static async uploadImage(image) {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'reports');
    data.append('cloud_name', 'dtrrva1u0');
    const dt = await axios
      .post('https://api.cloudinary.com/v1_1/dtrrva1u0/image/upload', data)
      .then((d) => {
        return d.data;
      })
      .catch((err) => console.log(err));
    return dt.url;
  }
}

export default Cloudinary;
