import { useState, useRef } from 'react';
import { router } from '@inertiajs/react';

export default function Todo({ todos }) {
    const [title, setTitle] = useState('');
    const [adding, setAdding] = useState(false);
    const inputRef = useRef(null);

    const addTodo = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        setAdding(true);
        router.post('/todos', { title }, {
            onFinish: () => { setTitle(''); setAdding(false); }
        });
    };

    const toggleTodo = (id) => router.put(`/todos/${id}`);
    const deleteTodo = (id) => router.delete(`/todos/${id}`);

    const done = todos.filter(t => t.is_completed).length;
    const total = todos.length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

                body {
                    background: #0f0f0f;
                    min-height: 100vh;
                    font-family: 'DM Sans', sans-serif;
                }

                .shell {
                    min-height: 100vh;
                    display: grid;
                    grid-template-columns: 320px 1fr;
                }

                /* ── LEFT PANEL ── */
                .panel-left {
                    background: #161616;
                    border-right: 1px solid #2a2a2a;
                    padding: 48px 32px;
                    display: flex;
                    flex-direction: column;
                    gap: 40px;
                    position: sticky;
                    top: 0;
                    height: 100vh;
                }

                .brand { display: flex; flex-direction: column; gap: 4px; }

                .brand-tag {
                    font-size: 10px;
                    letter-spacing: 4px;
                    color: #666;
                    text-transform: uppercase;
                }

                .brand-title {
                    font-family: 'Syne', sans-serif;
                    font-weight: 800;
                    font-size: 32px;
                    color: #ffffff;
                    line-height: 1;
                }

                .brand-title span { color: #c8f135; }

                .stats-block { display: flex; flex-direction: column; gap: 0; }

                .stat-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 14px 0;
                    border-bottom: 1px solid #242424;
                }

                .stat-label {
                    font-size: 12px;
                    color: #888;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                }

                .stat-val {
                    font-family: 'Syne', sans-serif;
                    font-weight: 700;
                    font-size: 24px;
                    color: #ffffff;
                }

                .stat-val.green { color: #c8f135; }

                .progress-wrap { margin-top: 8px; }

                .progress-label {
                    display: flex;
                    justify-content: space-between;
                    font-size: 11px;
                    color: #666;
                    margin-bottom: 8px;
                }

                .progress-bar {
                    background: #242424;
                    border-radius: 99px;
                    height: 4px;
                    overflow: hidden;
                }

                .progress-fill {
                    height: 100%;
                    background: #c8f135;
                    border-radius: 99px;
                    transition: width 0.6s cubic-bezier(.4,0,.2,1);
                }

                .tagline {
                    margin-top: auto;
                    font-size: 11px;
                    color: #444;
                    line-height: 1.8;
                }

                /* ── RIGHT PANEL ── */
                .panel-right {
                    padding: 48px 56px;
                    display: flex;
                    flex-direction: column;
                    gap: 40px;
                }

                .input-hint {
                    font-size: 11px;
                    color: #666;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    margin-bottom: 16px;
                }

                .input-row {
                    display: flex;
                    border: 1px solid #2a2a2a;
                    border-radius: 12px;
                    overflow: hidden;
                    background: #161616;
                    transition: border-color 0.2s;
                }

                .input-row:focus-within { border-color: #c8f135; }

                .input-row input {
                    flex: 1;
                    background: transparent;
                    border: none;
                    outline: none;
                    padding: 18px 24px;
                    color: #ffffff;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 15px;
                }

                .input-row input::placeholder { color: #444; }

                .input-row button {
                    background: #c8f135;
                    border: none;
                    padding: 0 28px;
                    font-family: 'Syne', sans-serif;
                    font-weight: 700;
                    font-size: 13px;
                    cursor: pointer;
                    color: #0f0f0f;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    transition: background 0.2s;
                }

                .input-row button:hover { background: #d4f84a; }
                .input-row button:disabled { opacity: 0.5; cursor: not-allowed; }

                .section-head {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 16px;
                }

                .section-label {
                    font-size: 11px;
                    color: #666;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                }

                .section-count {
                    background: #222;
                    color: #888;
                    border-radius: 99px;
                    font-size: 11px;
                    padding: 2px 10px;
                    font-family: 'Syne', sans-serif;
                }

                .todo-list { display: flex; flex-direction: column; gap: 10px; }

                .todo-item {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    padding: 18px 22px;
                    background: #161616;
                    border: 1px solid #242424;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: border-color 0.2s, background 0.2s, transform 0.15s;
                }

                .todo-item:hover {
                    border-color: #333;
                    background: #1a1a1a;
                    transform: translateX(4px);
                }

                .todo-item.done { opacity: 0.4; }
                .todo-item.done:hover { opacity: 0.6; }

                .check-box {
                    width: 22px;
                    height: 22px;
                    border-radius: 6px;
                    border: 2px solid #333;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.15s;
                }

                .todo-item:hover .check-box { border-color: #555; }

                .todo-item.done .check-box {
                    background: #c8f135;
                    border-color: #c8f135;
                }

                .check-svg { opacity: 0; transition: opacity 0.15s; }
                .todo-item.done .check-svg { opacity: 1; }

                .todo-text {
                    flex: 1;
                    font-size: 15px;
                    color: #e8e8e8;
                    font-weight: 400;
                    line-height: 1.4;
                }

                .todo-item.done .todo-text {
                    text-decoration: line-through;
                    color: #555;
                }

                .del-btn {
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 6px;
                    border-radius: 6px;
                    opacity: 0;
                    color: #555;
                    display: flex;
                    align-items: center;
                    transition: opacity 0.15s, color 0.15s, background 0.15s;
                }

                .todo-item:hover .del-btn { opacity: 1; }
                .del-btn:hover { background: #2a1515; color: #e05555; }

                .empty-state {
                    text-align: center;
                    padding: 60px 0;
                    color: #333;
                }

                .empty-icon { font-size: 40px; margin-bottom: 12px; }

                .empty-text {
                    font-size: 13px;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    color: #444;
                }
            `}</style>

            <div className="shell">
                <aside className="panel-left">
                    <div className="brand">
                        <span className="brand-tag">Workspace</span>
                        <h1 className="brand-title">Do<span>.</span></h1>
                    </div>

                    <div className="stats-block">
                        <div className="stat-row">
                            <span className="stat-label">Total</span>
                            <span className="stat-val">{total}</span>
                        </div>
                        <div className="stat-row">
                            <span className="stat-label">Done</span>
                            <span className="stat-val green">{done}</span>
                        </div>
                        <div className="stat-row">
                            <span className="stat-label">Remaining</span>
                            <span className="stat-val">{total - done}</span>
                        </div>
                        <div className="progress-wrap">
                            <div className="progress-label">
                                <span>Progress</span>
                                <span>{pct}%</span>
                            </div>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: `${pct}%` }} />
                            </div>
                        </div>
                    </div>

                    <p className="tagline">
                        Satu task selesai<br />
                        lebih baik dari<br />
                        sepuluh yang direncanakan.
                    </p>
                </aside>

                <main className="panel-right">
                    <div>
                        <p className="input-hint">Task baru</p>
                        <form onSubmit={addTodo}>
                            <div className="input-row">
                                <input
                                    ref={inputRef}
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    placeholder="Ketik task kamu..."
                                    disabled={adding}
                                />
                                <button type="submit" disabled={adding || !title.trim()}>
                                    {adding ? '...' : 'Tambah'}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div>
                        <div className="section-head">
                            <span className="section-label">Belum selesai</span>
                            <span className="section-count">{todos.filter(t => !t.is_completed).length}</span>
                        </div>
                        <div className="todo-list">
                            {todos.filter(t => !t.is_completed).length === 0 && (
                                <div className="empty-state">
                                    <div className="empty-icon">✦</div>
                                    <p className="empty-text">Semua beres!</p>
                                </div>
                            )}
                            {todos.filter(t => !t.is_completed).map(todo => (
                                <div key={todo.id} className="todo-item" onClick={() => toggleTodo(todo.id)}>
                                    <div className="check-box">
                                        <svg className="check-svg" width="12" height="9" viewBox="0 0 12 9" fill="none">
                                            <path d="M1 4L4.5 7.5L11 1" stroke="#0f0f0f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <span className="todo-text">{todo.title}</span>
                                    <button className="del-btn" onClick={e => { e.stopPropagation(); deleteTodo(todo.id); }}>
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                            <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {todos.filter(t => t.is_completed).length > 0 && (
                        <div>
                            <div className="section-head">
                                <span className="section-label">Selesai</span>
                                <span className="section-count">{done}</span>
                            </div>
                            <div className="todo-list">
                                {todos.filter(t => t.is_completed).map(todo => (
                                    <div key={todo.id} className="todo-item done" onClick={() => toggleTodo(todo.id)}>
                                        <div className="check-box">
                                            <svg className="check-svg" width="12" height="9" viewBox="0 0 12 9" fill="none">
                                                <path d="M1 4L4.5 7.5L11 1" stroke="#0f0f0f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </div>
                                        <span className="todo-text">{todo.title}</span>
                                        <button className="del-btn" onClick={e => { e.stopPropagation(); deleteTodo(todo.id); }}>
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}