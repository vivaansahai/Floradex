// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
// import {
//   CameraView,
//   useCameraPermissions,
//   CameraCapturedPicture,
//   BarcodeScanningResult,
// } from 'expo-camera';
// import Slider from '@react-native-community/slider';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function CameraTab() {
//     const [facing, setFacing] = useState<'back' | 'front'>('back');
//     const [zoom, setZoom] = useState(0);
//     const [capturedPhotos, setCapturedPhotos] = useState<Array<{ uri: string }>>([]);
//     const [permission, requestPermission] = useCameraPermissions();
//     const [isBarcodeMode, setIsBarcodeMode] = useState(false);
//     const [barcodeResult, setBarcodeResult] = useState<string | null>(null);
//     const cameraRef = useRef<CameraView | null>(null);
  
//     useEffect(() => {
//       loadSavedPhotos();
//     }, []);

//     const loadSavedPhotos = useCallback(async () => {
//         try {
//         const savedPhotos = await AsyncStorage.getItem("capturedPhotos"); 
//         if (savedPhotos) {
//         setCapturedPhotos(JSON.parse(savedPhotos));
//         } 
//     }
//     catch (error) {
//         console.error("Failed to load photos", error);
//         }}, []);

//         const savePhoto = useCallback(
//             async (newPhoto: { uri: string }) => {
//             try {
//                 const updatedPhotos = [newPhoto, ...capturedPhotos];
//             await AsyncStorage.setItem(
//             "capturedPhotos",
//             JSON.stringify(updatedPhotos)
//             );
//             setCapturedPhotos(updatedPhotos) ;
//             } 
//             catch (error) {
//             console.error("Failed to save photo”, error");
//             }
//             }, [capturedPhotos]);

//         const toggleCameraFacing =useCallback(() => {
//             setFacing((current) => (current === "back" ? "front" : "back"));
//         },[]);

//         const handleZoomChange = useCallback((value: number) => {
//             setZoom(value); },[]);

//         const takePicture = useCallback(async () => {
//             if(cameraRef.current)
//             {
//                 const photo= await cameraRef.current.takePictureAsync({quality:1,base64:false,exif:false,});
//                 await savePhoto({uri:photo.uri});
//             }
//         },[savePhoto]);
//         return <CameraView
//         ref={cameraRef}
        