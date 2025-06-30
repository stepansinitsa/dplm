import React, { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';
import RoomCard from '../components/RoomCard';

function Home() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    async function fetchRooms() {
      try {
        const res = await apiClient.get('/api/common/hotel-rooms');
        setRooms(res.data);
      } catch (err) {
        alert('Ошибка загрузки номеров');
      }
    }

    fetchRooms();
  }, []);

  return (
    <div className="home-page">
      <h1>Добро пожаловать в HotelHub</h1>
      <div className="hotel-list">
        {rooms.map(room => (
          <RoomCard
            key={room.id}
            room={room}
            onSelect={() => window.location.href = `/book/${room.id}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;