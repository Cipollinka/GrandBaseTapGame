import React, { useEffect, useRef, useState } from 'react';
import {Linking, SafeAreaView, StatusBar, TouchableOpacity, View, Image, Text, Alert} from 'react-native';
import WebView from 'react-native-webview';

import Storage from './Storage';
import LoadingAppManager from "app/LoadingAppManager";

export default function AppManagerMain({navigation}) {

    const [linkRefresh, setLinkRefresh] = useState('');

	async function getSavedParams() {
		await Storage.get('link').then((res) => {
			setLinkRefresh(res);
		});
	}
	useEffect(() => {
		getSavedParams();
	}, []);

    const webViewRef = useRef(null);

    const redirectDomens = [
		'https://spin.city/payment/success?identifier=',
		'https://jokabet.com/',
		'https://winspirit.app/?identifier=',
		'https://rocketplay.com/api/payments',
		'https://ninewin.com/',
    ];

    const browserOpenDomens = [
		'mailto:',
		'itms-appss://',
		'https://m.facebook.com/',
		'https://www.facebook.com/',
		'https://www.instagram.com/',
		'https://twitter.com/',
		'https://www.whatsapp.com/',
		'https://t.me/',
		'fb://',
		'conexus://',
		'bmoolbb://',
		'cibcbanking://',
		'bncmobile://',
		'rbcmobile://',
		'scotiabank://',
		'pcfbanking://',
		'tdct://',
		'nl.abnamro.deeplink.psd2.consent://',
		'nl-snsbank-sign://',
		'nl-asnbank-sign://',
		'triodosmobilebanking',
    ];

    const domensForBlock = [
		'bitcoin',
		'litecoin',
		'dogecoin',
		'tether',
		'ethereum',
		'bitcoincash',
    ];

    const checkLinkInArray = (link, array) => {
		for (let i = 0; i < array.length; i++) {
			if (link.includes(array[i])) {return true;}
		}
		return false;
    };

    const [currentURL, setCurrentURL] = useState('');

    function checkLockedURL(url) {
		setCurrentURL(url);
		setTimeout(() => {
			if (currentURL === 'about:blank') {webViewRef.current.injectJavaScript(`window.location.replace('${linkRefresh}')`);}
		}, 2000);
    }

    const onShouldStartLoadWithRequest = event => {
		let currentUrl = event.url;
		console.log(event);

		if (event.mainDocumentURL.includes('pay.skrill.com') || event.mainDocumentURL.includes('app.corzapay.com')) {
			navigation.navigate('child', {data: event.mainDocumentURL});
			webViewRef.current.injectJavaScript(`window.location.replace('${linkRefresh}')`);
		}

		if (checkLinkInArray(currentUrl, redirectDomens)) {
			webViewRef.current.injectJavaScript(`window.location.replace('${linkRefresh}')`);
		}

		if (checkLinkInArray(currentUrl, browserOpenDomens)) {
			webViewRef.current.injectJavaScript(`window.location.replace('${linkRefresh}')`);
			Linking.openURL(currentUrl);
		}

		if (checkLinkInArray(currentUrl, domensForBlock)) {
			webViewRef.current.stopLoading();
			return false;
		}
		return true;
    };

    const stateChange = navState => {
		const currentUrl = navState.url;
		checkLockedURL(currentUrl);
    };

    const [isInit, setInit] = React.useState(false);
    const [isLoadingPage, setLoadingPage] = useState(true);

    const finishLoading = () => {
      if (!isInit) {
        setInit(true);
        return;
      }
      setLoadingPage(false);
    };

    return <><View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
        <StatusBar barStyle={'light-content'}/>
        <WebView
          originWhitelist={[
          '*',
          'http://*',
          'https://*',
          'intent://*',
          'tel:*',
          'mailto:*',
          ]}
          onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
          onNavigationStateChange={stateChange}
          source={{uri: linkRefresh}}
          textZoom={100}
          allowsBackForwardNavigationGestures={true}
          domStorageEnabled={true}
          javaScriptEnabled={true}
          onLoadStart={() => setLoadingPage(true)}
          onLoadEnd={() => finishLoading()}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          setSupportMultipleWindows={true}
          contentMode="mobile"
          allowFileAccess={true}
          showsVerticalScrollIndicator={false}
          javaScriptCanOpenWindowsAutomatically={true}
          style={{flex: 1, marginBottom: 10}}
          ref={webViewRef}
          userAgent={'Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Safari/604.1 Version/18.1'}
        />
      </SafeAreaView>
      <TouchableOpacity style={{width: 30, height: 30,  position: 'absolute', bottom: 5, left: 25, alignItems: 'center', justifyContent: 'center'}} onPress={() => {webViewRef.current.goBack()}}>
        <Image source={require('./assets/images/_back.png')} style={{width: '90%', height: '90%', resizeMode: 'contain'}}/>
      </TouchableOpacity>

      <TouchableOpacity style={{width: 30, height: 30,  position: 'absolute', bottom: 5, right: 25, alignItems: 'center', justifyContent: 'center', padding: 5}} onPress={() => {webViewRef.current.reload()}}>
        <Image source={require('./assets/images/_reload.png')} style={{width: '90%', height: '90%', resizeMode: 'contain'}}/>
      </TouchableOpacity>
    </View>
      {isLoadingPage ? <LoadingAppManager/> : <></>}
    </>;
}
