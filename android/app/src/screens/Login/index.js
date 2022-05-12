import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {ms} from 'react-native-size-matters';

const Login = ({navigation}) => {
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
});
