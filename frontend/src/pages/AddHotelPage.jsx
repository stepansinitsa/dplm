import React, { useState } from 'react';
import apiClient from '../services/apiClient';
import { useNavigate } from 'react-router-dom';

function AddHotelPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    for (const image of images) {
      formData.append('images', image);
    }

    try {
      const res = await apiClient.post('/api/admin/hotels', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate(`/admin`);
    } catch (err) {
      alert('Ошибка при добавлении гостиницы');
    }
  };

  return (
    <div className="add-hotel-page">
      <h2>Добавить гостиницу</h2>
      <input
        type="text"
        placeholder="Название"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input type="file" multiple accept="image/*" onChange={handleImageChange} />
      <button onClick={handleSubmit}>Сохранить</button>
    </div>
  );
}

export default AddHotelPage;