import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTimer} from 'react-timer-hook';
import {useFocusEffect} from '@react-navigation/native';
import dayjs from 'dayjs';

import GameView from './View';
import Text from 'app/components/text';
import SafeView from 'app/components/safe-view';
import Header from 'app/components/header';
import {useAppSelector} from 'app/store/hooks';

const time = new Date();
time.setSeconds(time.getSeconds() + 3);
const gametime = new Date();
gametime.setSeconds(gametime.getSeconds() + 120);
const currentDate = dayjs().format('YYYY-MM-DD');

const GameScreen: React.FC = () => {
  const [showGame, toggleShowGame] = useState(false);
  const {tries} = useAppSelector(state => state.core);

  const {
    seconds: gameSeconds,
    minutes,
    restart: restartGameTimer,
    pause,
  } = useTimer({
    expiryTimestamp: gametime,
    onExpire: () => toggleShowGame(true),
  });

  const {seconds, restart} = useTimer({
    expiryTimestamp: time,
    onExpire: () => {
      const gameTime = new Date();
      gameTime.setSeconds(gameTime.getSeconds() + 120);
      toggleShowGame(true);
      restartGameTimer(gameTime);
    },
  });

  const restartGame = () => {
    pause();
    toggleShowGame(false);
    const newTime = new Date();
    newTime.setSeconds(newTime.getSeconds() + 3);
    restart(newTime);
  };

  useFocusEffect(
    React.useCallback(() => {
      restartGame();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const isGameEnded = minutes === 0 && gameSeconds === 0;
  const triesCount = tries?.[currentDate] || 10;

  return (
    <SafeView>
      <Header>
        {showGame && (
          <Text ta="center" fontSize={18} fontWeight="800" color="#fff">
            {minutes}:{gameSeconds.toString().padStart(2, '0')}
          </Text>
        )}
      </Header>

      {!showGame ? (
        <View style={styles.view}>
          <Text fontSize={18} ta="center" fontWeight="600" px={30} color="#fff">
            Get ready to gather resources, today you have only {triesCount}{' '}
            tries!
          </Text>
          <Text
            fontSize={100}
            ta="center"
            fontWeight="800"
            px={30}
            color="#fff">
            {seconds}
          </Text>
        </View>
      ) : (
        <GameView
          isGameEnded={isGameEnded}
          pause={pause}
          onRestart={restartGame}
        />
      )}
    </SafeView>
  );
};

const styles = StyleSheet.create({
  view: {
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  game: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
});

export default GameScreen;
