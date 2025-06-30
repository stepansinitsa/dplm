import React, { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';

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
      {reservations.length === 0 ? (
        <p>У вас нет активных броней.</p>
      ) : (
        reservations.map(r => (
          <div key={r.id} className="reservation-card">
            <h3>{r.hotel.title}</h3>
            <p><strong>Заезд:</strong> {new Date(r.startDate).toLocaleDateString()}</p>
            <p><strong>Выезд:</strong> {new Date(r.endDate).toLocaleDateString()}</p>
            <button>Отменить бронь</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;