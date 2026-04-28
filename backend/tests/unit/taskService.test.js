const taskService = require('../../src/services/taskService');

describe('TaskService Unit Tests', () => {
  beforeEach(() => {
    // Сброс состояния для изоляции тестов
    taskService._reset && taskService._reset();
  });

  test('getAll returns array of tasks', () => {
    const result = taskService.getAll();
    expect(Array.isArray(result)).toBe(true);
  });

  test('create throws error for short title', () => {
    expect(() => taskService.create('Ab')).toThrow();
  });

  test('create returns new task with valid title', () => {
    const task = taskService.create('Valid Task Title');
    expect(task.title).toBe('Valid Task Title');
    expect(task.status).toBe('new');
  });

  test('updateStatus throws error for non-existent id', () => {
    expect(() => taskService.updateStatus(999, 'done')).toThrow();
  });

  test('delete removes task and returns it', () => {
    const task = taskService.create('Task to delete');
    const deleted = taskService.delete(task.id);
    expect(deleted.id).toBe(task.id);
  });
});
