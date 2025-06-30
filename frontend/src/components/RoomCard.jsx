import React from 'react';
import PropTypes from 'prop-types';

function RoomCard({ room, onSelect }) {
  return (
    <div className="room-card">
      <div className="room-images">
        {room.images.length > 0 ? (
          <img src={room.images[0]} alt={room.hotel.title} style={{ width: '100%' }} />
        ) : (
          <div className="no-image">Нет изображений</div>
        )}
      </div>

      <div className="room-info">
        <h3>Номер гостиницы</h3>
        <p><strong>Гостиница:</strong> {room.hotel.title}</p>
        <p><strong>Описание:</strong> {room.description || 'Нет описания'}</p>

        <button onClick={onSelect}>
          {room.isEnabled ? 'Забронировать' : 'Недоступно'}
        </button>
      </div>
    </div>
  );
}

// Пропсы для проверки типов
RoomCard.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    isEnabled: PropTypes.bool.isRequired,
    hotel: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
    }).isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default RoomCard;