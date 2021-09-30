# Github_RN 项目搭建
## 创建项目
```cmd
react-native init Github_RN
```
## 创建欢迎页

在根目录下创建`js`文件夹（相当于`src`）， 我们所有开发工作都在此文件夹下。在`js`文件夹中创建`pages`存放所有页面。在创建`WelcomePage.js`为欢迎页组件。

```WelcomePage.js
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
class WelcomePage extends Component {
    componentDidMount() {
        this.timer = setTimeout(() => {
            // 跳转到首页
        }, 200)
    }

    componentWillUnmount() {
        // 页面销毁时，清空计时器
        this.timer && clearTimeout(this.timer)
    }
    render() { 
        return (
            <View style={styles.container}>
                <Text>
                    WelComePage
                </Text>
            </View>
        )
    }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default WelcomePage;
```

## 安装Icon组件(android)

### 安装

```cmd
npm install --save react-native-vector-icons
```

### 配置

在`android/app/build.gradle`文件中，添加在第一行下面如下内容

```build.gradle
apply plugin: "com.android.application"
+ apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

### 手动添加

将`node_modules/react-native-vector-icons/Fonts` 文件内容复制至 `android/app/src/main/assets/fonts` 下。

重启项目

## 在页面中使用



## 创建堆栈导航器

在`js`文件夹下创建`navigator`文件夹

在`navigator`文件夹下创建`AppNavigators.js`文件

### 安装Navigator

```cmd
   npm install @react-navigation/native
   npm install react-native-screens react-native-safe-area-context
   npm install @react-navigation/native-stack
```

### 编写AppNavigators.js

```AppNavigators.js
import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomePage from '../pages/WelcomePage';
import HomePage from '../pages/HomePage';

const Stack = createNativeStackNavigator ()

function AppNavigators() {
    return (
        <NavigationContainer>
            <Stack.Navigator  initialRouteName="WelcomePage">
                <Stack.Screen name="WelcomePage" component={WelcomePage}></Stack.Screen>
                <Stack.Screen name="HomePage" component={HomePage}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigators
```

### 编写WelComePage

```WelComePage
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil';
class WelcomePage extends Component {
    componentDidMount() {
        this.timer = setTimeout(() => {
            // 跳转到首页 HomePage
            NavigationUtil.resetToHomePage(this.props)
        }, 2000)
    }

    componentWillUnmount() {
        // 页面销毁时，清空计时器
        this.timer && clearTimeout(this.timer)
    }
    render() { 
        return (
            <View style={styles.container}>
                <Text>
                    WelComePage
                </Text>
            </View>
        )
    }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default WelcomePage;
```

### 编写HomePage

```HomePage.js
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native'
class HomePage extends Component {
    render() { 
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>HomePage</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    }
})

export default HomePage;
```

### 编写PopularPage

```cmd
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native'
class PopularPage extends Component {
    render() { 
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>HomePage</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    }
})

export default PopularPage;
```

### 编写NavigationUtils

```NavigationUtils.js
export default class NavigationUtil {
    /**
     * 重置到首页
     * @param {*} params 
     */
    static resetToHomePage(params) {
        const { navigation } = params;
        // 这里使用 replace 而不用 navigate 防止物理键返回到welcomePage页面
        navigation.replace('HomePage')
    }
}
```

### 作为根组件

```App.js
import React, {Component} from 'react';
import AppNavigator from './navigator/AppNavigators';
class App extends Component {
  render() {
    return (
       <AppNavigator></AppNavigator>
    );
  }
}

export default App;

```

### 最后说明

*这样我们启动项目后，最先开始会加载`welcomePage`页面，两秒后会自动跳转到`HomePage`页面*

## 创建底部Tab导航器

### 安装依赖

```cmd
npm install @react-navigation/bottom-tabs
```

### 编写Tab容器组件

改写`HomePage.js`作为tab导航器

```HomePage.js
import React, { Component } from 'react';
// tab 导航器
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PopularPage from './PopularPage'
import TrendingPage from './TrendingPage'
import FavoritePage from './FavoritePage'
import MyPage from './MyPage'
// 图标组件库
import Ionicons from 'react-native-vector-icons/Ionicons';
import NavigationUtil from '../navigator/NavigationUtil';

const Tab = createBottomTabNavigator();

class HomePage extends Component {
  constructor(props) {
    super(props)
    NavigationUtil.navigation = this.props.navigation
  }
  render() { 
    return (
      <Tab.Navigator
      		initialRouteName="popularPage"  // 设置初始加载Tab
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
      
                  if (route.name === 'popularPage') {
                    iconName = focused
                      ? 'ios-information-circle'
                      : 'ios-information-circle-outline';
                  } else if (route.name === 'trendingPage') {
                    iconName = focused ? 'ios-list' : 'ios-list';
                  } else if (route.name === 'favoritePage') {
                    iconName = focused ? 'ios-list' : 'ios-list';
                  } else if (route.name === 'myPage') {
                      iconName = focused ? 'person-circle-outline' : 'person-circle-outline'
                  }
      
                  // You can return any component that you like here!
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                headerShown: false
              })}
        >
            <Tab.Screen name="popularPage" options={{tabBarLabel: '最热'}} component={PopularPage}/>
            <Tab.Screen name="trendingPage" options={{tabBarLabel: '趋势'}} component={TrendingPage}/>
            <Tab.Screen name="favoritePage" options={{tabBarLabel: '收藏'}} component={FavoritePage}/>
            <Tab.Screen name="myPage" options={{tabBarLabel: '我的'}} component={MyPage}/>
        </Tab.Navigator>
    );
  }
}


