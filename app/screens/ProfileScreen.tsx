import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedButton } from 'react-native-really-awesome-button';

const ProfileScreen = () => {
  // Sample data
  const profileData = {
    name: 'John Doe',
    profilePicUrl: 'https://www.w3schools.com/w3images/avatar2.png', // Example profile picture URL
    scanCount: 120,
    speciesDiscovered: 30,
    regionsDiscovered: 5,
    plantexCoins: 150,
  };

  const settingsOptions = [
    'Edit Profile',
    'Change Password',
    'Privacy Settings',
    'Notification Preferences',
    'Logout',
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Picture and Name */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: profileData.profilePicUrl }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{profileData.name}</Text>
      </View>

      {/* Boxes with scan count, species discovered, etc. */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statText}>{profileData.scanCount}</Text>
          <Text style={styles.statLabel}>Scans</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statText}>{profileData.speciesDiscovered}</Text>
          <Text style={styles.statLabel}>Species Discovered</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statText}>{profileData.regionsDiscovered}</Text>
          <Text style={styles.statLabel}>Regions Discovered</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statText}>{profileData.plantexCoins}</Text>
          <Text style={styles.statLabel}>Plantex Coins</Text>
        </View>
      </View>

      {/* Settings List */}
      <FlatList
        data={settingsOptions}
        renderItem={({ item }) => (
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>{item}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f1f1',
    width: '45%',
    paddingVertical: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  statText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#888',
  },
  settingItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
});

export default ProfileScreen;
