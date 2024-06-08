import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import MeteoGeneral from './Meteogeneral';
import MeteoDays from './Meteodays';

export default function App() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [meteo, setMeteo] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                setIsLoading(false);
                return;
            }

            let loc = await Location.getCurrentPositionAsync({});
            setLocation(loc);

            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${loc.coords.latitude}&lon=${loc.coords.longitude}&lang=Fr&units=metric&appid=9971b9e599b3bf2bb081dd53dfe70a66`)
                .then(function (response) {
                    setMeteo(response.data);
                })
                .catch((error) => {
                    setErrorMsg('pas de data');
                });

            axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${loc.coords.latitude}&lon=${loc.coords.longitude}&lang=Fr&units=metric&appid=9971b9e599b3bf2bb081dd53dfe70a66`)
                .then(function (response) {
                    setForecast(response.data.list);
                })
                .catch((error) => {
                    setErrorMsg('pas de data');
                })
                .finally(() => {
                    setIsLoading(false);
                });
        })();
    }, []);

    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (errorMsg) {
        return <View style={styles.container}><Text style={styles.paragraph}>{errorMsg}</Text></View>;
    }

    return (
        <View style={styles.container}>
            {meteo && <View style={styles.meteoContainer}><MeteoGeneral meteo={meteo} /></View>}
            {forecast && <View style={styles.forecastContainer}><MeteoDays forecast={forecast} /></View>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    paragraph: {
        fontSize: 18,
        textAlign: 'center',
    },
    meteoContainer: {
        marginTop: 50,
    },
    forecastContainer: {
        marginTop: 100,
    },
});
