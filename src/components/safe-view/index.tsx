import React, {PropsWithChildren} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface IProps {
  ph?: number;
}

const SafeView: React.FC<PropsWithChildren<IProps>> = ({children}) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/bg_dark.png')} style={{flex:1, width: '100%', height: '100%', position: 'absolute'}}/>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SafeView;
