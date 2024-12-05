import React, {memo, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import dayjs from 'dayjs';

import FallingBlockGame from './Block';
import Text from 'app/components/text';
import {navigate} from 'app/navigationRef';
import ModalWrapper from 'app/components/modal-wrapper';
import {setResources, setTries} from 'app/store/coreReducer';
import {useAppSelector, useAppDispatch} from 'app/store/hooks';

function generateBlocks() {
  const blocks = [];
  const rockCount = Math.floor(20 * 0.75); // 75% of 20
  const treeCount = Math.floor(20 * 0.2); // 20% of 20
  const fireCount = 20 - (rockCount + treeCount); // remaining 5% (ensure total is 20)

  for (let i = 0; i < rockCount; i++) {
    blocks.push('rock');
  }
  for (let i = 0; i < treeCount; i++) {
    blocks.push('tree');
  }
  for (let i = 0; i < fireCount; i++) {
    blocks.push('fire');
  }

  for (let i = blocks.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [blocks[i], blocks[j]] = [blocks[j], blocks[i]];
  }

  return blocks;
}

const defaultBlockArray = generateBlocks();
const currentDate = dayjs().format('YYYY-MM-DD');

interface IProps {
  pause: () => void;
  onRestart: () => void;
  isGameEnded: boolean;
}

const initialResources = {tree: 0, rock: 0};

const GameView: React.FC<IProps> = ({onRestart, isGameEnded, pause}) => {
  const dispatch = useAppDispatch();
  const [showEndModal, toggleShowEndModal] = useState(false);
  const [showFireModal, toggleShowFireModal] = useState(false);
  const [blockArray, setBlockArray] = useState(defaultBlockArray);
  const [tempResources, setTempResources] = useState(initialResources);

  const {resources, tries} = useAppSelector(state => state.core);

  const handlePress = (type: string) => {
    const nextResources = {...(resources || {tree: 0, rock: 0})};
    const nextTempResources = {...tempResources};

    if (type === 'tree') {
      nextResources.tree = nextResources.tree + 1;
      nextTempResources.tree = nextTempResources.tree + 1;
      dispatch(setResources(nextResources));
      setTempResources(nextTempResources);
    }

    if (type === 'rock') {
      nextResources.rock = nextResources.rock + 1;
      nextTempResources.rock = nextTempResources.rock + 1;
      dispatch(setResources(nextResources));
      setTempResources(nextTempResources);
    }

    if (type === 'fire') {
      nextResources.tree = 0;
      nextResources.rock = 0;
      setBlockArray([]);
      pause();
      toggleShowFireModal(true);
    }
  };

  useEffect(() => {
    if (isGameEnded) {
      setBlockArray([]);
      toggleShowEndModal(true);
    }
  }, [isGameEnded]);

  const triesCount = tries?.[currentDate] || 10;

  return (
    <View style={styles.game}>
      {blockArray.map((item, index) => {
        return (
          <FallingBlockGame
            index={index}
            type={item}
            onPress={() => handlePress(item)}
            key={`${item}_${index}`}
          />
        );
      })}

      {showFireModal && (
        <ModalWrapper
          isOpen
          resources={{tree: 0, rock: 0}}
          secondaryText="Ok"
          primaryText="One more try"
          onSecondaryPress={() => {
            toggleShowFireModal(false);
            setTempResources(initialResources);
            dispatch(
              setResources({
                tree: resources.tree - tempResources.tree,
                rock: resources.rock - tempResources.rock,
              }),
            );
            dispatch(setTries({[currentDate]: triesCount - 1}));
            navigate('Home');
          }}
          onPrimaryPress={() => {
            toggleShowFireModal(false);
            setTempResources(initialResources);
            dispatch(
              setResources({
                tree: resources.tree - tempResources.tree,
                rock: resources.rock - tempResources.rock,
              }),
            );
            dispatch(setTries({[currentDate]: triesCount - 1}));
            onRestart();
          }}
          title="Unfortunately, you caught a fire block, and to save yourself, you left all your collected resources behind. Try again.">
          <Text mt={15} mb={17}>
            You have {triesCount - 1} tries left.
          </Text>
        </ModalWrapper>
      )}

      {showEndModal && (
        <ModalWrapper
          isOpen
          resources={tempResources}
          secondaryText="Claim"
          primaryText={triesCount > 0 ? 'One more try' : ''}
          onSecondaryPress={() => {
            toggleShowEndModal(false);
            setTempResources(initialResources);
            dispatch(setTries({[currentDate]: triesCount - 1}));
            navigate('Home');
          }}
          onPrimaryPress={() => {
            toggleShowEndModal(false);
            setTempResources(initialResources);
            dispatch(setTries({[currentDate]: triesCount - 1}));
            onRestart();
          }}
          title="Congratulations! You have gathered a good amount of resources. You can use them to build your base!">
          <Text mt={15} mb={17}>
            You have {triesCount - 1} tries left.
          </Text>
        </ModalWrapper>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  game: {
    width: '100%',
    height: '100%',
  },
});

export default memo(GameView);
