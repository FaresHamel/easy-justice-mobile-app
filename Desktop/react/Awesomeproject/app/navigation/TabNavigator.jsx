import * as React from 'react';
import { Text, View,Image ,TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import mainActive from "../assets/icons/main_active.png";
import message from "../assets/icons/message.png";
import account from "../assets/icons/account.png"
import HomeScreen from '../screens/home/HomeScreen';
import ChatScreen from '../screens/chats/ChatScreen';
import Profile from '../screens/profile/Profile';
import imageMenu from "../assets/menu.png";
import profile from '../assets/profile2.png';


const ScreenHeaderBtn = ({dimension, iconUrl}) => {
  return (
    <TouchableOpacity
      style={{
        width: 40,
        height: 40,
        backgroundColor: '#F3F4F8',
        borderRadius: 12 / 1.25,
        justifyContent: 'center',
        alignItems: 'center',
        margin:10
      }}
      >
      <Image
        source={iconUrl}
        resizeMode="cover"
        style={{
          width: dimension,
          height: dimension,
          borderRadius: 12 / 1.25,
        }}
      />
    </TouchableOpacity>
  );
};


const Tab = createBottomTabNavigator();

const Home = ()=> {
  return (
  <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
        tabBarStyle: {backgroundColor: '#198E52'},
        tabBarInactiveTintColor: '#fff',
      }}
    initialRouteName={HomeScreen}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen}
        options={{
          title: "",
          headerShown:false,
          tabBarStyle: {
            backgroundColor: '#fff',
          },
          tabBarIcon: () => (<Image source={mainActive} style={{ width: 25, height: 25, tintColor: "#83829A" }} />),
          // headerLeft: () => (
            //   <ScreenHeaderBtn iconUrl={imageMenu} dimension="60%" />
            // ),
            // headerRight: () => (
            //   <ScreenHeaderBtn iconUrl={profile} dimension="100%" />
            // ),
        }} />
      <Tab.Screen name="Settings" component={ChatScreen}
        options={{
          title: "",
          headerShadowVisible: true ,
          tabBarStyle: {
            backgroundColor: '#fff',
          },
            tabBarIcon: () => (<Image source={message} style={{ width: 25, height: 25, tintColor: "#83829A" }} />),
            headerRight: () => (
              <View style={{margin:20,height:"50%"}} ><Text style={{color:"#000",fontWeight: "700",fontSize: 20}}>قائمة الرسائل</Text></View>
            ),
        }}
      />
       <Tab.Screen name="Profile" component={Profile}
        options={{
          title: "",
           gestureEnabled: false,
          headerShadowVisible: true,
          headerBakcVisible:true,
          tabBarStyle: {
            backgroundColor: '#fff',
          },
          tabBarIcon: () => (<Image source={account} style={{ width: 25, height: 25, tintColor: "#83829A" }} />),
          // headerRight: () => (
          //     <View style={{margin:20,height:"50%"}} ><Text style={{color:"#000",fontWeight: "700",fontSize: 20}}>الحساب الشخصي</Text></View>
          //   ),
        }}
      /> 
      </Tab.Navigator>
  );
}

export default Home;