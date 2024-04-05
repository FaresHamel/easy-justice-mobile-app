import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/splash/SplashScreen';
import WelcomeScreen from '../screens/welcome/WelcomeScreen';
import SignInScreen from '../screens/signin/SignInScreen';
import SignUpScreen from '../screens/signup/SignUpScreen';
import HomeScreen from '../screens/home/HomeScreen';
// import imageMenu from "../assets/menu.png";
// import profile from '../assets/profile2.png';
// import { TouchableOpacity, Image } from "react-native";

import TabNavigator from './TabNavigator';
import DetailScreen from '../screens/details/DetailScreen';
import Messaging from '../screens/messaging/Messaging';
import Clerk from '../screens/pages/clerk/Clerk';
import Notary from '../screens/pages/Notary/Notary';
import Judiciel from '../screens/pages/judicial/Judiciel';
import Lawyers from '../screens/pages/lawyer/Lawyers';
import Search from '../screens/search/Search';
import Home from './TabNavigator';

// const ScreenHeaderBtn = ({dimension, iconUrl}) => {
//   return (
//     <TouchableOpacity
//       style={{
//         width: 40,
//         height: 40,
//         backgroundColor: '#F3F4F8',
//         borderRadius: 12 / 1.25,
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}
//       >
//       <Image
//         source={iconUrl}
//         resizeMode="cover"
//         style={{
//           width: dimension,
//           height: dimension,
//           borderRadius: 12 / 1.25,
//         }}
//       />
//     </TouchableOpacity>
//   );
// };

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="Splashscreen"
          component={SplashScreen}
          options={{title: 'fares', headerShown: false}}
        />
        <Stack.Screen
          name="Welcomescreen"
          component={WelcomeScreen}
          options={{
            title: '',
            headerBackVisible: false,
            headerShown: false,
          }}
        />
          <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SigninScreen"
          component={SignInScreen}
          options={{
            title: '',
            headerBackVisible: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignupScreen"
          component={SignUpScreen}
          options={{
            title: '',
            headerBackVisible: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: '',
             headerShown: false,
            // headerStyle: {
            //   backgroundColor: '#FDFDFD',
            // },
            // headerShadowVisible: false,
            // headerRight: () => (
            //   <ScreenHeaderBtn iconUrl={profile} dimension="100%" />
            // ),
          }}
        />
        <Stack.Screen
          name="Lawyers"
          component={Lawyers}
          options={{title: '', headerShown: false}}
        />
        <Stack.Screen
          name="Messaginscreen"
          component={Messaging}
          options={{title: '', headerShown: false}}
        />
        <Stack.Screen
          name="Detailscreen"
          component={DetailScreen}
          options={{title:"",headerShown:false}}
        />

           <Stack.Screen
          name="Clerk"
          component={Clerk}
          options={{title:"",headerShown:false}}
        />
           <Stack.Screen
          name="Notary"
          component={Notary}
          options={{title:"",headerShown:false}}
        />
           <Stack.Screen
          name="Judiciel"
          component={Judiciel}
          options={{title:"",headerShown:false}}
        />
         <Stack.Screen
          name="Search"
          component={Search}
          options={{title:"",headerShown:false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator