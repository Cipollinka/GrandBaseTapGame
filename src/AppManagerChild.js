import React, { useRef, useState } from 'react';
import { Linking, SafeAreaView, StatusBar, TouchableOpacity, View, Image } from 'react-native';
import WebView from 'react-native-webview';

export default function AppManagerChild({navigation, route}) {
    const linkRefresh = route.params.data;

    const webViewRef = useRef(null);

    const [isTwoClick, setTwoClick] = useState(false);

	const redirectDomens = [
		'https://ninecasino.life/#deposit',
    ];

    function backHandler() {
		if (isTwoClick) {
			navigation.goBack();
			return;
		}
		setTwoClick(true);
		webViewRef.current.goBack();
		setTimeout(() => {
			setTwoClick(false);
		}, 1000);
    }

	const checkLinkInArray = (link, array) => {
		for (let i = 0; i < array.length; i++) {
			if (link.includes(array[i])) {return true;}
		}
		return false;
    };
    const onShouldStartLoadWithRequest = event => {
		if (checkLinkInArray(event.mainDocumentURL, redirectDomens)) {
			navigation.navigate('main');
			return false;
		}
		return true;
    };

    return <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
			<StatusBar
			barStyle={'light-content'}/>
			<WebView
				originWhitelist={[
				'*',
				'http://*',
				'https://*',
				'intent://*',
				'tel:*',
				'mailto:*',
				]}
				source={{uri: linkRefresh}}
				textZoom={100}
				onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
				allowsBackForwardNavigationGestures={true}
				domStorageEnabled={true}
				javaScriptEnabled={true}
				allowsInlineMediaPlayback={true}
				mediaPlaybackRequiresUserAction={false}
				setSupportMultipleWindows={true}
				contentMode="mobile"
				allowFileAccess={true}
				showsVerticalScrollIndicator={false}
				javaScriptCanOpenWindowsAutomatically={true}
				style={{flex: 1, marginBottom: 10}}
				ref={webViewRef}
				userAgent={'Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Safari/604.1 Version/18.0'}
			/>
		</SafeAreaView>
		<TouchableOpacity style={{width: 30, height: 30,  position: 'absolute', bottom: 5, left: 25, alignItems: 'center', justifyContent: 'center'}} onPress={() => {backHandler()}}>
			<Image source={require('./assets/images/_back.png')} style={{width: '90%', height: '90%', resizeMode: 'contain'}}/>
		</TouchableOpacity>

		<TouchableOpacity style={{width: 30, height: 30,  position: 'absolute', bottom: 5, right: 25, alignItems: 'center', justifyContent: 'center', padding: 5}} onPress={() => {webViewRef.current.reload()}}>
			<Image source={require('./assets/images/_reload.png')} style={{width: '90%', height: '90%', resizeMode: 'contain'}}/>
		</TouchableOpacity>
    </View>;
}
