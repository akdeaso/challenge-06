import {StyleSheet, Text, View, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {ms} from 'react-native-size-matters';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import TouchID from 'react-native-touch-id';
import auth from '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogScreenView = async () => {
    try {
      await analytics().logScreenView({
        screen_name: 'Login Screen',
        screen_class: 'Login Screen',
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onLogScreenView();
    crashlytics().log('App mounted.');
  }, []);

  const onEvent = async () => {
    await analytics().logLogin({
      method: 'Email',
    });
  };

  const signInForm = () => {
    onEvent();
    if (email.length !== 0 && password.length !== 0) {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          crashlytics().log('User Signed In');
          console.log('USER UID: ', res.user.uid);
          navigation.navigate('BottomTab');
        })
        .catch(error => {
          crashlytics().log('User Sign In Error');
          crashlytics().recordError(error);
          Alert.alert('Error', error.message);
        });
    } else {
      Alert.alert('Error', 'Invalid Credentials');
    }
  };

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      navigation.navigate('BottomTab');
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      } else {
      }
    }
  };

  const pressHandler = () => {
    TouchID.authenticate('Tes biometric sign in')
      .then(() => {
        navigation.navigate('BottomTab');
      })
      .catch(error => {
        alert('Auth Failed');
      });
  };

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', marginTop: ms(16)}}>
        {/* <Image source={Logo} /> */}
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Hello Again</Text>
        <Text style={styles.titleDesc}>Welcome Back!</Text>
      </View>
      <View>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Email"
          placeholderTextColor="gray"
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password Here"
          placeholderTextColor="gray"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            signInForm();
          }}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <View style={{alignItems: 'flex-end'}}>
          <TouchableOpacity style={styles.register}>
            <Text style={styles.registerText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.separator}>----- Or -----</Text>
      <GoogleSigninButton
        style={styles.buttonGoogle}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => {
          _signIn();
        }}
      />
      <TouchableOpacity style={styles.button} onPress={() => pressHandler()}>
        <Text style={styles.buttonText}>Biometric Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191932',
    padding: ms(16),
  },
  titleContainer: {
    marginTop: ms(24),
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    marginBottom: ms(8),
    fontSize: ms(20),
    color: 'white',
    fontWeight: '700',
  },
  titleDesc: {
    marginBottom: ms(32),
    fontSize: ms(16),
    color: 'white',
    fontWeight: '400',
  },
  inputContainer: {
    justifyContent: 'center',
  },
  textInput: {
    marginBottom: ms(24),
    backgroundColor: '#ECECEC',
    color: 'black',
    fontSize: ms(14),
    paddingStart: ms(16),
    borderRadius: ms(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 5.46,
    elevation: 4,
  },
  button: {
    marginBottom: ms(10),
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
  buttonGoogle: {
    alignSelf: 'center',
    width: '100%',
    marginBottom: ms(10),
  },
  buttonText: {
    fontSize: ms(14),
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
    alignContent: 'center',
  },
  register: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  registerText: {
    color: '#779ECB',
    fontSize: ms(12),
    fontWeight: '700',
  },
  separator: {
    alignSelf: 'center',
    marginVertical: ms(5),
  },
});
