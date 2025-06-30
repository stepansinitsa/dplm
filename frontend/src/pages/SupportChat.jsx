import React, { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';
import ChatBox from '../components/ChatBox';

function SupportChat() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    async function fetchChats() {
      try {
        const res = await apiClient.get('/api/client/support-requests');
        setChats(res.data);
      } catch (err) {
        alert('Ошибка загрузки обращений');
      }
    }

    fetchChats();
  }, []);

  return (
    <div className="support-chat">
      <h2>Чат техподдержки</h2>
      <div className="chat-list">
        {chats.map(chat => (
          <div key={chat.id} className="chat-item">
            <h4>{chat.isActive ? 'Активен' : 'Завершён'}</h4>
            <ChatBox chatId={chat.id} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SupportChat;