import React from 'react';
import {ScrollView, Text, View, StyleSheet, Image} from 'react-native';

const groupByDay = (forecast) => {
    const grouped = forecast.reduce((groups, item) => {
        const date = new Date(item.dt * 1e3).toLocaleDateString();
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(item);
        return groups;
    }, {});
    return Object.entries(grouped).map(([date, list]) => ({ date, list }));
};

const MeteoDays = ({ forecast }) => {
    const groupedForecast = groupByDay(forecast);
    return (
        <ScrollView style={styles.container}>
            {groupedForecast.map((group, index) => (
                <View key={index} style={styles.day}>
                    <Text style={styles.date}>{group.date}</Text>
                    <ScrollView style={styles.dayForecast}>
                        {group.list.map((item, index) => (
                            <View key={index} style={styles.item}>
                                <Text style={styles.time}>{new Date(item.dt * 1e3).toLocaleTimeString()}</Text>
                                <Text style={styles.temp}>{item.main.temp}°C</Text>
                                <Text style={styles.weather}>{item.weather[0].main}</Text>
                                <Image source={{ uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}.png` }} style={{ width: 50, height: 50 }} />
                            </View>
                        ))}
                    </ScrollView>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    day: {
        marginVertical: 8,
    },
    date: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 8,
        marginHorizontal: 16,
    },
    dayForecast: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    time: {
        fontSize: 14,
        color: '#555',
    },
    temp: {
        fontSize: 16,
        marginVertical: 4,
    },
    weather: {
        fontSize: 14,
        color: '#555',
    },
});

export default MeteoDays;