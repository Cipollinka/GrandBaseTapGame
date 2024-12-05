import React from 'react';
import {Image} from 'react-native';

const imageStyle = {width: '100%', height: '100%'};

export default function LoadingScreen() {
  const imageList = [
    require('./assets/images/loader1.png'),
    require('./assets/images/loader2.png'),
  ];
  const [isChangeImage, setChangeImage] = React.useState(false);
  setTimeout(() => {
    setChangeImage(true);
  }, 1000);

  return <Image source={imageList[isChangeImage ? 1 : 0]} style={imageStyle}/>;
}
