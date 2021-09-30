export default class NavigationUtil {
    
    /**
     * 重置到首页
     * @param {*} params 
     */
    static resetToHomePage(params) {
        const { navigation } = params;
        navigation.replace('HomePage')
    }

    /**
     * 跳转到指定页面
     * @param {*} params 要传递的参数 
     * @param {*} pageName 要跳转的页面名称
     */
    static goPage(params, pageName) {
        NavigationUtil.navigation.navigate(pageName, {...params})
    }

    /**
     * 回退到上一页
     */
    static goBack() {
        NavigationUtil.navigation.goBack()
    }
}