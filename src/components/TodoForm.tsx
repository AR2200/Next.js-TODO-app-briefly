// src/components/TodoForm.tsx
import React, { useState } from 'react';
import { Todo, TodoCategory } from '@/types/todo';

interface TodoFormProps {
  onAddTodo: (todo: Omit<Todo, 'id' | 'isCompleted'>) => void;
  availableCategories: TodoCategory[]; // 利用可能なカテゴリをpropsで受け取る
}

export const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo, availableCategories }) => {
  const [task, setTask] = useState('');
  const [category, setCategory] = useState<TodoCategory>(availableCategories[0] || ''); // 最初のカテゴリをデフォルトに
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim() || !dueDate || !category) return; // カテゴリが選択されているか確認

    onAddTodo({ task, category, dueDate });
    setTask('');
    setDueDate('');
    setCategory(availableCategories[0] || ''); // デフォルトに戻す
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg shadow-md mb-6">
      <div className="mb-4">
        <label htmlFor="task" className="block text-gray-700 text-sm font-bold mb-2">タスク名</label>
        <input
          type="text"
          id="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="新しいタスクを入力"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">カテゴリ</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as TodoCategory)}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {availableCategories.length === 0 ? (
            <option value="" disabled>カテゴリを追加してください</option>
          ) : (
            availableCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))
          )}
        </select>
      </div>
      <div className="mb-6">
        <label htmlFor="dueDate" className="block text-gray-700 text-sm font-bold mb-2">期限</label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        タスクを追加
      </button>
    </form>
  );
};