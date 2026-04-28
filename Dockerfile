# Используем LTS версию Node на базе Alpine
FROM node:20-alpine

# Создаём рабочую директорию
WORKDIR /app

# Копируем только package.json для кэширования слоя зависимостей
COPY backend/package*.json ./

# Устанавливаем зависимости (только продакшн)
RUN npm ci --only=production

# Копируем весь исходный код бэкенда
COPY backend/ ./

# Открываем порт
EXPOSE 3001

# Передаём порт через переменную окружения
ENV PORT=3001

# Запускаем сервер. 
# Важно: путь должен быть относительно WORKDIR (/app)
CMD ["node", "src/server.js"]