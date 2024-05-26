import React, { useEffect } from 'react';
import useGetNotifications from '../components/hooks/useGetNotifications';
import { getWeatherForecast } from '../components/weatherutils';
import '../index.css';

const ViewNotifications = () => {
  const { notifications } = useGetNotifications();

  useEffect(() => {
    const showNotifications = async () => {
      notifications.forEach((notification) => {
        if (Notification.permission === 'granted') {
          new Notification(notification.title, {
            body: notification.message,
            icon: '/path/to/icon.png',
          });
        }
      });

      
      try {
        const apiKey = '38bf640b991a7ef07fd2bb50704da524';
        const city = 'Johannesburg'; 
        const weather = await getWeatherForecast(city, apiKey);
        if (Notification.permission === 'granted') {
          new Notification('Weather Forecast for Tomorrow', {
            body: `The weather tomorrow in ${city} will be ${weather.weather[0].description} with a temperature of ${weather.main.temp}°C.`,
            icon: '/path/to/weather-icon.png',
          });
        }
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
      }
    };

    showNotifications();
  }, [notifications]);

  return (
    <div className="notifications-container">
      <h1>Notifications</h1>
      <div className="notifications-list">
        {notifications.map((notification) => (
          <div key={notification.id} className="notification-item">
            <h2>{notification.title}</h2>
            <p>{notification.message}</p>
            <span>{new Date(notification.timestamp.seconds * 1000).toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewNotifications;
