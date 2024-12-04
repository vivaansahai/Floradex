import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FIRESTORE_DB } from '@/FirebaseConfig'; // Replace with your actual Firebase config import
import { getAuth } from 'firebase/auth'; // Import Firebase Authentication
import {
    collection,
    getDocs,
    deleteDoc,
    doc,
} from 'firebase/firestore';

const DataFetch = () => {
    const [data, setData] = useState<any[]>([]); // Set data type to an array of objects that hold species and document ID
    const [loading, setLoading] = useState(false);
    const collectionName = 'users';

    // Get current user's UID from Firebase Authentication
    const getCurrentUserId = () => {
        const auth = getAuth();
        const user = auth.currentUser;
        return user ? user.uid : null;
    };

    // Fetch data from Firestore and filter by userId
    const fetchData = async () => {
        setLoading(true);
        const currentUserId = getCurrentUserId();

        if (!currentUserId) {
            console.error('No user logged in');
            setLoading(false);
            return;
        }

        try {
            const querySnapshot = await getDocs(collection(FIRESTORE_DB, collectionName));

            // Filter the fetched documents by current user's UID and extract species and ID
            const fetchedData = querySnapshot.docs
                .map((doc) => ({
                    id: doc.id, // Document ID
                    species: doc.data().species,
                    genContent: doc.data().genContent, // Extract "species" and "genContent" fields
                }))
                .filter((docData) => docData.species !== undefined); // Filter out documents without species

            setData(fetchedData); // Set only species data in state, along with their IDs
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Delete data from Firestore
    const deleteData = async (id: string) => {
        try {
            const docRef = doc(FIRESTORE_DB, collectionName, id);
            await deleteDoc(docRef);
            console.log('Document deleted:', id);
            fetchData(); // Refresh data after deleting
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    };

    // Function to format bold text
    const formatBoldText = (text) => {
        const parts = text.split(/(\*\*.*?\*\*)/); // Split text by **bold segments**
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                // Remove ** and return bold Text component
                return (
                    <Text key={index} style={{ fontWeight: 'bold' }}>
                        {part.slice(2, -2)}
                    </Text>
                );
            }
            return <Text key={index}>{part}</Text>; // Regular text
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Previous Scans</Text>

            {/* Refresh Button */}
            <TouchableOpacity
                style={styles.refreshButton}
                onPress={fetchData} // Refresh the data when pressed
            >
                <Text style={styles.refreshButtonText}>Refresh</Text>
            </TouchableOpacity>

            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id} // Use document ID as key
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            {/* Display species normally */}
                            <Text style={styles.itemText}>{item.species}</Text>
                            <Text style={styles.itemText}>{item.genContent}</Text>
                            {/* Pass genContent through formatBoldText */}
                            {/* <Text style={styles.itemText}>
                                {formatBoldText(item.genContent)}
                            </Text> */}
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => deleteData(item.id)} // Pass the document ID to delete
                            >
                                <Text style={styles.deleteButtonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    item: {
        padding: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 16,
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 8,
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 14,
    },
    refreshButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 8,
        marginBottom: 16,
        alignItems: 'center',
    },
    refreshButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default DataFetch;
