import React, { useState, useEffect } from 'react';
import { Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import user_chat from '../../assets/icons/user_chat.png';

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState({});

  const handleSearchButton = () => {
    removeValue();
    navigation.navigate('Welcomescreen');
  };

  useEffect(() => {
    getData();
  }, [userData]);

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('userInfo');
    } catch (e) {
      // remove error
    }
    // console.log('Done.');
  };

  const getData = async () => {
    try {
      const dannn = await AsyncStorage.getItem('userInfo');
      const userInfo = await JSON.parse(dannn);
      // console.log(userInfo);
      setUserData(userInfo);
    } catch (e) {
      // console.log(e);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
      <View>
        <View
          style={{
            width: '100%',
            backgroundColor: 'white',
            alignItems: 'center',
          }}>
          <Image
            source={user_chat}
            style={{
              width: 100,
              height: 100,
              tintColor: 'white',
              backgroundColor: '#E8E8E8',
              borderRadius: 50,
              alignContent: 'center',
            }}
          />
          <Text style={{ marginTop: 20 }}>الحساب الشخصي</Text>
        </View>

        {userData ? <View
          style={{
            backgroundColor: 'white',
            height: 200,
            justifyContent: 'space-around',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'baseline',
              justifyContent: 'flex-end',
            }}>
            <Text style={{ fontSize: 16, color: '#83829A', fontWeight: '500' }}>
              {userData.name}
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: '#000',
                fontWeight: '700',
                marginLeft: 10,
              }}>
              الاسم :
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'baseline',
              justifyContent: 'flex-end',
            }}>
            <Text style={{ fontSize: 16, color: '#83829A', fontWeight: '500' }}>
              {userData.lastname}
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: '#000',
                fontWeight: '700',
                marginLeft: 10,
              }}>
              اللقب :
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'baseline',
              justifyContent: 'flex-end',
            }}>
            <Text style={{ fontSize: 16, color: '#83829A', fontWeight: '500' }}>
              {userData.email}
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: '#000',
                fontWeight: '700',
                marginLeft: 10,
              }}>
              البريد الالكتروني :
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'baseline',
              justifyContent: 'flex-end',
            }}>
            <Text style={{ fontSize: 16, color: '#83829A', fontWeight: '500' }}>
              {userData.phone}
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: '#000',
                fontWeight: '700',
                marginLeft: 10,
              }}>
              رقم الهاتف :
            </Text>
          </View>
        </View>
          : (
            <Text></Text>
          )}
      </View>
      
         <TouchableOpacity
          style={{
            backgroundColor: 'red',
            width: 100,
            height: 40,
            borderRadius: 9,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute', // This makes the element absolute
            bottom: 50,
            right: 20,
            backgroundColor: '#198E52',
            padding: 10,
          }}
          onPress={handleSearchButton}
        >
          <Text style={{ color: '#fff' }}>تسجيل الخروج</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;
