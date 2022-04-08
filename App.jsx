import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';

// import getLogation from './src/components/getLocation';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let Location = await Location.getCurrentPositionAsync({});
      let longitude = JSON.stringify(Location.coords.longitude);

      setLocation(longitude);
    })();
  }, []);

  function getLocation() {
    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
    }
    return <Text>{text}</Text>;
  }
  getLocation();

  const [station, setStation] = useState('○△□駅');
  function getStation() {
    const now = getLocation();
    console.log(now);
    setStation('小机駅');
  }

  const thisStation = station;
  return (
    <View style={styles.container}>
      <View style={styles.apptitle}>
        <Text style={styles.titletext}>ココなに駅？？</Text>
      </View>
      <View style={styles.stationbox}>
        <Text style={styles.stationname}>{thisStation}</Text>
      </View>
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => getStation()}
      >
        <Text style={styles.seachText}>調べる</Text>
      </TouchableOpacity>
      {/* eslint-disable-next-line */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  apptitle: {
    marginBottom: 40,
  },
  titletext: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  stationbox: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 80,
  },
  stationname: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  searchButton: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'green',
  },
  seachText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
