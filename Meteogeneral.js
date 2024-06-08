import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

const MeteoGeneral = ({ meteo }) => {
    return(
        <View style={styles.container}>
            <Text style={styles.paragraph}>{meteo.name}</Text>
            <View style={styles.weatherContainer}>
                {meteo.weather.map((weather, index) => (
                    <View key={index} style={styles.weatherItem}>
                        <Text style={styles.paragraph}>{weather.main}</Text>
                        <Image source={{ uri: `http://openweathermap.org/img/wn/${weather.icon}.png` }} style={{ width: 50, height: 50 }} />
                    </View>
                ))}
            </View>
            <Text style={styles.paragraph}>{meteo.main.temp}°C</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 20,
    },
    weatherContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    weatherItem: {
        marginHorizontal: 10,
        alignItems: 'center',
    },
    paragraph: {
        fontSize: 18,
        textAlign: 'center',
    },
});

export default MeteoGeneral;