export default HomePage;
```

### 创建PopularPage

```pages/PopularPage.js
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native'
class PopularPage extends Component {
    render() { 
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>PopularPage</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    }
})

export default PopularPage;
```

*注意：其他三个Tab页面同理创建*

### 最后说明

这样我们就创建好了拥有4个`tab`的容器，上面在`WelcomePage`显示2秒后，我们将会看到拥有4个`tab`的页面，并且第一个加载的为`PopularPage`

## 创建顶部Tab导航器

改写`pages/PopularPage.js`，为`最热`添加顶部`tab`导航

### 安装依赖

```cmd
yarn add @react-navigation/material-top-tabs react-native-tab-view
yarn add react-native-pager-view
```

### 改写PopularPage.js

```PopularPage.js
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native'
// 引入头部Tab
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

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
          tabBarScrollEnabled: true, // 设置可以滚动
          tabBarStyle: styles.tabBarStyle, // 设置样式
          tabBarActiveTintColor: '#e91e63', // 设置选中颜色
        }}>
        <Tab.Screen
          name="Tab1"
          options={{tabBarLabel: 'Tab1'}}
          component={PopularPageTabOne }
        />
        <Tab.Screen
          name="Tab2"
          options={{tabBarLabel: 'Tab2'}}
          component={PopularPageTabTwo}
        />
      </Tab.Navigator>
    );
  }
}

// 头部Tab组件
class PopularPageTabOne extends Component {
    render() { 
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>PopularOnePage</Text>
            </View>
        );
    }
}

// 头部Tab组件
class PopularPageTabTwo extends Component {
    render() { 
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>PopularTwoPage</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    tabBarStyle: {
     	minWidth: 50,
  	},
})

export default PopularPage;
```

### 最后说明

*这样我们就在`PopularPage`组件中创建好了 拥有2个`tab`的顶部导航器*

## 集成Redux

### 安装依赖

```cmd
yarn add redux react-redux
// 异步中间件
yarn add redux-thunk
```

### 开始创建

#### 引入Store

在`App.js`中引入我们创建好的`store`，并且用`Provider`组件将容器包裹，将`store`注册到全局

```App.js
import React, { Component } from 'react';
import {Provider}  from 'react-redux';
import AppNavigator from './navigator/AppNavigators';
import store from './store'
class App extends Component {
    render() { 
        return (
        	// 为项目提供store
            <Provider store={store}>
                <AppNavigator></AppNavigator>
            </Provider>
        );
    }
}
 
export default App;
```

#### 创建reducer

在`js`文件夹下创建`reducer`文件夹`reducer/index.js`， 实现reducer合并

```reducer/index.js
import { combineReducers } from 'redux';
import theme from './theme'
/**
 * 合并reducer
 */
const index = combineReducers({
    theme: theme
})

export default index
```

#### 实现模块reducer

在`reducer/home/index.js`中实现我们模块下的`reducer`

```home/index.js
// action type 引入
import Types from '../../action/types'
// 初始值数据
const defaultState = {
  num: 0,
  text: 'TEXT'
};
export default function counter (state = defaultState, action) {
  switch (action.type) {
    case Types.INCREMENT:
        return {
            ...state,
            num: state.num + 1
        }
    case Types.DECREMENT:
        return {
            ...state,
            num: state.num - 1
        }
    case Types.TEXT_CHANGE:
      return {
        ...state,
        text: action.text
      }
    default:
        return state;
  }
}

