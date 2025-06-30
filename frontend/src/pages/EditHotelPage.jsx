import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../services/apiClient';

function EditHotelPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);

  useEffect(() => {
    async function fetchHotel() {
      try {
        const res = await apiClient.get(`/api/admin/hotels/${id}`);
        setHotel(res.data);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setUploadedImages(res.data.images || []);
      } catch (err) {
        alert('Ошибка загрузки гостиницы');
        navigate('/admin');
      }
    }

    fetchHotel();
  }, [id, navigate]);

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    const formData = new FormData();
    [...files].forEach(file => formData.append('images', file));

    try {
      const res = await apiClient.put(`/api/admin/hotels/${id}/media`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadedImages([...uploadedImages, ...res.data]);
    } catch (err) {
      alert('Ошибка загрузки изображений');
    }
  };

  const handleDeleteImage = async (image) => {
    if (!window.confirm('Удалить это изображение?')) return;
    try {
      await apiClient.delete(`/api/admin/hotels/media/${id}/images/${image}`);
      setUploadedImages(uploadedImages.filter(i => i !== image));
    } catch (err) {
      alert('Ошибка удаления изображения');
    }
  };

  const handleSave = async () => {
    try {
      await apiClient.put(`/api/admin/hotels/${id}`, { title, description });
      navigate('/admin');
    } catch (err) {
      alert('Ошибка сохранения изменений');
    }
  };

  return (
    <div className="edit-hotel-page">
      <h2>Редактировать гостиницу</h2>

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

      <div className="image-upload">
        <label>Добавить изображения:</label>
        <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
        <div className="preview">
          {uploadedImages.map((img, index) => (
            <div key={index} className="image-preview">
              <img src={img} alt={`Preview ${index}`} />
              <button onClick={() => handleDeleteImage(img)}>Удалить</button>
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleSave}>Сохранить</button>
    </div>
  );
}

export default EditHotelPage;