import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {ms} from 'react-native-size-matters';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const Login = ({navigation}) => {
  GoogleSignin.configure({
    webClientId:
      '428507265986-3cj2kqrhn80ja7msjkp2pti63p72o2f9.apps.googleusercontent.com',
  });

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      } else {
      }
    }
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
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password Here"
          placeholderTextColor="gray"
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('BottomTab')}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <View style={{alignItems: 'flex-end'}}>
          <TouchableOpacity style={styles.register}>
            <Text style={styles.registerText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.separator}>----- Or Sign In with -----</Text>
      <GoogleSigninButton
        style={styles.buttonGoogle}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={_signIn}
      />
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
