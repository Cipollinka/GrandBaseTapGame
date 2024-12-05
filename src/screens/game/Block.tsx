import React, {useEffect, memo, useState} from 'react';
import {Animated, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import random from 'lodash.random';
import FastImage from 'react-native-fast-image';

const {height, width} = Dimensions.get('screen');

interface IProps {
  type: string;
  index: number;
  onPress: () => void;
}
const FallingBlockGame: React.FC<IProps> = ({type, index, onPress}) => {
  const [fallAnim] = useState(new Animated.Value(-200)); // Vertical animation for each block
  const [showBlock, toggleShowBlock] = useState(false);
  const [blockPositionX, setBlockPositionX] = useState(random(0, width - 50)); // Random horizontal position

  const startFalling = () => {
    toggleShowBlock(true);
    setBlockPositionX(random(0, width - 50)); // Set a new random X position
    fallAnim.setValue(-200); // Reset the block to the top

    Animated.timing(fallAnim, {
      toValue: height, // Animate to the bottom
      duration: random(5000, 7000), // Random fall duration
      useNativeDriver: true,
    }).start(() => {
      startFalling(); // Restart falling when the block reaches the bottom
    });
  };

  useEffect(() => {
    startFalling();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const handlePress = () => {
    toggleShowBlock(false);
    onPress();
  };

  return showBlock ? (
    <Animated.View
      shouldRasterizeIOS
      style={[
        styles.block,
        {
          transform: [{translateY: fallAnim}, {translateX: blockPositionX}],
        },
      ]}>
      <TouchableOpacity onPressIn={handlePress}>
        <FastImage
          source={
            type === 'tree'
              ? require('app/assets/images/tree.png')
              : type === 'rock'
              ? require('app/assets/images/rock.png')
              : require('app/assets/images/fire.png')
          }
          style={styles.image}
        />
      </TouchableOpacity>
    </Animated.View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  block: {
    width: 70,
    height: 70,
    position: 'absolute',
    top: 0,
  },
  image: {
    width: 70,
    height: 70,
  },
});

export default memo(FallingBlockGame);
