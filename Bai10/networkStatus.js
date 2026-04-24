import { useEffect, useState } from "react";
import { AppState, Platform } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import axios from "axios";

export const useNetworkStatus = () => {
  const [networkStatus, setNetworkStatus] = useState("Checking network...");
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        "http://api.weatherapi.com/v1/current.json?key=afe3b3bdfe29427385e150134262404&q=hanoi",
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error(
        "Error fetching weather data:",
        error.response?.data || error.message,
      );
    }
  };

  const sendNotification = async (title, body) => {
    if (Platform.OS === "web") {
      return;
    }

    try {
      const Notifications = await import("expo-notifications");
      await Notifications.scheduleNotificationAsync({
        content: { title, body },
        trigger: null,
      });
    } catch (error) {
      console.error("Error sending notification:", error.message);
    }
  };

  useEffect(() => {
    const configureNotifications = async () => {
      if (Platform.OS === "web") {
        return;
      }

      try {
        const Notifications = await import("expo-notifications");
        Notifications.setNotificationHandler({
          handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
          }),
        });
      } catch (error) {
        console.error("Error configuring notifications:", error.message);
      }
    };

    configureNotifications();

    const unsubscribe = NetInfo.addEventListener((state) => {
      const isConnected = Boolean(state.isConnected);
      const statusMessage = isConnected ? "You are online!" : "You are offline!";

      setNetworkStatus(statusMessage);
      sendNotification("Network Status Changed", statusMessage);

      if (isConnected) {
        fetchWeatherData();
      } else {
        setWeatherData(null);
      }
    });

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        fetchWeatherData();
      }
    });

    return () => {
      unsubscribe();
      subscription.remove();
    };
  }, []);

  return { networkStatus, weatherData, fetchWeatherData };
};
