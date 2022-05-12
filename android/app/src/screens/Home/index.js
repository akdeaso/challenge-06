import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ActivityIndicator, PermissionsAndroid} from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const initialState = {
  latitude: null,
  longitude: null,
  latitudeDelta: 0.009,
  longitudeDelta: 0.009,
};

export async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Firebase App',
        message: 'Firebase App access to your location ',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
      //   alert('You can use the location');
    } else {
      console.log('location permission denied');
      alert('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

const Home = () => {
  const [currentPosition, setCurrentPosition] = useState(initialState);

  useEffect(() => {
    requestLocationPermission();
    Geolocation.getCurrentPosition(
      position => {
        // alert(JSON.stringify(position));
        const {longitude, latitude} = position.coords;
        setCurrentPosition({
          ...currentPosition,
          latitude: -7.5553805,
          longitude: 112.235501,
        });
      },
      error => alert(error.message),
      {timeout: 20000, maximumAge: 1000},
    );
  }, []);

  return currentPosition.latitude ? (
    <View style={styles.wrapper}>
      <MapView
        style={styles.map}
        initialRegion={currentPosition}
        showsUserLocation
      />
    </View>
  ) : (
    <ActivityIndicator style={{flex: 1}} animating size={'large'} />
  );
};

export default Home;

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
});
