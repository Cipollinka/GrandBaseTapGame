import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Text from '../text';
import {useAppSelector} from 'app/store/hooks';

const Header: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
  const insets = useSafeAreaInsets();
  const {resources} = useAppSelector(state => state.core);

  return (
    <View style={[styles.container, {marginTop: insets.top + 16}]}>
      <View style={[styles.flex, styles.flexStart]}>
        <View style={styles.badgeContainer}>
          <FastImage
            resizeMode="contain"
            source={require('app/assets/images/tree.png')}
            style={styles.badgeImage}
          />
          <View style={styles.countContainer}>
            <Text fontSize={14} fontWeight="800">
              {resources?.tree || 0}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.flex}>{children}</View>

      <View style={[styles.flex, styles.flexEnd]}>
        <View style={styles.badgeContainer}>
          <FastImage
            resizeMode="contain"
            source={require('app/assets/images/rock.png')}
            style={styles.badgeImage}
          />
          <View style={styles.countContainer}>
            <Text fontSize={14} fontWeight="800">
              {resources?.rock}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  flexEnd: {
    alignItems: 'flex-end',
  },
  flexStart: {
    alignItems: 'flex-start',
  },
  flex: {
    flex: 1,
  },
  badgeContainer: {
    borderWidth: 1,
    gap: 10,
    backgroundColor: '#fff',
    borderColor: '#06448D',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    paddingLeft: 10,
    paddingRight: 24,
    borderRadius: 20,
  },
  badgeImage: {
    width: 28,
    height: 28,
  },
  countContainer: {},
});

export default Header;
