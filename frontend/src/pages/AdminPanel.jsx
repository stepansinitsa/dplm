import React, { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';

function AdminPanel() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const hotelsRes = await apiClient.get('/api/admin/hotels');
        setHotels(hotelsRes.data);
      } catch (err) {
        alert('Ошибка загрузки гостиниц');
      }
    }

    fetchData();
  }, []);

  return (
    <div className="admin-panel">
      <h2>Админ-панель</h2>
      <section>
        <h3>Гостиницы</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Название</th>
              <th>Описание</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map(h => (
              <tr key={h.id}>
                <td>{h.id}</td>
                <td>{h.title}</td>
                <td>{h.description}</td>
                <td><button>Редактировать</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default AdminPanel;