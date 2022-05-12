import {StyleSheet, Text, View, Linking, Alert} from 'react-native';
import React from 'react';
import {CameraScreen, CameraType} from 'react-native-camera-kit';
import {useIsFocused} from '@react-navigation/native';

const Scan = props => {
  const IsFocused = useIsFocused();
  const onReadCode = data => {
    console.log(data.nativeEvent.codeStringValue);
    Alert.alert('QR Code', data.nativeEvent.codeStringValue, [
      {
        text: 'Open',
        onPress: () => console.log('Alert open'),
        style: 'default',
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Alert cancel'),
        style: 'cancel',
      },
    ]);
  };

  return IsFocused ? (
    <CameraScreen
      CameraType={CameraType.Back}
      scanBarcode={true}
      onReadCode={event => onReadCode(event)}
      showFrame={true}
      laserColor={'red'}
      frameColor={'white'}
    />
  ) : null;
};

export default Scan;

const styles = StyleSheet.create({});
