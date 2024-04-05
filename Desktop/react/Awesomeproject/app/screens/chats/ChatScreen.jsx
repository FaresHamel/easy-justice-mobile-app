import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import user_chat from '../../assets/icons/user_chat.png';
import {io} from 'socket.io-client';
import {BackHandler} from 'react-native';

const ChatScreen = () => {
 
  // const socket = io('http://192.168.43.54:3100');
  // const [chats, setChats] = useState(['message']);
 

  // useEffect(() => {
  //   // BackHandler.addEventListener('hardwareBackPress', () => true);
  // }, []);

  const lawyers = [
    {
      name: 'قائمة الموثقين',
      lastname: 'hamel',
      lastmessage: 'wech ga3ed dir khoya fares',
    },
    {
      name: 'قائمة الموثقين',
      lastname: 'hamel',
      lastmessage: 'wech ga3ed dir khoya fares',
    },
    {
      name: 'قائمة الموثقين',
      lastname: 'hamel',
      lastmessage: 'wech ga3ed dir khoya fares',
    },
    {
      name: 'قائمة الموثقين',
      lastname: 'hamel',
      lastmessage: 'wech ga3ed dir khoya fares',
    },
  ];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FDFDFD', padding: 10}}>
      <ScrollView>
     {lawyers.length > 0 &&
          lawyers.map((item, index) => (
            <View
              key={String(index)}
              style={{
                height: 100,
                backgroundColor: '#fff',
                flexDirection: "row",
                alignItems:"center"
              }}>
              <View style={{paddingRight: 15,width:"80%"}} >
                <Text style={{color: "#000",textAlign: "right",fontSize: 17,fontWeight: "700"}} >{item.name}</Text>
                <Text style={{textAlign: "right"}} >قائمة الكتاب العامينقائمة الكتاب العامينقائمة الكتاب العامينقائمة الكتاب العامين</Text>
              </View>
                <View
                style={{
                  backgroundColor: '#F3F4F8',
                  borderRadius: 20,
                  width: 50,
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center"
                  
                }}>
                <Image source={user_chat} style={{tintColor:"#fff",width:40,height:40}}/>
              </View>
            </View>
          ))} 
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatScreen;
{
  /* */
}
