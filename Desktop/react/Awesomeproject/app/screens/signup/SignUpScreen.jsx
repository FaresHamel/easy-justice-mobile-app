import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Image,
  StatusBar,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import google from '../../assets/google.png';
import styles from './signup.style';
import AwesomeAlert from 'react-native-awesome-alerts';

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required('يرجی ادخال الاسم'),
  lastname: Yup.string().required('يرجی ادخال اللقب'),
  phoneNumber: Yup.string()
    .required('يرجی ادخال رقم الهاتف')
    .min(10, 'يرجرى ادخال رقم هاتف صحيح .')
    .max(10, 'يرجرى ادخال رقم هاتف صحيح .'),
  email: Yup.string()
    .email('تنسيق البريد الإلكتروني غير صالح')
    .required(' يرجی ادخال البريد الإلكتروني'),
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
});

const SignUpScreen = ({navigation}) => {
  const API_URL = 'http://192.168.43.54:3000/signIn';
  const [showAlert, setShowAlert] = useState(false);
  const [textAlert, setAlertText] = useState('يرجى الانتضار قليلا');
  const [showProgress, setShowProgress] = useState(false);
  const [showCancelButton, setshowCancelButton] = useState(false);
  const [style, setStyle] = useState({width: 170, height: 120});
  const handleSubmition = values => {
    setAlertText('يرجى الانتضار قليلا');
    setshowCancelButton(false);
    setShowAlert(true);
    setShowProgress(true);
    if (values.email || values.password) {
      verification(values);
    } else {
      return;
    }
  };

  const verification = async val => {
    try {
      const res = await axios.post(
        'http://192.168.43.54:3000/verification',
        val,
      );
      const result = res.data.result;
      if (result === 1) {
        setShowProgress(false);
        setAlertText('البريد الالكتروني او رقم الهاتف مستعمل من قبل .');
        setshowCancelButton(true);
        setStyle({width: 220, height: 120});
      } else {
        signUp(val);
      }
    } catch (error) {
      // Alert.alert('Error sign in', 'please try again', [{text: 'OK'}]);
      setShowProgress(false);
      setAlertText('حدث خطأ. حاول مرة اخرى');
      setshowCancelButton(true);
      setStyle({width: 200, height: 120});
    }
  };

  const signUp = async val => {
    try {
      const res = await axios.post('http://192.168.43.54:3000/signup', val);
      if (res.data.id) {
        const store = storeData(res.data);
        if (store) {
          setAlertText('يرجى الانتضار\n قليلا');
          setShowAlert(false);
          setShowAlert(false);
          setshowCancelButton(false);
          setShowAlert(false);
          setShowProgress(false);
          navigation.navigate('Home');
        } else return;
      }
    } catch (error) {
      setShowProgress(false);
      setAlertText('حدث خطأ. حاول مرة اخرى');
      setshowCancelButton(true);
      setStyle({width: 200, height: 120});
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
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'baseline',
            }}>
            <Text style={styles.headerWelcomeText_2}> بك !</Text>
            <Text style={styles.headerWelcomeText}>أهلاً</Text>
          </View>
          <Text style={styles.headerDescriptionText}>
            انشاء حساب جديد للوصول إلى سجل الحزمة الخاصة بك والحصول على التحديث
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
                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: 50,
                    borderColor: '#C1C0C8',
                    paddingRight: 30,
                  }}>
                  <TextInput
                    nativID="lastname"
                    onChangeText={handleChange('lastname')}
                    onBlur={handleBlur('lastname')}
                    placeholder="أدخل الاسم "
                    style={{textAlign: 'right'}}
                    writingDirection="rtl"
                  />
                </View>
                {errors.firstname ? (
                  <Text style={{color: 'red'}}>{errors.firstname}</Text>
                ) : null}
                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: 50,
                    borderColor: '#C1C0C8',
                    paddingRight: 30,
                  }}>
                  <TextInput
                    nativID="firstname"
                    onChangeText={handleChange('firstname')}
                    onBlur={handleBlur('firstname')}
                    placeholder="أدخل اللقب "
                    style={{textAlign: 'right'}}
                  />
                </View>
                {errors.lastname ? (
                  <Text style={{color: 'red'}}>{errors.lastname}</Text>
                ) : null}

                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: 50,
                    borderColor: '#C1C0C8',
                    paddingRight: 30,
                  }}>
                  <TextInput
                    nativID="email"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    placeholder="أدخل البريد الالكتروني "
                    keyboardType="email-address"
                    style={{textAlign: 'right'}}
                  />
                </View>

                {errors.email ? (
                  <Text style={{color: 'red'}}>{errors.email}</Text>
                ) : null}

                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: 50,
                    borderColor: '#C1C0C8',
                    paddingRight: 30,
                  }}>
                  <TextInput
                    maxLength={10}
                    nativID="phoneNumber"
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={handleBlur('phoneNumber')}
                    placeholder="أدخل رقم الهاتف "
                    keyboardType="phone-pad"
                    style={{textAlign: 'right'}}
                  />
                </View>

                {errors.phoneNumber ? (
                  <Text style={{color: 'red'}}>{errors.phoneNumber}</Text>
                ) : null}

                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: 50,
                    borderColor: '#C1C0C8',
                    paddingRight: 30,
                  }}>
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
                  contentContainerStyle={{width: 170, height: 120}}
                />

                <TouchableOpacity
                  style={{
                    backgroundColor: '#198E52',
                    borderRadius: 50,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={handleSubmit}>
                  <Text
                    style={{color: '#FDFDFD', fontSize: 18, fontWeight: '500'}}>
                    انشاء حساب جديد
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
        <View style={styles.footer}>
          <View style={{width: '100%', alignItems: 'center'}}>
            <Text>----------------- أو -----------------</Text>
          </View>
          <TouchableOpacity style={styles.singupGoogle}>
            <Image source={google} style={styles.googleIcon} />
            <Text style={styles.googleText}>الاستمرار مع جوجل</Text>
          </TouchableOpacity>
          <View style={styles.anotherAcountText}>
            <Text>هل لديك حساب؟</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('SigninScreen')}>
              <Text
                style={{color: '#198E52', fontWeight: '600', marginLeft: 10}}>
                تسجيل الدخول
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SignUpScreen;
