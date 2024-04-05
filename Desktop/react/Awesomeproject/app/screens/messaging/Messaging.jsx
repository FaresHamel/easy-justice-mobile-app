import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Button
} from 'react-native';
import axios from 'axios';
import send from '../../assets/send.png';
import goback from '../../assets/goback.png';
import {format} from 'date-fns'; // Install date-fns with: npm install date-fns
import {io} from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Messaging = ({route, navigation}) => {
  
  const socket = io('http://192.168.43.54:3100');
  const SENT_MESSAGE_URL = 'http://192.168.43.54:3000/send';
  const [inputText, setInputText] = useState('');
  const {id, lastname, name} = route.params;
  const [userData, setUserData] = useState({});
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    const fetchMessages = async () => {
      // if (userData.id && id) {
       const response = await axios.get(`http://192.168.43.54:3000/messages?senderId=${10}&recievedId=${70}`);
        setMessages(response.data);
      // }
    };
    fetchMessages();
  }, [messages]);
  
   useEffect(() => {
    const getLocalData = async () => {
      try {
        const token = await AsyncStorage.getItem('userInfo'); // Adjust key name if needed
        const jsonInfo = await JSON.parse(token);
        setUserData(jsonInfo);
      } catch (error) {
      }
    };
     getLocalData();
   });
  
  // socket.on('connect', () => {
  //   socket.emit("get_user_message", 70, 10);
  // }
  // );

  //  socket.on('users_messages', msg => {
  //         console.log(msg)
  //          setMessages(msg);
  //       });

  // const eventSendTo = () => {
  //   let currentDate = new Date(); // Get the current date and time
  //   let formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');
  //   const data = {
  //     senderId: '2',
  //     receiverId: '3',
  //     content: inputText,
  //     sent_at: formattedDate,
  //   };

  //   socket.emit('chat message', data);
  //   setInputText('');
  // };

  const handleButtonPress = async () => {
    // if (!isButtonDisabled) {
    //   const response = await axios.post(API_URL, data);
    //   console.log(response);
    //   setInputText(''); // Clear input after action (optional)
    // }
  
    if (inputText) {
      setMessages(...messages, inputText);
      let currentDate = new Date(); // Get the current date and time
      let formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');
      const data = {
        senderId: userData.id,
        receiverId: id,
        content: inputText,
        sent_at: formattedDate,
      };
      try {
        await axios.post(SENT_MESSAGE_URL, data);
        // fetchMessages();
      } catch (err) {
        console.log(err);
      }
      setInputText('');
    } else return;
   
      
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar
        animated={true}
        backgroundColor="#198E52"
        barStyle="light-content"
      />
      <View
        style={{
          backgroundColor: '#198E52',
          height: 80,
          flexDirection: 'row',
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 10,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{height: '80%', justifyContent: 'flex-end'}}>
          <Image
            source={goback}
            style={{width: 15, height: 15, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
        <View
          style={{
            marginLeft: 50,
            width: '80%',
            height: '100%',
            justifyContent: 'flex-end',
          }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '400',
              color: '#fff',
            }}>
            محامي متمرس متخصص في القانون التجاري
          </Text>
          <Text style={{fontSize: 16, fontWeight: '600', color: '#fff'}}>
            {name + ' ' + lastname}
          </Text>
        </View>
      </View>
      <ScrollView
        style={{backgroundColor: 'white'}}
        contentContainerStyle={{padding: 20}}>
        {messages  && messages.length > 0 &&
          messages.map((item, index) => (
            <View style={{backgroundColor: 'white'}} key={String(index)}>
              {item.sender_id === userData.id ? (
                <View style={{alignItems: 'flex-end'}}>
                  <Text
                    style={{
                      backgroundColor: '#198E52',
                      marginBottom: 5,
                      marginTop: 5,
                      padding: 10,
                      borderRadius: 10,
                      color: '#fff',
                    }}>
                    {item.content}
                  </Text>
                </View>
              ) : (
                <View style={{alignItems: 'flex-start'}}>
                  <Text
                    style={{
                      color: '#000',
                      backgroundColor: '#EEEEEE',
                      marginBottom: 5,
                      marginTop: 5,
                      padding: 10,
                      borderRadius: 10,
                    }}>
                    {item.content}
                  </Text>
                </View>
              )}
            </View>
          ))}
      </ScrollView>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 65,
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 15,
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#EEEEEE',
            marginRight: 12,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 16,
            height: '100%',
            width: '80%',
          }}>
          <TextInput
            value={inputText}
            onChangeText={text => setInputText(text)}
            style={{
              width: '100%',
              height: '100%',
              paddingHorizontal: 16,
              textAlign: 'right',
            }}
            placeholder="كتابة رسالة"
          />
        </View>
        <TouchableOpacity
          onPress={handleButtonPress}
          // disabled={isButtonDisabled}
          style={{
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={send}
            resizeMode="contain"
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Messaging;
