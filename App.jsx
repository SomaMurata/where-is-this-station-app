import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

export default function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [station, setStation] = useState('○△□駅');
  /* eslint-disable-next-line */
  const [errorMsg, setErrorMsg] = useState(null);

  const stationURL = 'http://express.heartrails.com/api/json?method=getStations';

  // 緯度経度取得
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const nowlocation = await Location.getCurrentPositionAsync({});
      setLatitude(JSON.stringify(nowlocation.coords.latitude));
      setLongitude(JSON.stringify(nowlocation.coords.longitude));
    })();
  }, []);

  // 緯度経度情報からAPIで駅を取得
  const getStation = async () => {
    try {
      const lat = latitude;
      const lon = longitude;
      const response = await axios.get(
        `${stationURL}&x=${lon}&y=${lat}`,
      );
      const { data } = response;
      return data.response.station[0].name;
    } catch (error) {
      return '駅情報取得に失敗しました。';
    }
  };
  // 現在地の駅を取得
  async function handlePress() {
    const currentStation = await getStation();
    setStation(`${currentStation}駅`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.textcont}>
        <Text style={styles.maintitle}>ココ今何駅？</Text>
        <Text style={styles.temp}>{station}</Text>
      </View>
      {/* eslint-disable-next-line */}
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>調べる</Text>
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
  textcont: {
    marginBottom: 80,
  },
  maintitle: {
    fontSize: 24,
    marginBottom: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  temp: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    paddingVertical: 24,
    width: '60%',
    backgroundColor: 'green',
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
