import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';
import {ms} from 'react-native-size-matters';

const onSignIn = async user => {
  console.log(user);
  crashlytics().log('user signed in');
  await Promise.all([
    crashlytics().setUserId(user.uid),
    crashlytics().setAttribute('credits', String(user.credits)),
    crashlytics().setAttributes({
      role: 'admin',
      followers: '13',
      email: user.email,
      username: user.username,
    }),
  ]);
};

const onSetupCloudMessaging = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('auth status:', authStatus);
  }
};

const onLogScreenView = async () => {
  try {
    await analytics().logScreenView({
      screen_name: 'Home',
      screen_class: 'Home',
    });
  } catch (error) {
    console.log(error);
  }
};

const getToken = async () => {
  const token = await messaging().getToken();
  console.log(JSON.stringify(token));
};

const Crash = () => {
  useEffect(() => {
    getToken();
    onSetupCloudMessaging();
    onLogScreenView();
    crashlytics().log('App mounted');
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          await analytics().logEvent('register_account', {
            name: 'jojo',
          });
        }}>
        <Text style={styles.buttonText}>Tes Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          onSignIn({
            uid: 'Aa0Bb1Cc2Dd3Ee4Ff5Gg6Hh7Ii8Jj9',
            username: 'Joa Joe',
            email: 'jojo@example.com',
            credits: 49,
          });
        }}>
        <Text style={styles.buttonText}>Tes Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          crashlytics().log('button clicked');
          crashlytics().crash();
        }}>
        <Text style={styles.buttonText}>Tes Crash</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Crash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'flex-end',
  },
  button: {
    marginHorizontal: ms(10),
    marginBottom: ms(20),
    alignItems: 'center',
    backgroundColor: '#E31212',
    paddingVertical: ms(10),
    borderRadius: ms(10),
    shadowColor: 'red',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: ms(14),
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
    alignContent: 'center',
  },
});
