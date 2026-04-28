# Простой и надёжный Dockerfile для Node.js приложения
FROM node:20-alpine

# Рабочая директория
WORKDIR /app

# Копируем package файлы
COPY backend/package*.json ./

# Устанавливаем ВСЕ зависимости (включая dev, чтобы точно всё работало)
# Используем npm install вместо npm ci для большей устойчивости
RUN npm install

# Копируем исходный код (только src, чтобы не перезаписать node_modules)
COPY backend/src ./src

# Порт
EXPOSE 3001
ENV PORT=3001

# Запуск
CMD ["node", "src/server.js"]