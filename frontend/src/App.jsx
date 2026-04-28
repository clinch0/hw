import { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from './api/client';

function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await getTasks();
      setTasks(res.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    
    try {
      await createTask(newTitle);
      setNewTitle('');
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleStatus = async (id, current) => {
    try {
      const newStatus = current === 'new' ? 'done' : 'new';
      await updateTask(id, newStatus);
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Удалить задачу?')) return;
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '600px', 
      margin: '0 auto',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1>TaskFlow</h1>
      
      {error && (
        <p style={{ color: '#dc2626', background: '#fef2f2', padding: '0.5rem', borderRadius: '4px' }}>
          {error}
        </p>
      )}
      
      <form onSubmit={handleCreate} style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem' }}>
        <input 
          value={newTitle} 
          onChange={(e) => setNewTitle(e.target.value)} 
          placeholder="Название задачи (мин. 3 символа)" 
          required
          minLength={3}
          style={{ flex: 1, padding: '0.5rem' }}
        />
        <button type="submit" disabled={loading}>
          {loading ? '...' : 'Добавить'}
        </button>
      </form>
      
      {loading && <p>Загрузка...</p>}
      
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task) => (
          <li 
            key={task.id} 
            style={{ 
              marginBottom: '0.5rem', 
              padding: '0.75rem',
              background: '#f9fafb',
              borderRadius: '6px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              wordBreak: 'break-word',
              overflowWrap: 'break-word'
            }}
          >
            <span>
              <strong>{task.title}</strong> 
              <span style={{ 
                marginLeft: '0.5rem', 
                padding: '0.25rem 0.5rem',
                background: task.status === 'new' ? '#fef3c7' : '#d1fae5',
                color: task.status === 'new' ? '#92400e' : '#065f46',
                borderRadius: '4px',
                fontSize: '0.875rem'
              }}>
                {task.status === 'new' ? 'новая' : 'выполнена'}
              </span>
            </span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                onClick={() => handleStatus(task.id, task.status)}
                style={{ padding: '0.25rem 0.75rem' }}
              >
                {task.status === 'new' ? '✓ Выполнить' : '↩ Вернуть'}
              </button>
              <button 
                onClick={() => handleDelete(task.id)}
                style={{ 
                  padding: '0.25rem 0.75rem',
                  background: '#fee2e2',
                  color: '#dc2626',
                  border: '1px solid #fecaca'
                }}
              >
                Удалить
              </button>
            </div>
          </li>
        ))}
      </ul>
      
      {tasks.length === 0 && !loading && (
        <p style={{ color: '#6b7280', textAlign: 'center' }}>
          Нет задач. Добавьте первую!
        </p>
      )}
    </div>
  );
}

export default App;