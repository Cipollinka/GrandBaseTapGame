import React from 'react';
import dayjs from 'dayjs';
import {useFocusEffect} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import GiftsScreen from 'app/screens/gifts';
import GameScreen from 'app/screens/game';
import HomeScreen from 'app/screens/home';

import {setTries} from 'app/store/coreReducer';
import {useAppDispatch, useAppSelector} from 'app/store/hooks';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const dispatch = useAppDispatch();
  const {tries = {}} = useAppSelector(state => state.core);

  useFocusEffect(
    React.useCallback(() => {
      const currentDate = dayjs().format('YYYY-MM-DD');
      if (tries[currentDate]) {
        dispatch(setTries({[currentDate]: 10}));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Game" component={GameScreen} />
      <Stack.Screen name="Gifts" component={GiftsScreen} />
    </Stack.Navigator>
  );
}

export default RootNavigator;
