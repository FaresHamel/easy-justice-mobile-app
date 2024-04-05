import React, {useEffect, useState, useLayoutEffect} from 'react';
import {View, Text} from 'react-native';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import logo from '../../assets/icons/logo.jpeg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('userInfo');
        const jsonInfo = await JSON.parse(token);
        if (jsonInfo === null) {
          navigation.navigate('Welcomescreen');
        } else {
          navigation.navigate('TabNavigator');
        }
      } catch (error) {
        console.error('Error fetching user token:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#fff"
        barStyle="dark-content"
      />
      <View style={styles.viewContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      {isLoading ? (
        <View
          style={{
            height: 200,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator
            size="large"
            color="#198E52"
            // style={{
            //   position: 'absolute',
            //   bottom: 50,
            //   left: 190,
            // }}
          />
        </View>
      ) : (
        <View
          style={{
            height: 200,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator
            size="large"
            color="#198E52"
            // style={{
            //   position: 'absolute',
            //   bottom: 50,
            //   left: 190,
            // }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 300,
    backgroundColor: 'white',
  },
});

export default SplashScreen;