```

#### 创建action

##### 创建action Types

在`action/types.js`中导出所有`action`类型

```types.js
// 将所有action类型统一存放
export default {
    INCREMENT: 'INCREMENT',
    DECREMENT: 'DECREMENT',
    TEXT_CHANGE: 'TEXT_CHANGE'
}
```

##### 创建action

在`action/index.js`中实现统一`action`导出

```index.js
// 将所有action统一导出
import { addTodo, decTodo, textChange } from './home'
export default {
    addTodo,
    decTodo,
    textChange
}
```

##### 实现模块action

```home/index.js
// 将types 从 types.js引入
import Types from '../../action/types'
// 设置值
const defaultState = {
  num: 0,
  text: 'TEXT'
};
export default function counter (state = defaultState, action) {
  switch (action.type) {
    case Types.INCREMENT:
        return {
            ...state,
            num: state.num + 1
        }
    case Types.DECREMENT:
        return {
            ...state,
            num: state.num - 1
        }
    case Types.TEXT_CHANGE:
      return {
        ...state,
        text: action.text
      }
    default:
        return state;
  }
}
```

### 开始使用

在`pages/PopularPage.js`中使用示例:

```PopularPage.js
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
// 引入头部Tab
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// 引入redux相关
 import { connect } from 'react-redux';
 import action from '../action';

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
          component={() => <PopularPageTabOne  {...this.props}/>}
        />
        <Tab.Screen
          name="Tab2"
          options={{tabBarLabel: 'Tab2'}}
          component={() => <PopularPageTabTwo  {...this.props}/>}
        />
      </Tab.Navigator>
    );
  }
}


// 头部Tab组件
class PopularPageTabOne extends Component {
    render() {
    	const { dispatch, home } = this.props;
        return (
          <View style={styles.container}>
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
          </View>
        );
    }
}

// 头部Tab组件
class PopularPageTabTwo extends Component {
    render() { 
    	const { home } = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>PopularTwoPage</Text>
                <Text style={{paddingTop: 10, color: 'red'}}>
              		当前的Num值是:{home.num} 当前的Text值是：{home.text}
            	</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
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
})

function selector(state) {
  const { home } = state;
  console.log(home)
  return {
    home
  };
}
// 导出组件方式改变
export default connect(selector)(PopularPage);

```

## 集成定位

### 官方资料

[react-native-amap-gelocation](https://www.npmjs.com/package/react-native-amap-geolocation)

### 安装依赖

```cmd
yarn add react-native-amap-geolocation
// 集成到项目中
react-native link react-native-amap-geolocation
```

### 申请高德地图Key

[申请高德地图的key](https://lbs.amap.com/api/ios-sdk/guide/create-project/get-key/)

### 高德地图申请详解

- 高德地图创建2个项目，一个Android，一个Web，分别申请`Key`

- Android 的 Key 申请时，有三个要填写的框

  - 包名

    1. 项目名称前面加上`com.` 如： `com.tanhuajiaoyou`
    2. 可以查看`android/app/src/main/AndroidManifest.xml` 中第二行`package="com.xxxx"`就是包名

  - SHA1

    1. 一个发布版安全码
       1. [**获取SHA1**](https://lbs.amap.com/faq/android/map-sdk/create-project/43112) 看这个
       2. 如果执行命令报错：密钥库文件不存在
          1. [密钥库文件不存在](https://blog.csdn.net/tony_yang6/article/details/105750419) 看这个

  - 调试版安全码

    1. 这个就是要再开发阶段获取， 我们可以暂时跟发布版用一个或者不填写，虽然后面会出问题。

    2. 解决这个问题是开发中， 我们再获取当前定位的时候，会发现一直报错，说`key`不正确

       ```cmd
       ERROR: "auth fail:INVALID_USER_SCODE#SHA1AndPackage#5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25:com.tanhuajiaoyou#gsid#033043162227162788566585600012750140235#csid#89022e6615e74ccc8148f969c8422ea7#0701"
       ```

    3. 将错误的SHA1复制出来，到高德地图官网的项目中将此粘贴到调试版安全码中, 如上面的`5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25`

    4. 重新运行项目

### 封装公共方法

在`utils/geo.js`实现封装

```utils/Geo.js
import { PermissionsAndroid, Platform } from 'react-native';
import { init, Geolocation, setInterval, isStarted } from 'react-native-amap-geolocation';
// 引入请求库库 (这个后面会安装)
import axios from 'axios';
class Geo {
  watchId = null;
  constructor () {
  }
  // 初始化地图
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
  // 获取当前定位
  async getCurrentPosition() {
    return new Promise((resolve, reject) => {
      console.log('开始定位');
      Geolocation.getCurrentPosition(({coords}) => {
        resolve(coords);
      }, reject);
    });
  }
  // 获取当前位置所在省市区
  async getCityByLocation() {
    try {
      const {longitude, latitude} = await this.getCurrentPosition();
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
  // 获取实时定位
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
    });
  }
  // 关闭实时定位
  async stopWatchLocation() {
    this.watchId && Geolocation.clearWatch(this.watchId);
    this.watchId = null
  }
  // 设置持续定位频率
  custSetInterval (num) {
    setInterval(num)
  }
  // 判断是否开启定位
  isStartedFlag () {
    return isStarted()
  }
}
export default new Geo();

