const { AppError } = require('../middleware/errorHandler');

const tasks = [{ id: 1, title: 'Изучить архитектуру приложения', status: 'new' }];
let nextId = 2;

exports.getAll = () => tasks;

exports.create = (title) => {
  if (!title || typeof title !== 'string' || title.trim().length < 3) {
    throw new AppError('Название задачи должно содержать минимум 3 символа', 400);
  }
  const newTask = { id: nextId++, title: title.trim(), status: 'new' };
  tasks.push(newTask);
  return newTask;
};

exports.updateStatus = (id, status) => {
  const task = tasks.find((t) => t.id === Number(id));
  if (!task) throw new AppError('Задача не найдена', 404);
  task.status = status;
  return task;
};

exports.delete = (id) => {
  const index = tasks.findIndex((t) => t.id === Number(id));
  if (index === -1) throw new AppError('Задача не найдена', 404);
  return tasks.splice(index, 1)[0];
};
