import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNetworkStatus } from "./networkStatus";

export default function WeatherApp() {
  const { networkStatus, weatherData, fetchWeatherData } = useNetworkStatus();
  const isOffline = networkStatus === "You are offline!";

  return (
    <ImageBackground
      source={{
        uri: "https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?cs=srgb&dl=pexels-pixabay-209831.jpg&fm=jpg",
      }}
      style={styles.container}
    >
      <Text style={styles.title}>Weather Forecast</Text>

      <View
        style={[
          styles.statusContainer,
          { backgroundColor: isOffline ? "#ffcccc" : "#e0ffe0" },
        ]}
      >
        <Text
          style={[
            styles.statusText,
            { color: isOffline ? "#cc0000" : "#006600" },
          ]}
        >
          {networkStatus}
        </Text>

        {isOffline && (
          <Image
            source={{ uri: "https://i.imgur.com/IVSzOUC.png" }}
            style={styles.offlineImage}
          />
        )}
      </View>

      {!isOffline && weatherData ? (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherTitle}>
            Weather in {weatherData.location.name}
          </Text>
          <Text style={styles.weatherText}>
            Temperature: {weatherData.current.temp_c} C
          </Text>
          <Text style={styles.weatherText}>
            Condition: {weatherData.current.condition.text}
          </Text>
          <Image
            source={{ uri: `https:${weatherData.current.condition.icon}` }}
            style={styles.weatherIcon}
          />
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={fetchWeatherData}
          >
            <Text style={styles.refreshButtonText}>Refresh</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {isOffline && (
        <Text style={styles.offlineText}>
          No network connection. Please check your internet.
        </Text>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  statusContainer: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  statusText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000",
  },
  offlineImage: {
    width: 50,
    height: 50,
    marginTop: 10,
  },
  weatherContainer: {
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    alignItems: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  weatherTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  weatherText: {
    fontSize: 18,
    marginVertical: 5,
  },
  weatherIcon: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  refreshButton: {
    marginTop: 15,
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  refreshButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  offlineText: {
    color: "#CC0000",
    fontSize: 16,
    textAlign: "center",
  },
});
