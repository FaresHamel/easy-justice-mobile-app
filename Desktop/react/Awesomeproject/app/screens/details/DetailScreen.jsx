import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Image,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Linking,
} from 'react-native';
import testImage from '../../assets/lawyerImage/lawyer2.jpg';
import goBakc from '../../assets/goback.png';
import noInternet from '../../assets/icons/noInternetConnection.png';
import axios from 'axios';

const DetailScreen = ({route, navigation}) => {
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor('transparent');
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get('http://192.168.43.54:3000/getLowData', {
        params: {title: route.params.law},
      });

      if (res) {
        setLoader(false);
        setData(res.data);
      }
    } catch (err) {
      setLoader(false);
      setError(true);
      // console.log(err);
    }
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: '#FDFDFD', paddingBottom: 10}}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" />
      <ScrollView>
        <ImageBackground
          source={testImage}
          style={{
            width: '100%',
            height: 350,
            paddingTop: 50,
            shadowOffset: {width: -2, height: 4},
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 4,
            shadowColor: '#171717',
          }}
          resizeMode="cover">
          <TouchableOpacity
            style={{
              width: 30,
              marginLeft: 20,
              height: 30,
              backgroundColor: '#F3F4F8',
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigation.goBack()}>
            <Image
              source={goBakc}
              style={{
                width: 15,
                height: 15,
                tintColor: '#198E52',
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        </ImageBackground>
        {loader ? (
          <ActivityIndicator
            size="large"
            color="#198E52"
            style={{marginTop: 50}}
          />
        ) : error ? (
          <View  style={{width:"100%",height:200,alignItems:"center",justifyContent:"center"}} >
            <Image
              source={noInternet}
              style={{
                width: 100,
                height: 100,
                tintColor: '#198E52',
                resizeMode: 'contain',
              }}
            />
            <Text style={{fontSize:14,fontWeight:"700"}} >الرجاء اعادة المحاولة مرة اخرى</Text>
          </View>
        ) : data.length === 0 ? (
          <Text>لا توجد معلومات متاحة</Text>
        ) : (
          <>
            <View style={{width: '100%', marginTop: 20, paddingRight: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'baseline',
                  justifyContent: 'flex-end',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    textAlign: 'right',
                    color: '#198E52',
                    marginRight: 10,
                  }}>
                  {data.title}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    textAlign: 'right',
                    color: '#000',
                    marginBottom: 10,
                  }}>
                  قانون :
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'baseline',
                  justifyContent: 'flex-end',
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '700',
                    textAlign: 'right',
                    color: '#198E52',
                    marginRight: 10,
                  }}>
                  {data.lawNumber}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    textAlign: 'right',
                    color: '#000',
                    marginBottom: 10,
                  }}>
                  قانون رقم :
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'baseline',
                  justifyContent: 'flex-end',
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '700',
                    textAlign: 'right',
                    color: '#198E52',
                    marginRight: 10,
                  }}>
                  {data.hijraDate}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    textAlign: 'right',
                    color: '#000',
                    marginBottom: 10,
                  }}>
                  مؤرخ في :
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'baseline',
                  justifyContent: 'flex-end',
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '700',
                    textAlign: 'right',
                    color: '#198E52',
                    marginRight: 10,
                  }}>
                  {data.miladyDate}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    textAlign: 'right',
                    color: '#000',
                    marginBottom: 10,
                  }}>
                  الموافق لـ :
                </Text>
              </View>
            </View>
            <View style={{padding: 20}}>
              <Text numberOfLines={25}>{data.description}</Text>
            </View>
          </>
        )}
      </ScrollView>
      {data.title ? (
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
        onPress={() => Linking.openURL(data.link)}>
        <Text style={{color: '#fff'}}>قراءة المزيد</Text>
      </TouchableOpacity>
      ) : (
          <Text></Text>
      )}
    </SafeAreaView>
  );
};

export default DetailScreen;
