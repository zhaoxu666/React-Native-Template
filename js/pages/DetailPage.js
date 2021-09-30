import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
class DetailPage extends Component {
    render() { 
        return (
            <View>
                <Text>我是详情页</Text>
                <Button onPress={this.handleGoBack} title="回退"></Button>
            </View>
        );
    }
    handleGoBack = () => {
        this.props.navigation.goBack()
    }
}
 
export default DetailPage;