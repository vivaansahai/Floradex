// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
// import { Feather } from '@expo/vector-icons';

// export default function TabBar({ state, descriptors, navigation } : BottomTabBarProps) {
//   const icon = {
//     home: (props:any) => <Feather name='home' size={25} {...props}/>,
//     search: (props:any) => <Feather name='search' size={25} {...props}/>,
//     scan: (props:any) => <Feather name='camera' size={25} {...props}/>,
//     library: (props:any) => <Feather name='heart' size={25} {...props}/>,
//     profile: (props:any) => <Feather name='user' size={25} {...props}/>
//   }
//   return (
//     <View style={{ flexDirection: 'row' }}>
//       {state.routes.map((route, index) => {
//         const { options } = descriptors[route.key];
//         const label =
//           options.tabBarLabel !== undefined
//             ? options.tabBarLabel
//             : options.title !== undefined
//             ? options.title
//             : route.name;

//         const isFocused = state.index === index;

//         const onPress = () => {
//           const event = navigation.emit({
//             type: 'tabPress',
//             target: route.key,
//             canPreventDefault: true,
//           });

//           if (!isFocused && !event.defaultPrevented) {
//             navigation.navigate(route.name, route.params);
//           }
//         };

//         const onLongPress = () => {
//           navigation.emit({
//             type: 'tabLongPress',
//             target: route.key,
//           });
//         };

//         return (
//           <TouchableOpacity
//           key={route.name}
//             accessibilityRole="button"
//             accessibilityState={isFocused ? { selected: true } : {}}
//             accessibilityLabel={options.tabBarAccessibilityLabel}
//             onPress={onPress}
//             onLongPress={onLongPress}
//             style={styles.tabbarItem}
//           >
//             {icon[route.name]({
//                 color: isFocused ? '#000000' : '#222' 
//             })}
//             <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
//               {label}
//             </Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//     tabbar: {
//       position: 'absolute',
//       bottom: 50,
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       backgroundColor: '#1c1c1c',
//       marginHorizontal: 80,
//       paddingVertical: 15,
//       borderRadius: 35,
//       shadowColor:'#000',
//       shadowRadius:10,
//       shadowOpacity: 0.1
      
//     },
//     tabbarItem: {
//         flex: 1,
//         justifyContent:'center',
//         alignItems:'center',
//         gap: 5
//     }
//   });