```

### 集成到项目中

在`App.js`中初始化定位功能

```App.js
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './navigator/AppNavigators';
import store from './store';
import Geo from './utils/geo';
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
  }
  render() {
    return (
      <Provider store={store}>
           {this.state.isInitGeo ? <AppNavigator /> : <></>}
      </Provider>
    );
  }
}

export default App;

```

### 在页面中使用

在这里我们仍然在`PopularPage.js`中使用

```PopularPage.js
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
// 引入头部Tab
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// 引入redux相关
 import { connect } from 'react-redux';
 import action from '../action';
 // 引入定位方法
 import Geo from '../utils/geo';

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
          component={() => <PopularPageTabOne  {...this.props}/>}
        />
        <Tab.Screen
          name="Tab2"
          options={{tabBarLabel: 'Tab2'}}
          component={() => <PopularPageTabTwo  {...this.props}/>}
        />
      </Tab.Navigator>
    );
  }
}


// 头部Tab组件
class PopularPageTabOne extends Component {
    render() {
    	const { dispatch, home } = this.props;
        return (
          <View style={styles.container}>
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
            <TouchableHighlight
                  style={styles.itemView}
                  underlayColor="red"
                  onPress={this.startWatchLocation}>
                  <Text style={styles.itemText}>开启实时定位</Text>
            </TouchableHighlight>
            <TouchableHighlight
                  style={styles.itemView}
                  underlayColor="red"
                  onPress={this.stopWatchLocation}>
                  <Text style={styles.itemText}>关闭实时定位</Text>
            </TouchableHighlight>
          </View>
        );
    }
    // 开启实时定位方法
    startWatchLocation = () => {
    	// 设置实时定位频率
        Geo.custSetInterval(10000);
        Geo.startWatchLocation();
  	};
  	// 关闭实时定位方法
    stopWatchLocation = () => {
        Geo.stopWatchLocation();
    };
}

// 头部Tab组件
class PopularPageTabTwo extends Component {
    render() { 
    	const { home } = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>PopularTwoPage</Text>
                <Text style={{paddingTop: 10, color: 'red'}}>
              		当前的Num值是:{home.num} 当前的Text值是：{home.text}
            	</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
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
})

function selector(state) {
  const { home } = state;
  console.log(home)
  return {
    home
  };
}
// 导出组件方式改变
export default connect(selector)(PopularPage);
```

## 封装公共Toast

### 官方资料

[teaset-pro](https://github.com/LZHD/teaset-pro)

[中文文档](https://github.com/LZHD/teaset-pro/blob/master/docs/cn/README.md)

### 安装依赖

```cmd
npm install --save teaset-pro
```

### 集成到项目中

因为我们此前在项目中引入`redux`，所以我们需要在`App.js`中执行以下操作:

```App.js
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './navigator/AppNavigators';
import store from './store';
import Geo from './utils/geo';
// 将TopView从teaset-pro中引入
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
  }
  render() {
    return (
      <Provider store={store}>
      	// 用此组件将内容包裹，为 Overlay 类型的组件提供容器
        <TopView>
            {this.state.isInitGeo ? <AppNavigator /> : <></>}
        </TopView>
      </Provider>
    );
  }
}

export default App;
```

### 开始封装Toast组件

在`utils/toast.js`文件中：

```toast.js
// react-native loading组件
import { ActivityIndicator } from 'react-native';
import React from 'react';
// 将Toast，Theme 组件从teaset-pro中引入
import {Toast, Theme} from 'teaset-pro';

let customKey = null;

Toast.showLoading = text => {
  if (customKey) {
    return;
  }
  customKey = Toast.show({
    text: text,
    icon: <ActivityIndicator size="large" color={Theme.toastIconTintColor} />,
    position: 'center',
    duration: 100000,
  });
};

Toast.hideLoading = () => {
  if (!customKey) {
    return;
  }
  Toast.hide(customKey);
  customKey = null;
};

