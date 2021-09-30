import React, { Component } from "react";
// 在这里配置页面的路由
const TABS = {

};

export default class DynamicTabNavigator extends Comment {
    constructor(props) {
        super(props)
    }

    _tabNavigator() {
        const {PopularPage, TrendingPage,FavoritePage, MyPage} = TABS;
        const tabs = { PopularPage, TrendingPage,FavoritePage, MyPage };
        
    }
}