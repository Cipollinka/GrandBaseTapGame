import React, {PropsWithChildren, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

import Modal from 'react-native-modal';

import Text from '../text';
import Button from '../button';

interface IProps {
  isOpen: boolean;
  title?: string;
  onPrimaryPress?: () => void;
  onSecondaryPress?: () => void;
  primaryText?: string;
  secondaryText?: string;
  resources?: {
    tree: number;
    rock: number;
  };
}

const ModalWraper: React.FC<PropsWithChildren<IProps>> = ({
  isOpen,
  title,
  children,
  primaryText,
  onPrimaryPress,
  secondaryText,
  resources,
  onSecondaryPress,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setModalVisible(isOpen);
  }, [isOpen]);

  return (
    <Modal isVisible={modalVisible} hasBackdrop>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {title && (
            <Text ta="center" fontWeight="600" mb={17}>
              {title}
            </Text>
          )}

          {resources && (
            <View style={styles.info}>
              <View style={styles.badgeContainer}>
                <FastImage
                  resizeMode="contain"
                  source={require('app/assets/images/tree.png')}
                  style={styles.badgeImage}
                />
                <Text fontSize={14} fontWeight="800">
                  {resources?.tree || 0}
                </Text>
              </View>
              <View style={styles.badgeContainer}>
                <FastImage
                  resizeMode="contain"
                  source={require('app/assets/images/rock.png')}
                  style={styles.badgeImage}
                />
                <Text fontSize={14} fontWeight="800">
                  {resources?.rock || 0}
                </Text>
              </View>
            </View>
          )}

          {children}

          {onSecondaryPress && secondaryText && (
            <Button
              title={secondaryText}
              color="#FF5E23"
              onPress={onSecondaryPress}
              bg="#F0F0F0"
            />
          )}

          {onPrimaryPress && primaryText && (
            <View style={styles.actions}>
              <Button
                title={primaryText}
                color="#fff"
                onPress={onPrimaryPress}
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 22,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  actions: {
    marginTop: 10,
    width: '100%',
  },
  modalView: {
    minHeight: 200,
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 23,
    padding: 35,
    paddingTop: 51,
    paddingHorizontal: 26,
    paddingBottom: 26,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
});

export default ModalWraper;