export default Toast;
```

### 在页面中使用

在这里我们仍然在`PopularPage.js`中使用, 这里只贴使用代码了。

```PopularPage.js
// 引入依赖
import Toast from '../utils/toast'

// 头部Tab组件
class PopularPageTabOne extends Component {
    render() {
    	const { dispatch, home } = this.props;
        return (
          <View style={styles.container}>
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
            <TouchableHighlight
                  style={styles.itemView}
                  underlayColor="red"
                  onPress={this.startWatchLocation}>
                  <Text style={styles.itemText}>开启实时定位</Text>
            </TouchableHighlight>
            <TouchableHighlight
                  style={styles.itemView}
                  underlayColor="red"
                  onPress={this.stopWatchLocation}>
                  <Text style={styles.itemText}>关闭实时定位</Text>
            </TouchableHighlight>
            <TouchableHighlight
                  style={styles.itemView}
                  underlayColor="red"
                  onPress={this.showLoading}>
                  <Text style={styles.itemText}>展示Loading组件</Text>
            </TouchableHighlight>
            <TouchableHighlight
                  style={styles.itemView}
                  underlayColor="red"
                  onPress={this.hideLoading}>
                  <Text style={styles.itemText}>关闭Loading组件</Text>
            </TouchableHighlight>
             <TouchableHighlight
                  style={styles.itemView}
                  underlayColor="red"
                  onPress={this.openToastSad}>
                  <Text style={styles.itemText}>使用Toast组件原有方法</Text>
            </TouchableHighlight>
          </View>
        );
    }
    // 开启实时定位方法
    startWatchLocation = () => {
    	// 设置实时定位频率
        Geo.custSetInterval(10000);
        Geo.startWatchLocation();
  	};
  	// 关闭实时定位方法
    stopWatchLocation = () => {
        Geo.stopWatchLocation();
    };
    // 打开Loading Toast
    showLoading = () => {
     	Toast.showLoading()
    };
    // 关闭Loading Toast
    hideLoading = () => {
    	Toast.hideLoading()
    };
    // 使用Toast组件原有方法
    openToastSad = () => {
    	Toast.sad('输入不合法', 2000, 'center');
    }
}
```

## 封装请求 Axios

### 安装依赖

```cmd
yarn add axios
```

### 接口地址封装

在`utils/pathMap.js`中

```pathMap.js
/**
 * 接口基地址
 */
export const BASE_URI = 'http://10.255.52.38:9089';

/**
 *  登录 获取验证码
 */
export const ACCOUNT_LOGIN = '/user/login';

```

### 请求封装

在`utils/request.js`文件夹中

```request.js
import axios from 'axios';
import {BASE_URI} from './pathMap';
// 引入封装的Loading Toast
import Toast from './toast';
const instance = axios.create({
  baseURL: BASE_URI,
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 每次请求会加上Loading
    Toast.showLoading('请求中');
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    Toast.hideLoading();
    // 对响应数据做点什么
    return response.data; // 在响应拦截时 直接返回 response.data, 省的每次请求都要处理
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  },
);

export default {
  get: instance.get,
  post: instance.post,
  // post 自动带上token
  privatePost: (url, data = {}, options = {}) => {
    const token =  '此处从Redux中取 token';
    const headers = options.header || {};
    return instance.post(url, data, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        ...headers,
      },
    });
  },
};

```

### 在页面中使用

在这里我们仍然在`PopularPage.js`中使用, 这里只贴使用代码了。

```PopularPage.js
// 引入请求
import request from '../utils/request'
import { ACCOUNT_LOGIN } from '../utils/pathMap';

