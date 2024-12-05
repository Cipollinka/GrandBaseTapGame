import React, {ReactNode} from 'react';
import {
  TouchableOpacity,
  ViewStyle,
  StyleSheet,
  StyleProp,
  Dimensions,
} from 'react-native';

import Text from '../text';

interface ButtonProps {
  title: string;
  bg?: string;
  color?: string;
  small?: boolean;
  disabled?: boolean;
  onPress: () => void;
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const {width} = Dimensions.get('window');

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  small,
  bg = '#FF5E23',
  disabled,
  color,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.buttonContainer,
        style,
        small ? styles.small : null,
        disabled ? styles.disabled : null,
        {backgroundColor: bg},
      ]}>
      <Text
        style={[styles.buttonText, small ? styles.smallText : null, {color}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF5E23',
    paddingHorizontal: 20,
    paddingVertical: width <= 375 ? 10 : 16,
  },
  icon: {
    marginRight: 6,
  },
  disabled: {
    opacity: 0.5,
  },
  small: {
    borderRadius: 20,
    paddingVertical: 10,
    maxWidth: 200,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 14,
    fontWeight: '400',
  },
});

export default Button;
