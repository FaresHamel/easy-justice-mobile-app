import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StatusBar,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import localisation from '../../../assets/localisation.png';
import phone from '../../../assets/phone.png';
import law from '../../../assets/lawyerImage/lawyer2.jpg';
import goback from '../../../assets/goback.png';
import noInternet from '../../../assets/icons/noInternetConnection.png';

const Judiciel = ({navigation}) => {
  const [judiciel, setJudiciel] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const fetchData = () => {
    setLoader(true);
    fetch('http://192.168.43.54:3000/judiciel')
      .then(response => response.json())
      .then(responseJson => {
        setJudiciel(responseJson);
        setLoader(false)
        setError(false) 
      })
      .catch(error => {
        setLoader(false);
        setError(true)
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar
        animated={true}
        backgroundColor="#fff"
        barStyle="dark-content"
      />
      <View
        style={{
          backgroundColor: 'white',
          paddingTop: 20,
          height: 90,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 20,
          paddingRight: 20,
          shadowOffset: {height: 9},
          shadowOpacity: 0.2,
          elevation: 4,
          shadowColor: '#171717',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: '#F3F4F8',
            borderRadius: 20,
            width: 24,
            height: 24,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={goback}
            style={{
              width: 15,
              height: 15,
              resizeMode: 'contain',
              tintColor: '#198E52',
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            marginLeft: 50,
            alignItems: 'flex-end',
            width: '80%',
            backgroundColor: 'white',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 20, fontWeight: '600', color: '#198E52'}}>
            قائمة المحضرين القضائيين
          </Text>
        </View>
      </View>
      <ScrollView
        style={{backgroundColor: 'white'}}
        contentContainerStyle={{ padding: 20 }}>
        
        {loader ? (
          <ActivityIndicator
           size="large"
            color="#198E52"
            style={{marginTop: 50}}
          />
        ): error ? (
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
        ) : judiciel.length === 0 ? (
          <Text>لا يوجد محضرين قضائيين بعد سوف نعرض جميع البيانات هنا فورى توفرها في التطبيق</Text>
            ) :(
                judiciel.map(item => (
            <View
              key={Math.random().toString()}
              style={{
                marginTop: 10,
                width: '100%',
                height: 150,
                backgroundColor: 'white',
                borderRadius: 10,
                flexDirection: 'row',
                shadowOffset: {width: -2, height: 4},
                shadowOpacity: 0.2,
                shadowRadius: 3,
                elevation: 4,
                shadowColor: '#171717',
                padding: 5,
              }}>
              <View
                style={{
                  width: '60%',
                  backgroundColor: 'white',
                  justifyContent: 'space-around',
                  paddingRight: 20,
                  paddingTop: 15,
                  paddingBottom: 15,
                  alignItems: 'flex-end',
                }}>
                <Text style={{fontSize: 12, fontWeight: '400'}}>
                  محضر قضائي معتمد من طرف الدولة
                </Text>
                <Text style={{fontSize: 16, fontWeight: '600', color: '#000'}}>
                  {item.name + ' ' + item.lastname}
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                  <Text style={{fontSize: 12, fontWeight: '600'}}>
                    {item.location}
                  </Text>
                  <Image
                    source={localisation}
                    style={{
                      width: 10,
                      height: 10,
                      tintColor: '#198E52',
                      marginLeft: 10,
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#198E52',
                      height: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingRight: 10,
                      paddingLeft: 10,
                      borderRadius: 10,
                    }}
                    onPress={() =>
                      navigation.navigate('Messaginscreen', {
                        id: item.id,
                        name: item.name,
                        lastname: item.lastname,
                      })
                    }>
                    <Text
                      style={{color: 'white', fontWeight: '600', fontSize: 14}}>
                      اتصال
                    </Text>
                  </TouchableOpacity>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: 12, fontWeight: '400'}}>
                      {item.phone}
                    </Text>
                    <Image
                      source={phone}
                      style={{
                        width: 20,
                        height: 20,
                        marginLeft: 5,
                      }}
                    />
                  </View>
                </View>
              </View>
              <View style={{width: '40%'}}>
                <Image
                  source={law}
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                    borderRadius: 10,
                  }}
                />
              </View>
            </View>
                )
                
              ) 
        ) 
        }
      </ScrollView>
    </SafeAreaView>
  );
};

export default Judiciel;
