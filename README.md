# Структура проекта

Проект «HotelHub» состоит из двух основных частей: backend (NestJS API) и frontend (React SPA).Backend реализован на NestJS с использованием MongoDB через Mongoose.Все данные хранятся в базе MongoDB.Проект включает следующие модули:NestJS-модули:

- auth — аутентификация, регистрация, сессии
- users — управление пользователями
- hotels — гостиницы и номера
- reservations — бронирование отелей
- support — чат техподдержки.

Данные пользователей доступны только администраторам.Модель HotelRoom содержит ссылку на Hotel, описание, список изображений и флаг isEnabled.Только клиенты видят isEnabled: true номера.Гостиницы и комнаты можно искать по фильтрам.Модель Reservation содержит userId,hotelId,roomId,dateStart,dateEnd.Бронь возможна только если номер свободен на указанные даты.Чат техподдержки реализован через WebSocket и использует модели SupportRequest и Message.Сообщения могут отправлять клиенты и менеджеры.Фронтенд написан на React 18 с использованием Redux Toolkit для управления состоянием.Используется Axios для работы с REST API и socket.io-client для WebSocket.Страницы:Home,Login,Register,Dashboard,AdminPanel,SupportChat,AddHotelPage,EditHotelPage.Компоненты:Header,HotelCard,ReservationCard,ChatBox.

# Способы развёртывания и запуска приложения

Проект может быть запущен локально или через Docker.Все переменные окружения вынесены в .env файлы для гибкости.Поддерживается работа через Vite для фронтенда и NestJS CLI для бэкенда.Основные переменные окружения:
HTTP_PORT=3000
WS_PORT=3001
MONGO_URL=mongodb://admin:admin@localhost:27017/hotelhub?authSource=admin
SESSION_SECRET=my-secret-key
VITE_API_URL=http://localhost:3000
VITE_WS_URL=http://localhost:3001
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=admin

## Запуск через Docker:

docker-compose up --build

## Локальный запуск:

cd backend && npm install && npm run start:dev
cd ../frontend && npm install && npm run dev

API работает на порту 3000, фронтенд — на 3001.WebSocket чат подключается к 3001.Для сборки Docker образов используются Dockerfile в обеих папках.Манифест docker-compose.yaml содержит три сервиса:app (backend),mongo,mongo-express.База данных защищена логином и паролем из .env.Пользователи могут регистрироваться и входить через сессию.Роли:client,manager,admin.
