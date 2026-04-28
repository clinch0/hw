# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем manifest файлы для кэширования зависимостей
COPY backend/package*.json ./

# Устанавливаем только продакшн-зависимости
RUN npm ci --only=production

# Копируем ВЕСЬ бэкенд целиком, чтобы сохранить структуру путей
COPY backend/ ./backend

# Stage 2: Production runtime
FROM node:20-alpine

WORKDIR /app

# Копируем package.json и node_modules из builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# Копируем весь бэкенд из builder
COPY --from=builder /app/backend ./backend

# Создаём не-рут пользователя для безопасности
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

USER nodejs

# Переменные окружения
ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

# Запускаем приложение, указывая правильный путь
CMD ["node", "backend/src/server.js"]