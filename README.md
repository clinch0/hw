# TaskFlow

Веб-приложение для управления личными задачами с возможностью категоризации, фильтрации и уведомлений.

## Цель проекта
Снизить когнитивную нагрузку при планировании ежедневных задач за счёт централизованного хранения, быстрой смены статусов и минималистичного интерфейса.

## Основной функционал
- Создание, редактирование и удаление задач
- Управление статусами: `новая` / `выполнена`
- Валидация ввода на клиенте и сервере
- Адаптивный интерфейс

## Архитектура и стек

| Компонент | Технология | Примечание |
|-----------|-----------|------------|
| Фронтенд | React + Vite | SPA, hooks, fetch API |
| Бэкенд | Node.js + Express | REST API, слоистая архитектура |
| Тесты | Jest + Supertest | Unit + Integration |
| CI/CD | GitHub Actions | Линтинг, тесты, сборка |
| Контейнер | Docker | Multi-stage build |

## Запуск

### Через npm
```powershell
# Терминал 1 — бэкенд
cd backend
npm install
npm run dev

# Терминал 2 — фронтенд
cd frontend
npm install
npm run dev
```

http://localhost:5173

## Запуск через Docker

### Сборка образа
```powershell
docker build -t taskflow .
```

### Запуск контейнера
```powershell
docker run -d -p 3001:3001 --name taskflow-app taskflow
```

### Проверка работоспособности
```powershell
# Проверка ответа API
curl.exe http://localhost:3001/api/tasks

# Просмотр логов
docker logs taskflow-app

# Остановка и удаление
docker stop taskflow-app
docker rm taskflow-app
```

### Сборка без кэша (для отладки)
```powershell
docker build --no-cache -t taskflow .
```