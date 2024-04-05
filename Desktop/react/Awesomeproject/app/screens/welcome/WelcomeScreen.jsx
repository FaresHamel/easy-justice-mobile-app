import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageBackground,
  StatusBar,
} from 'react-native';
import IntroImage from '../../assets/images/introImage.jpg';
import styles from './welcome.style';

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true} // Optional for smoother transition
        backgroundColor="transparent"
        barStyle="light-content" // Adjust for light content if needed
        translucent={true}
      />
      <ScrollView
        contentContainerStyle={{
          flex: 1,
        }}>
        <ImageBackground source={IntroImage} style={styles.imageBackground}>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.btnSignIn}
              onPress={() => navigation.navigate('SigninScreen')}>
              <Text style={styles.textSignIn}>تسجيل دخول</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnSignUp}
              onPress={() => navigation.navigate('SignupScreen')}>
              <Text style={styles.textSignUp}>انشاء حساب جديد</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