// 头部Tab组件
class PopularPageTabOne extends Component {
    render() {
    	const { dispatch, home } = this.props;
        return (
          <View style={styles.container}>
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
            <TouchableHighlight
                  style={styles.itemView}
                  underlayColor="red"
                  onPress={this.startWatchLocation}>
                  <Text style={styles.itemText}>开启实时定位</Text>
            </TouchableHighlight>
            <TouchableHighlight
                  style={styles.itemView}
                  underlayColor="red"
                  onPress={this.stopWatchLocation}>
                  <Text style={styles.itemText}>关闭实时定位</Text>
            </TouchableHighlight>
             <TouchableHighlight
                  style={styles.itemView}
                  underlayColor="red"
                  onPress={this.loadData}>
                  <Text style={styles.itemText}>发送请求</Text>
            </TouchableHighlight>
          </View>
        );
    }
    // 开启实时定位方法
    startWatchLocation = () => {
    	// 设置实时定位频率
        Geo.custSetInterval(10000);
        Geo.startWatchLocation();
  	};
  	// 关闭实时定位方法
    stopWatchLocation = () => {
        Geo.stopWatchLocation();
    };
    // 发送请求
    loadData = () => {
      try {
      	  // 如果需要携带 token 的请求, 可以使用 request.privatePost()
          const result = await request.post(ACCOUNT_LOGIN, {
            phone: phoneNumber,
          });
          if (result.code === '10000') {

          } else {

          }
      } catch (err) {
      	  console.log(err);
      }
    }
}
```

## 集成Sqlite

### 安装依赖

```cmd
// 安装依赖
npm install --save react-native-sqlite-storage
// link
react-native link react-native-sqlite-storage
```

### 手动配置

在`android/app/build.gradle`中添加如下配置

```build.gradle
 dependencies {
   implementation fileTree(dir: "libs", include: ["*.jar"])
   implementation "com.android.support:appcompat-v7:${rootProject.ext.supportLibVersion}"
   implementation "com.facebook.react:react-native:+"  // From node_modules
 ...
+  implementation project(':react-native-sqlite-storage')
  }
```

### 封装公共方法

#### sqlite库名文件

在`utils/sqliteConfig.js`中统一管理库名

```sqliteConfig.js
export const DB_Name = 'VisitApp';
```

#### sqlite服务

在`utils/sqliteServices.js`中封装

```sqliteServcies.js
import React,{Component} from 'react'

import SQLiteManager from 'react-native-sqlite-storage'
import {DB_Name} from './sqlitConfig'

SQLiteManager.DEBUG(true)
let DB = undefined // 数据库对象

/**
 * [initDB 创建数据库]
 * @param  {[type]} userID [用户id，每一个用户独立对应一个数据库]
 */
function initDB(userID) {
  try {
    DB = SQLiteManager.openDatabase(
      {
        name: DB_Name + userID +'.db', // 数据库名称
        // 仅支持ios，DB在android的位置是固定的，在ios需要指定位置，default(Library/LocalDatabase)
        location: 'Documents' 
      },
      initDBSuccess,
      initDBError
    )
  } catch (e) {
    console.log('initDB error =', e)
  } finally {
  }
}

/**
 * [initDBSuccess 创建数据库成功输出]
 */
function initDBSuccess(){
  console.log('initDBSuccess')
}

/**
 * [initDBError 创建数据库失败输出]
 */
function initDBError(err){
  console.log(DB_Name + 'initDBError error =',err)
}

/**
 * [closeDB 关闭数据库]
 */
function closeDB(){
  if(DB){
    DB.close()
    console.log(DB_Name + 'close success')
  }else {
    console.log(DB_Name + 'not open')
  }
}

/**
 * [createTable 创建表]
 * @param  {[type]} sql             [sql 语句]
 * @param  {[type]} callBack        [回调   true, data ]
 */
function createTable(sql, callBack) {
  console.log(`createTable is =${sql}`)
  DB.transaction((tx) => {
    tx.executeSql(
      sql,
      [],
      () => {
        callBack && callBack(true)
        console.log(`createTable executeSql success`)
      },
      (err) => {
        callBack && callBack(false, err)
        console.log('createTable  executeSql error=',err)
      })
    },
    (err) => {
      console.log('createTable  transaction error=',err)
    },
    () => {
      console.log(`createTable transaction success`)
    })
}

/**
 * [insertDataToTable 插入或者更新数据]
 * @param  {[type]} tableName [表名]
 * @param  {[type]} data      [数据]
 */
function insertDataToTable(tableName, data, callBack){
  let sql = `INSERT OR REPLACE INTO ${tableName} (${Object.keys(data).join(',')}) VALUES (${Array(Object.keys(data).length).fill('?').join(',')})`
  console.log(`insertDataToTable ${tableName} sql is =${sql}`)
  DB.transaction((tx) => {
    tx.executeSql(
      sql,
      Object.values(data),
      () => {
        callBack && callBack(true)
        console.log(`insertDataToTable ${tableName} executeSql success`)
      },
      (err) => {
        callBack && callBack(false, err)
        console.log('insertDataToTable  executeSql error=',err)
      })
    },
    (err) => {
      console.log('insertDataToTable  transaction error=',err)
    },
    () => {
      console.log(`insertDataToTable ${tableName} transaction success`)
    })
}


/**
 * [deleteDataFromTable 根据id从表中删除某一条数据]
 * @param  {[type]} tableName [表名]
 * @param  {[type]} key        [字段名称，要根据此字段进行删除对应的数据]
 * @param  {[type]} value        [要删除数据的唯一标识]
 */
