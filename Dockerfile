FROM node:20-alpine

WORKDIR /app

# Копируем package файлы
COPY backend/package*.json ./

# Отладка: показываем содержимое package.json
RUN echo "=== package.json contents ===" && cat package.json

# Устанавливаем зависимости с выводом логов
RUN echo "=== Running npm install ===" && \
    npm install --verbose 2>&1 | tail -20

# Проверяем, что node_modules создан
RUN echo "=== Checking node_modules ===" && \
    ls -la node_modules | head -10 || echo "node_modules not found!"

# Проверяем, что express установлен
RUN echo "=== Checking express ===" && \
    ls -la node_modules/express/package.json || echo "express not found!"

# Копируем исходный код
COPY backend/src ./src

EXPOSE 3001
ENV PORT=3001

# Отладка перед запуском
RUN echo "=== Final directory structure ===" && \
    ls -la /app && \
    ls -la /app/src

CMD ["node", "src/server.js"]