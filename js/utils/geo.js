import {PermissionsAndroid, Platform} from 'react-native';
import {init, Geolocation, setInterval, isStarted} from 'react-native-amap-geolocation';
import axios from 'axios';
class Geo {
  watchId = null;
  constructor () {
  }
  async initGeo() {
    if (Platform.OS === 'android') {
      try {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        );
        // 高德地图中安卓端的key
        await init({
          ios: '109ed703632e04c22ec8cb9f67f8e7e3',
          android: '109ed703632e04c22ec8cb9f67f8e7e3',
        })
        return;
      } catch (err) {
        return;
      }
    }
  }
  async getCurrentPosition() {
    return new Promise((resolve, reject) => {
      console.log('开始定位');
      Geolocation.getCurrentPosition(({coords}) => {
        resolve(coords);
      }, reject);
    });
  }
  async getCityByLocation() {
    try {
      const {longitude, latitude} = await this.getCurrentPosition();
      console.log(longitude, latitude)
      const res = await axios.get('https://restapi.amap.com/v3/geocode/regeo', {
        params: {
          location: `${longitude},${latitude}`,
          key: '0cdf775365181a6a02c41d1821c3a6eb', // 高德地图中的web的key
        },
      });                                                                                                                                                                                                                                                                            
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
  async startWatchLocation() {
    if (this.watchId) {
        console.log('----定位已经开启----')
        return false
    }
    this.watchId = Geolocation.watchPosition(location => {
      console.log('------------实时定位-------------');
      console.log(location);
      const data = {
        latitude: location.location.latitude,
        longitude: location.location.longitude,
        address: location.location.address,
        timestamp: location.location.timestamp
      }
    //   SqliteServices.insertDataToTable('LOCATION', data, (result) => {
    //      console.log(result)
    //   } )
    });
  }
  async stopWatchLocation() {
    this.watchId && Geolocation.clearWatch(this.watchId);
    this.watchId = null
  }
  custSetInterval (num) {
    setInterval(num)
  }
  isStartedFlag () {
    return isStarted()
  }
}
export default new Geo();
