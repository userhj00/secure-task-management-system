import { useMemo, useState } from 'react';
type Task = {
  id: string;
  title: string;
  description?: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  ownerUserId: string;
  orgId: string;
  createdAt: string;
  updatedAt: string;
};

export default function App() {
  const API = useMemo(() => 'http://localhost:3001/api', []);

  const [token, setToken] = useState('');
  const [me, setMe] = useState<any>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const authed = (t: string) => ({
    Authorization: `Bearer ${t}`,
  });

  async function login(email: string) {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: 'Password123!' }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert(err?.message || 'Login failed');
      return;
    }

    const data = await res.json();
    setToken(data.access_token);
    setMe(null);
    setTasks([]);
  }

  async function loadMe() {
    if (!token) return alert('Login first');
    const res = await fetch(`${API}/auth/me`, { headers: authed(token) });
    const data = await res.json();
    setMe(data);
  }

  async function loadTasks() {
    if (!token) return alert('Login first');
    const res = await fetch(`${API}/tasks`, { headers: authed(token) });
    const data = await res.json();
    setTasks(Array.isArray(data) ? data : []);
  }

  async function createTask() {
    if (!token) return alert('Login first');
    if (!title.trim()) return alert('Title required');

    const res = await fetch(`${API}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authed(token) },
      body: JSON.stringify({ title, description }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert(err?.message || 'Create failed');
      return;
    }

    setTitle('');
    setDescription('');
    await loadTasks();
  }

  return (
    <div style={{ padding: 24, fontFamily: 'system-ui, Arial' }}>
      <h1>Task System</h1>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button onClick={() => login('owner@demo.com')}>Login Owner</button>
        <button onClick={() => login('staff@demo.com')}>Login Staff</button>
        <button onClick={loadMe} disabled={!token}>
          GET /auth/me
        </button>
        <button onClick={loadTasks} disabled={!token}>
          GET /tasks
        </button>
      </div>

      <div style={{ marginTop: 16 }}>
        <div style={{ marginBottom: 8 }}>
          <b>Token:</b> {token ? '✅ set' : '❌ not set'}
        </div>

        {me && (
          <pre style={{ background: '#f6f6f6', padding: 12, borderRadius: 8 }}>
{JSON.stringify(me, null, 2)}
          </pre>
        )}
      </div>

      <hr style={{ margin: '20px 0' }} />

      <h2>Create task</h2>
      <div style={{ display: 'grid', gap: 8, maxWidth: 420 }}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={createTask} disabled={!token}>
          POST /tasks
        </button>
      </div>

      <hr style={{ margin: '20px 0' }} />

      <h2>Tasks</h2>
      {tasks.length === 0 ? (
        <div>No tasks yet.</div>
      ) : (
        <ul>
          {tasks.map((t) => (
            <li key={t.id}>
              <b>{t.title}</b> — {t.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