function deleteDataFromTable(tableName, key, value, callBack){
  let sql = `DELETE FROM ${tableName} WHERE ${key} = ${value}`
  console.log(`deleteDataFromTable ${tableName} sql is =${sql}`)
  DB.transaction((tx) => {
    tx.executeSql(
      sql,
      [],
      () => {
        callBack && callBack(true)
        console.log(`deleteDataFromTable ${tableName} executeSql success`)
      },
      (err) => {
        callBack && callBack(false, err)
        console.log('deleteDataFromTable  executeSql error=',err)
      })
    },
    (err) => {
      console.log('deleteDataFromTable  transaction error=',err)
    },
    () => {
      console.log(`deleteDataFromTable ${tableName} transaction success`)
    })
}

/**
 * [selectDataFromTable 查询表中所有数据]
 * @param  {[type]} tableName [表名]
 */
function selectDataFromTable(tableName, callBack){
  let sql = `SELECT * FROM ${tableName}`
  console.log(`selectDataFromTable ${tableName} sql is =${sql}`)
  DB.transaction((tx) => {
    tx.executeSql(
      sql,
      [],
      (tx,results) => {
        let datas = [];
        for(let i = 0; i < results.rows.length; i++){
          let info = results.rows.item(i);
          datas.push(info)
        }
        callBack && callBack(true, datas)
        console.log(`selectDataFromTable ${tableName} executeSql success`)
      },
      (err) => {
        callBack && callBack(false, err)
        console.log('selectDataFromTable  executeSql error=',err)
      })
    },
    (err) => {
      console.log('selectDataFromTable  transaction error=',err)
    },
    () => {
      console.log(`selectDataFromTable ${tableName} transaction success`)
    })
}

/**
 * [getMsgInfoFromTable 根据id获取某一条信息]
 * @param  {[type]} tableName [表名]
 * @param  {[type]} key        [字段名称，要根据此字段进行获取对应的数据]
 * @param  {[type]} value        [要获取数据的唯一标识]
 */
function getMsgInfoFromTable(tableName, key, value, callBack){
  let sql = `SELECT * FROM ${tableName} WHERE ${key} = ${value}`
  console.log(`getMsgInfoFromTable ${tableName} sql is =${sql}`)
  DB.transaction((tx) => {
    tx.executeSql(
      sql,
      [],
      (tx,results) => {
        callBack && callBack(true, results.rows.item(0))
        console.log(`getMsgInfoFromTable ${tableName} executeSql success`)
      },
      (err) => {
        callBack && callBack(false, err)
        console.log('getMsgInfoFromTable  executeSql error=',err)
      })
    },
    (err) => {
      console.log('getMsgInfoFromTable  transaction error=',err)
    },
    () => {
      console.log(`getMsgInfoFromTable ${tableName} transaction success`)
    })
}


/**
 * [dropTable 删除表]
 * @param  {[type]} tableName [表名]
 */
function dropTable(tableName, callBack){
  let sql = `DROP TABLE ${tableName}`
  console.log(`dropTable ${tableName} sql is =${sql}`)
  DB.transaction((tx) => {
    tx.executeSql(
      sql,
      [],
      (tx,results) => {
        callBack && callBack(true)
        console.log(`dropTable ${tableName} executeSql success`)
      },
      (err) => {
        callBack && callBack(false, err)
        console.log('dropTable  executeSql error=',err)
      })
    },
    (err) => {
      console.log('dropTable  transaction error=',err)
    },
    () => {
      console.log(`dropTable ${tableName} transaction success`)
    })
}

/**
 * [customSQL 自定义sql语句]
 * @param  {[type]} sql      [sql语句]
 */
function runCustomSQL(sql, callBack){
  DB.transaction((tx) => {
    tx.executeSql(
      sql,
      [],
      (tx,results) => {
        console.log(`runCustomSQL  executeSql success`)
        if (results && results.rows){
          let datas = [];
          for(let i = 0; i < results.rows.length; i++){
            let info = results.rows.item(i);
            datas.push(info)
          }
          callBack && callBack(true, datas)
          return
        }
        callBack && callBack(true)
      },
      (err) => {
        callBack && callBack(false, err)
        console.log('runCustomSQL  executeSql error=',err)
      })
    },
    (err) => {
      console.log('runCustomSQL  transaction error=',err)
    },
    () => {
      console.log(`runCustomSQL  transaction success`)
    })
}

export default {
  initDB,
  closeDB,
  createTable,
  insertDataToTable,
  deleteDataFromTable,
  selectDataFromTable,
  getMsgInfoFromTable,
  dropTable,
  runCustomSQL
}

