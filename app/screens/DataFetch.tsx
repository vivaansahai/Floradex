import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FIRESTORE_DB } from '@/FirebaseConfig'; // Replace with your actual Firebase config import
import { getAuth } from 'firebase/auth'; // Import Firebase Authentication
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const DataFetch = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const collectionName = 'users';

    const getCurrentUserId = () => {
        const auth = getAuth();
        const user = auth.currentUser;
        return user ? user.uid : null;
    };

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

            const fetchedData = querySnapshot.docs
                .map((doc) => ({
                    id: doc.id,
                    species: doc.data().species,
                    genContent: doc.data().genContent,
                }))
                .filter((docData) => docData.species !== undefined);

            setData(fetchedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteData = async (id: string) => {
        try {
            const docRef = doc(FIRESTORE_DB, collectionName, id);
            await deleteDoc(docRef);
            console.log('Document deleted:', id);
            fetchData();
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    };

    const formatBoldText = (text) => {
        if (!text) {
            return '';
        }

        const parts = text.split(/(\*\*.*?\*\*)/);

        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return (
                    <Text key={index} style={{ fontWeight: 'bold', color: '#ffff' }}>
                        {part.slice(2, -2)}
                    </Text>
                );
            }
            return <Text key={index} style={{ color: '#ffff' }}>{part}</Text>;
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Previous Scans</Text>

            <TouchableOpacity
                style={styles.refreshButton}
                onPress={fetchData}
            >
                <Text style={styles.refreshButtonText}>Refresh</Text>
            </TouchableOpacity>

            {loading ? (
                <Text style={styles.loadingText}>Loading...</Text>
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text style={styles.itemText}>{item.species}</Text>
                            {<Text style={styles.itemText}>
                                {formatBoldText(item.genContent)}
                            </Text>}
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => deleteData(item.id)}
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
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#ffff',
        textAlign: 'center',
    },
    item: {
        padding: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 8,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    itemText: {
        fontSize: 16,
        color: '#ffff',
    },
    deleteButton: {
        backgroundColor: '#B22222',
        padding: 8,
        borderRadius: 8,
        marginTop: 8,
    },
    deleteButtonText: {
        color: '#ffff',
        fontSize: 14,
        textAlign: 'center',
    },
    refreshButton: {
        backgroundColor: '#32CD32',
        padding: 10,
        borderRadius: 8,
        marginBottom: 16,
        alignItems: 'center',
    },
    refreshButtonText: {
        color: '#ffff',
        fontSize: 16,
    },
    loadingText: {
        fontSize: 18,
        color: '#ffff',
        textAlign: 'center',
    },
});

export default DataFetch;
