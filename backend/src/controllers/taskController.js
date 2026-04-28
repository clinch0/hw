const taskService = require('../services/taskService');
const { catchAsync } = require('../middleware/errorHandler');

exports.getAll = catchAsync(async (req, res) => {
  const data = taskService.getAll();
  res.status(200).json({ status: 'success', data });
});

exports.create = catchAsync(async (req, res) => {
  const newTask = taskService.create(req.body.title);
  res.status(201).json({ status: 'success', data: newTask });
});

exports.update = catchAsync(async (req, res) => {
  const updated = taskService.updateStatus(req.params.id, req.body.status);
  res.status(200).json({ status: 'success', data: updated });
});

exports.delete = catchAsync(async (req, res) => {
  const deleted = taskService.delete(req.params.id);
  res.status(200).json({ status: 'success', data: deleted });
});