```

### 在页面中使用

#### 初始化数据库

在`App.js`中初始化数据库并创建`LOCATION`表

```App.js
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

```

#### 插入数据/获取数据

我们在`PopularPage.js`中实现，这里只贴使用代码了。

```PopularPage.js
// 引入请求
import request from '../utils/request'
import { ACCOUNT_LOGIN } from '../utils/pathMap';
import SqliteServices from '../utils/sqliteServices';

// 头部Tab组件
class PopularPageTabOne extends Component {
	constructor(props) {
		super(props)
		this.state = {
			locationInfo: {}
		}
	}
    render() {
    	const { dispatch, home } = this.props;
    	const { locationInfo } = this.state;
        return (
          <View style={styles.container}>
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
            <TouchableHighlight
                  style={styles.itemView}
                  underlayColor="red"
                  onPress={this.startWatchLocation}>
                  <Text style={styles.itemText}>开启实时定位</Text>
            </TouchableHighlight>
            <TouchableHighlight
                  style={styles.itemView}
                  underlayColor="red"
                  onPress={this.stopWatchLocation}>
                  <Text style={styles.itemText}>关闭实时定位</Text>
            </TouchableHighlight>
            <TouchableHighlight
                  style={styles.itemView}
                  underlayColor="red"
                  onPress={this.insertLocationData}>
                  <Text style={styles.itemText}>插入地理位置数据</Text>
            </TouchableHighlight>
            <TouchableHighlight
                  style={styles.itemView}
                  underlayColor="red"
                  onPress={this.getLocationData}>
                  <Text style={styles.itemText}>获取插入地理位置数据</Text>
            </TouchableHighlight>
            <View>
            	<Text>{locationInfo.latitude}----{ locationInfo. longitude}----{locationInfo.address}</Text>
          	</View>
          </View>
        );
    }
    // 开启实时定位方法
    startWatchLocation = () => {
    	// 设置实时定位频率
        Geo.custSetInterval(10000);
        Geo.startWatchLocation();
  	};
  	// 关闭实时定位方法
    stopWatchLocation = () => {
        Geo.stopWatchLocation();
    };
    insertLocationData = () => {
        const data = {
          latitude: '39.888556',
          longitude: '116.417516',
          address: '北京市东城区天坛街道元隆大厦',
          timestamp: '1632970901323'
        }
        SqliteServices.insertDataToTable('LOCATION', data, (result) => {
          console.log(result)
       })
  }
  getLocationData = () => {
      SqliteServices.selectDataFromTable('LOCATION', (result, datas) => {
          if (result) {
               console.log(datas)
               this.setState({
                  locationInfo: datas[0]
               })
          }
    })
  }
    
}
```

## 集成Camera

### 官方资料

[react-native-camera](https://www.npmjs.com/package/react-native-camera)

### 安装依赖

```cmd
// 引入依赖
npm install react-native-camera --save
// link 到项目中
react-native link react-native-camera
```

### 手动配置

#### 添加权限

在`android\app\src\main\AndroidManifest.xml`添加拍照权限

```AndroidManifest.xml
 <uses-permission android:name="android.permission.INTERNET" />
+ <uses-permission android:name="android.permission.CAMERA" />+
+ <uses-permission android:name="android.permission.RECORD_AUDIO"/>
+ <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
+ <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

#### 其他配置

在`android/app/build.gradle`

```build.gradle
android {
  ...
  defaultConfig {
    ...
    missingDimensionStrategy 'react-native-camera', 'general' // <--- insert this line
  }
}
```

### 在页面中使用

拍照我们在第二个`tab`页使用（`TrendeingPage.js`）

```TrendingPage.js
import React, {PureComponent, Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';

class TrendingPage extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style={styles.capture}>
            <Text style={{fontSize: 14}}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  welcome: {
      color: 'white'
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

export default TrendingPage;

```

### 图片文件存储

```cmd
file:///data/user/0/comd.github_reactnative/cache/Camera/898cad6a-4f4e-411b-8397-bd0e079a9819.jpg
```

### 后续规划

我们会单独封装一个`Modal`组件，在需要调用拍照的地方都打开此`Modal`组件

## 小技巧

### 关闭黄色警告框

在`index.js`入口文件中添加如下代码

```index.js
console.ignoreYellowBox = ['Warning: BackAndroid is deprecated. Please use BackHandler instead.','source.uri should not be an empty string','Invalid props.style key'];

console.disableYellowBox = true // 关闭全部黄色警告
```

### 查看NetWork请求

在`index.js`入口文件中添加如下代码

```index.js
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
```

