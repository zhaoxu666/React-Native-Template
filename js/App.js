import React, {Component} from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './navigator/AppNavigators';
import store from './store';
import Geo from './utils/geo';
import SqliteServices from './utils/sqliteServices';
import { TopView } from 'teaset-pro';
class App extends Component {
  state = {
    isInitGeo: false,
  };
  async componentDidMount() {
    try {
      // 初始化高德地图
      await Geo.initGeo();
      this.setState({
        isInitGeo: true,
      });
    } catch (err) {
      console.log(err);
    }
    try {
      // 初始化数据库
      SqliteServices.initDB('test')
      // 创建地理位置表
      SqliteServices.createTable('CREATE TABLE IF NOT EXISTS LOCATION(' +
      'id integer PRIMARY KEY autoincrement,'+ 
      'latitude VARCHAR,'+
      'longitude VARCHAR,' +
      'address VARCHAR,' +
      'timestamp VARCHAR)', (success) => {
        if (success) {
          console.log('creatTable sucess')
        } else {
          console.log('createTable false')
        }
      })
      // 创建
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    return (
      <Provider store={store}>
        <TopView>
            {this.state.isInitGeo ? <AppNavigator /> : <></>}
        </TopView>
      </Provider>
    );
  }
}

export default App;
