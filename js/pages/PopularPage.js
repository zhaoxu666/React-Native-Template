import React, {Component, PureComponent } from 'react';
import {View, Button, StyleSheet, Text, TouchableHighlight, TouchableOpacity} from 'react-native';
// 引入头部Tab
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import NavigationUtil from '../navigator/NavigationUtil';
import {connect} from 'react-redux';
import action from '../action';
import Geo from '../utils/geo';
import Toast from '../utils/toast';
import SqliteServices from '../utils/sqliteServices';
const Tab = createMaterialTopTabNavigator();

// 头部Tab容器
class PopularPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Tab.Navigator
        initialRouteName="Tab1"
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarStyle: styles.tabBarStyle,
          tabBarActiveTintColor: '#e91e63',
        }}>
        <Tab.Screen
          name="Tab1"
          options={{tabBarLabel: 'Tab1'}}
          component={() => <PopularPageTab {...this.props} />}
        />
        <Tab.Screen
          name="Tab2"
          options={{tabBarLabel: 'Tab2'}}
          component={() => <PopularPageTabTwo {...this.props} />}
        />
        <Tab.Screen
          name="Tab3"
          options={{tabBarLabel: 'Tab3'}}
          component={() => <PopularPageTab {...this.props} />}
        />
      </Tab.Navigator>
    );
  }
}

class PopularPageTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationInfo: {},
    };
  }
  render() {
    const {dispatch, home} = this.props;
    const {locationInfo} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>PopularPage</Text>
        <Button onPress={this.handleGoDetail} title="跳转详情页"></Button>
        <TouchableHighlight
          style={styles.itemView}
          underlayColor="red"
          onPress={() => {
            dispatch(action.addTodo(home.num));
          }}>
          <Text style={styles.itemText}>点击我就+1</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.itemView}
          underlayColor="red"
          onPress={() => {
            dispatch(action.decTodo(home.num));
          }}>
          <Text style={styles.itemText}>点击我就-1</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.itemView}
          underlayColor="red"
          onPress={() => {
            dispatch(action.textChange('更改后文本'));
          }}>
          <Text style={styles.itemText}>点击我就更改文本</Text>
        </TouchableHighlight>
        <Text style={{paddingTop: 10, color: 'red'}}>
          当前的Num值是:{home.num} 当前的Text值是：{home.text}
        </Text>
        <View>
          {/* <View style={{marginTop: 10}}>
            <Button title="获取当前定位" onPress={this.getCityByLocation} />
          </View>
          <View style={{marginTop: 10}}>
            <Button title="开启实时定位" onPress={this.startWatchLocation} />
          </View>
          <View style={{marginTop: 10}}>
            <Button title="关闭实时定位" onPress={this.stopWatchLocation} />
          </View> */}
          {/* <View style={{marginTop: 10}}>
            <Button title="打开Toast" onPress={this.openToast} />
          </View>
          <View style={{marginTop: 10}}>
            <Button title="关闭Toast" onPress={this.closeToast} />
          </View> */}
          <View style={{marginTop: 10}}>
            <Button
              title="插入地理位置数据"
              onPress={this.insertLocationData}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Button
              title="获取插入地理位置数据"
              onPress={this.getLocationData}
            />
          </View>
          <View>
            <Text>
              {locationInfo.latitude}----{locationInfo.longitude}----
              {locationInfo.address}
            </Text>
          </View>
        </View>
      </View>
    );
  }
  handleGoDetail = () => {
    NavigationUtil.goPage({}, 'DetailPage');
  };
  startWatchLocation = () => {
    Geo.custSetInterval(10000);
    Geo.startWatchLocation();
  };
  stopWatchLocation = () => {
    Geo.stopWatchLocation();
  };
  getCityByLocation = async () => {
    const res = await Geo.getCityByLocation();
    console.log(res);
  };
  openToast = () => {
    Toast.showLoading();
  };
  closeToast = () => {
    Toast.hideLoading();
  };
  insertLocationData = () => {
    const data = {
      latitude: '39.888556',
      longitude: '116.417516',
      address: '北京市东城区天坛街道元隆大厦',
      timestamp: '1632970901323',
    };
    SqliteServices.insertDataToTable('LOCATION', data, result => {
      console.log(result);
    });
  };
  getLocationData = () => {
    SqliteServices.selectDataFromTable('LOCATION', (result, datas) => {
      if (result) {
        console.log(datas);
        this.setState({
          locationInfo: datas[0],
        });
      }
    });
  };
}

class PopularPageTabTwo extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {dispatch, home} = this.props;
    return (
      <View style={styles.container}>
          <Text style={{paddingTop: 10, color: 'red'}}>
            当前的Num值是:{home.num} 当前的Text值是：{home.text}
          </Text>
      </View>
    );
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  tabBarStyle: {
    minWidth: 50,
  },

  itemView: {
    backgroundColor: 'grey',
    height: 44,
    width: 200,
    justifyContent: 'center',
    marginTop: 10,
  },
  itemText: {
    fontSize: 15,
    color: '#ffffff',
    textAlign: 'left',
    marginLeft: 20,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },

});

function selector(state) {
  const {home} = state;
  return {
    home,
  };
}

export default connect(selector)(PopularPage);
