import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import { AnimatedWaveBottomTab } from './_layout';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
// import AnimatedWaveBottomTab from './_layout';

const Stack = createStackNavigator();

const InsideStack = createStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>
      <InsideStack.Screen name="Home" component={AnimatedWaveBottomTab} />
    </InsideStack.Navigator>
  );
}

export default function App() {
  const [user,setUser]=useState<User | null>(null);
  useEffect(()=>{
    onAuthStateChanged(FIREBASE_AUTH,(user)=>{
      console.log('user',user);
      setUser(user);
    });
    },[])
  return (
      <Stack.Navigator initialRouteName="Login">
        {user ? <Stack.Screen name="InsideLayout" component={InsideLayout} options={{headerShown:false}} /> :<Stack.Screen name="Login" component={Login} options={{headerShown:false}}  />}
      </Stack.Navigator>
  );
}
