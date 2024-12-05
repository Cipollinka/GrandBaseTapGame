import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from 'app/store/store';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from 'app/navigationRef';
import RootNavigator from 'app/navigation/RootNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const rootStyles = {flex: 1};

export default function GameScreen() {
  return (<GestureHandlerRootView style={rootStyles}>
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
          <RootNavigator />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  </GestureHandlerRootView>);
}
