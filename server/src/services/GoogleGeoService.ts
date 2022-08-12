import axios from 'axios';

export class GoogleGeoService {
  static async getCity(lat: number, lng: number) {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_API_KEY}`;
      const response = await axios.get(url);
      console.log('response.data');
      console.log(response.data);
      const city = response.data.results[0].address_components.find((c: any) =>
        c.types.includes('locality')
      );
      return city.long_name;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
