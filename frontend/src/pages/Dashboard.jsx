import React, { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';
import RoomCard from '../components/RoomCard';

function Dashboard() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    async function fetchReservations() {
      try {
        const res = await apiClient.get('/api/client/reservations');
        setReservations(res.data);
      } catch (err) {
        alert('Ошибка загрузки броней');
      }
    }

    fetchReservations();
  }, []);

  return (
    <div className="dashboard">
      <h2>Мои брони</h2>
      {reservations.map((reservation) => (
        <RoomCard
          key={reservation.id}
          room={reservation.hotelRoom}
          onSelect={() => alert(`Бронь ${reservation.id} уже оформлена`)}
        />
      ))}
    </div>
  );
}

export default Dashboard;