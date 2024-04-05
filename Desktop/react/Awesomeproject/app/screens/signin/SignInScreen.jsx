import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  StatusBar,
} from 'react-native';
import google from '../../assets/google.png';
import styles from './signin.style';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dimensions} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required('يرجی ادخال كلمة السر')
    .min(8, 'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل')
    .matches(/[a-z]/, 'يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل')
    .matches(/[A-Z]/, 'يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل')
    .matches(/[0-9]/, 'يجب ان تحتوي كلمة المرور على الاقل رقما واحدا')
    .matches(
      /[^a-zA-Z0-9]/,
      'يجب أن تحتوي كلمة المرور على حرف خاص واحد على الأقل',
    ),
  email: Yup.string()
    .email('تنسيق البريد الإلكتروني غير صالح')
    .required(' يرجی ادخال البريد الإلكتروني'),
});

const SignInScreen = ({navigation}) => {
  // const [windowDimensions, setWindowDimensions] = useState(Dimensions.get('window'));
  // console.log(windowDimensions);

  const API_URL = 'http://192.168.43.54:3000/signIn';
  const [showAlert, setShowAlert] = useState(false);
  const [textAlert, setAlertText] = useState('يرجى الانتضار قليلا');
  const [showProgress, setShowProgress] = useState(false);
  const [showCancelButton, setshowCancelButton] = useState(false);
  const [err, setErr] = useState(false);
  const [style, setStyle] = useState({ width: 170, height: 120 });

  
  const handleSubmition = values => {
    setErr(false);
    setAlertText('يرجى الانتضار قليلا');
    setshowCancelButton(false);
    setShowAlert(true);
    setShowProgress(true);
    if (values.email || values.password) {
      signIn(values);
    } else {
      return;
    }
  };

  const signIn = async val => {
    try {
      const response = await axios.post(API_URL, val);
      if (response.data.id) {
        const store = storeData(response.data);
        if (store) {
          setAlertText('يرجى الانتضار قليلا');
          setshowCancelButton(false);
          setShowAlert(false);
          setShowProgress(false);
          navigation.navigate('Home');
        }
      } else {
        setErr(true);
        setShowProgress(false);
        setAlertText('حدث خطأ. حاول مرة اخرى');
        setshowCancelButton(true);
        setStyle({width: 200, height: 120})
      }
    } catch (error) {
      setShowProgress(false);
      setAlertText('حدث خطأ. حاول مرة اخرى');
      setStyle({width: 200, height: 120})
      setshowCancelButton(true);
    }
  };

  const storeData = async values => {
    try {
      const jsonValue = JSON.stringify(values);
      await AsyncStorage.setItem('userInfo', jsonValue);
      return true;
    } catch (e) {
      // console.log(e);
      return false;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="transparent"
        barStyle="dark-content" // Adjust for light content if needed
        translucent={true}
      />
      <ScrollView contentContainerStyle={styles.containerView}>
        <View style={styles.headerContainer}>
          <Text style={styles.welcomeText}>مرحبا</Text>
          <Text style={styles.backText}>! بعودتك</Text>
          <Text style={styles.explainText}>
            قم بتسجيل الدخول للوصول إلى سجل الحزمة الخاصة بك والحصول على التحديث
            في الوقت الفعلي .
          </Text>
        </View>
        <View style={styles.formContainer}>
          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={validationSchema}
            onSubmit={values => {
              handleSubmition(values);
            }}>
            {({handleChange, handleBlur, handleSubmit, values, errors}) => (
              <>
                <View style={styles.inputContainer}>
                  <TextInput
                    name="email"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    style={{textAlign: 'right'}}
                    placeholder="ادخل البريد الالكتروني "
                    value={values.email}
                  />
                </View>
                {errors.email ? (
                  <Text style={{color: 'red'}}>{errors.email}</Text>
                ) : null}
                <View style={styles.inputContainer}>
                  <TextInput
                    nativID="password"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    placeholder="ادخل كلمة المرور"
                    secureTextEntry={true}
                    value={values.password}
                    style={{textAlign: 'right'}}
                  />
                </View>
                {errors.password ? (
                  <Text style={{color: 'red'}}>{errors.password}</Text>
                ) : null}
                <View>
                  <Text style={styles.forgotText}></Text>
                </View>
                {err ? (
                  <View>
                    <Text style={styles.forgotText}>
                      من فضلك تحقق من ان المعلومات صحيحة . كلمة السر او البريد
                      الالكتروني خاطئ .
                    </Text>
                  </View>
                ) : null}

                <AwesomeAlert
                  show={showAlert}
                  showProgress={showProgress}
                  useNativeDriver={true}
                  title=""
                  message={textAlert}
                  closeOnTouchOutside={true}
                  closeOnHardwareBackPress={false}
                  showCancelButton={showCancelButton}
                  // showConfirmButton={true}
                  cancelText="حسنا"
                  // confirmText="Yes, delete it"
                  // confirmButtonColor="#DD6B55"
                  cancelButtonColor="#198E52"
                  onCancelPressed={() => {
                    setShowAlert(false);
                    setShowProgress(false);
                  }}
                  // onConfirmPressed={() => {
                  //   this.hideAlert();
                  // }}
                  progressColor="#198E52"
                  progresSize="30"
                  animatedValue={3}
                  closeOnTouchOutside={true}
                  closeOnHardwareBackPress={true}
                  contentContainerStyle={style}
                />

                <TouchableOpacity
                  style={styles.btnLoginContainer}
                  onPress={handleSubmit}>
                  <Text style={styles.loginText}>تسجيل دخول</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>

        <View style={styles.footerContainer}>
          <View style={styles.orText}>
            <Text>----------------- أو -----------------</Text>
          </View>
          <TouchableOpacity style={styles.btnGoogle}>
            <Image source={google} style={styles.googleLogo} />
            <Text style={styles.googleText}>الاستمرار مع جوجل</Text>
          </TouchableOpacity>
          <View style={styles.createAccount}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignupScreen')}>
              <Text style={styles.createAcountText}>انشاء حساب جديد</Text>
            </TouchableOpacity>
            <Text style={{marginLeft: 7}}> لا تملك حساب ؟</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInScreen;
