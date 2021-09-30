/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './js/App'

// react-native-debugger查看Network
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

// 关闭黄色警告
console.ignoreYellowBox = [
  'Warning: BackAndroid is deprecated. Please use BackHandler instead.',
  'source.uri should not be an empty string',
  'Invalid props.style key',
];
console.disableYellowBox = true; // 关闭全部黄色警告

AppRegistry.registerComponent(appName, () => App);
