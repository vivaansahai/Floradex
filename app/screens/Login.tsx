import { FIREBASE_AUTH, FIRESTORE_DB } from '@/FirebaseConfig';
import { collection, getDocs } from '@firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    ImageBackground,
} from 'react-native';

const Login = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error) {
            console.error('Failed to sign in', error);
        } finally {
            setLoading(false);
        }
    };

    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error) {
            console.error('Failed to sign up', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageBackground
            source={require('../../assets/images/linbg.png')} // Replace with your actual path
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Welcome to Floradex!</Text>
                <View style={styles.content}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="gray"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="gray"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    {loading ? (
                        <ActivityIndicator size="large" color="blue" />
                    ) : (
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={[styles.button, styles.shadow]} onPress={signUp}>
                                <Text style={styles.buttonText}>Sign Up</Text>
                            </TouchableOpacity>
                            <View style={styles.buttonSpacing} />
                            <TouchableOpacity style={[styles.button, styles.shadow]} onPress={signIn}>
                                <Text style={styles.buttonText}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        position: 'absolute',
        top: 40,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
    content: {
        marginTop: 280, // Shift inputs and buttons downwards
        width: '100%',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        height: 40,
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 12,
        paddingHorizontal: 8,
        color: 'black',
        elevation: 2, // Adds shadow on Android
    },
    buttonContainer: {
        width: '100%',
    },
    button: {
        backgroundColor: 'green',
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonSpacing: {
        marginVertical: 8,
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5, // Adds shadow on Android
    },
});

export default Login;
