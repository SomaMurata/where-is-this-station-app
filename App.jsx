import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { Alert } from 'react-native-web';

// import getLogation from './src/components/getLocation';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [X, setX] = useState('35.68122310805687');
  const [Y, setY] = useState('139.76715027872547');
  const [station, setStation] = useState(null);
  const [posts, setPosts] = useState([]);

  // const URL = `http://express.heartrails.com/api/json?method=getStations&x=${X}.0&y=${Y}&jsonp=string`;
  const URL = 'https://jsonplaceholder.typicode.com/posts';

  useEffect(() => {
    function getStations() {
      fetch(URL)
        .then((res) => res.json())
        .then((data) => {
          setPosts(data);
        })
        .catch((error) => Alert.alert(error));
    }
    const station = getStations();
    console.log(posts.map);
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const nowlogation = await Location.getCurrentPositionAsync({});

      setLocation(nowlogation);
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

  function handlePress() {
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
        onPress={() => handlePress()}
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
