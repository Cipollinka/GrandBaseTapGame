import React, {useState, useRef} from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import dayjs from 'dayjs';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Confetti from 'react-native-confetti';
import {List, Gift} from 'lucide-react-native';

import Text from 'app/components/text';
import {navigate} from 'app/navigationRef';
import Header from 'app/components/header';
import ModalWrapper from 'app/components/modal-wrapper';
import {useAppDispatch, useAppSelector} from 'app/store/hooks';
import {setActiveLevel, setResources} from 'app/store/coreReducer';

const {width, height} = Dimensions.get('window');

const maxLevel = 50;
const floorHeight = 52;
const levels = Array.from({length: maxLevel}, (_, i) => i + 1);

const currentDate = dayjs().format('YYYY-MM-DD');

const HomeScreen: React.FC = () => {
  const ref = useRef<any>(null);
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const [storyModalOpen, setStoryModalOpen] = useState(false);
  const [successFloorOpen, setSuccessFloorOpen] = useState(false);
  const [successFloorWithGiftOpen, setSuccessFloorWithGiftOpen] =
    useState(false);

  const {
    activeLevel = 3,
    tries,
    resources,
  } = useAppSelector(state => state.core);

  const isNextFinalLevel = activeLevel === maxLevel - 1;
  const isGiftVisible = (activeLevel + 1) % 3 === 0;
  const marginBottom = activeLevel <= 7 ? 0 : floorHeight * (activeLevel - 7);

  return (
    <ImageBackground
      source={require('app/assets/images/bg_light.png')}
      style={styles.root}>
      <Header />
      <View style={[styles.content, {marginBottom: insets.bottom + 10}]}>
        <View
          style={[
            styles.end,
            {
              marginBottom: -Math.abs(marginBottom),
            },
          ]}>
          {isNextFinalLevel ? (
            <FastImage
              source={require('app/assets/images/top.png')}
              resizeMode="contain"
              style={styles.block}
            />
          ) : (
            <View style={styles.top}>
              {isGiftVisible && (
                <View style={styles.gift}>
                  <Gift color="#FF5E23" />
                </View>
              )}

              <TouchableOpacity
                disabled={resources.rock < 50 || resources.tree < 10}
                onPress={() => {
                  dispatch(
                    setResources({
                      rock: resources.rock - 50,
                      tree: resources.tree - 10,
                    }),
                  );
                  dispatch(setActiveLevel(activeLevel + 1));

                  if (isGiftVisible) {
                    setSuccessFloorWithGiftOpen(true);
                  } else {
                    setSuccessFloorOpen(true);
                  }
                  ref?.current?.startConfetti();
                }}
                style={styles.topHeader}>
                <Text fontSize={12} fontWeight="800" color="#fff">
                  Build new level for:
                </Text>

                <View style={[styles.row, styles.topHeaderRow]}>
                  <View style={styles.row}>
                    <FastImage
                      resizeMode="contain"
                      source={require('app/assets/images/rock.png')}
                      style={styles.badgeImage}
                    />
                    <Text fontSize={14} fontWeight="800">
                      50
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <FastImage
                      resizeMode="contain"
                      source={require('app/assets/images/tree.png')}
                      style={styles.badgeImage}
                    />
                    <Text fontSize={14} fontWeight="800">
                      10
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
          {levels.slice(0, activeLevel).map((level, index) => {
            const isWindowBlock = index % 3 === 0;
            return (
              <FastImage
                source={
                  isWindowBlock
                    ? require('app/assets/images/windows.png')
                    : require('app/assets/images/block.png')
                }
                key={level}
                resizeMode="contain"
                style={styles.block}
              />
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          disabled={tries?.[currentDate] === 0}
          onPress={() => navigate('Game')}>
          <View style={styles.header}>
            <Text fontSize={20} fontWeight="800" color="#4C2B18">
              {tries?.[currentDate] !== undefined ? tries?.[currentDate] : 10}
            </Text>
            <Text fontSize={10} color="#8A8A8A">
              Daily tries
            </Text>
          </View>
          <Text fontWeight="800" fontSize={25} color="#fff" ta="center">
            Start Farming
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => navigate('Gifts')}
        style={[styles.listButton, {bottom: insets.bottom + 10}]}>
        <List size={26} color="#FF5E23" />
      </TouchableOpacity>
      <Confetti ref={ref} />

      {successFloorOpen && (
        <ModalWrapper
          isOpen
          primaryText="Thank you!"
          onPrimaryPress={() => {
            setSuccessFloorOpen(false);
          }}
          title="Congratulations! You have successfully built another floor of your grand base. Keep it up!"
        />
      )}

      {storyModalOpen && (
        <ModalWrapper
          isOpen
          secondaryText="Close"
          primaryText="Interesting story here, tap on me"
          onPrimaryPress={() => {
            setStoryModalOpen(false);
            navigate('Gifts');
          }}
          onSecondaryPress={() => {
            setStoryModalOpen(false);
          }}
          resources={{tree: 15, rock: 15}}
          title="Your gift:">
          <Text mt={1} />
        </ModalWrapper>
      )}

      {successFloorWithGiftOpen && (
        <ModalWrapper
          isOpen
          primaryText="Open"
          onPrimaryPress={() => {
            setSuccessFloorWithGiftOpen(false);
            setStoryModalOpen(true);
          }}
          title="Congratulations! You have successfully built another floor of your grand base.">
          <Text mt={15} mb={17} color="#FF5E23">
            On this floor, you found an interesting bonus. Claim it by clicking
            on the gift below.
          </Text>
        </ModalWrapper>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  end: {
    alignItems: 'flex-end',
  },
  gift: {
    width: 30,
    height: 30,
    borderRadius: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FF5E23',
    position: 'absolute',
    top: -15,
    right: -10,
  },
  root: {
    flex: 1,
    width,
    height,
  },
  top: {
    width: 272,
    height: 52,
    justifyContent: 'center',
    backgroundColor: '#58585880',
  },
  listButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    borderWidth: 1,
    borderColor: '#FF5E23',
  },
  topHeader: {
    maxWidth: 272,
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    borderColor: '#431D08',
    backgroundColor: '#FF5E23',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  center: {
    opacity: 0.7,
  },
  topHeaderRow: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderColor: '#431D08',
    backgroundColor: '#fff',
  },
  row: {
    gap: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeImage: {
    width: 20,
    height: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  block: {
    height: 52,
    width: 272,
  },
  button: {
    width: 182,
    height: 182,
    gap: 10,
    marginTop: -80,
    borderRadius: 100,
    borderWidth: 10,
    borderColor: '#A01515',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFB956',
  },
  header: {
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderColor: '#4A2815',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 30,
    justifyContent: 'center',
  },
});

export default HomeScreen;
