// src/components/TodoItem.tsx
import React from 'react';
import { Todo } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onDeleteTodo: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleComplete, onDeleteTodo }) => {
  return (
    <div className={`flex items-center justify-between p-4 mb-2 rounded-lg shadow-sm ${todo.isCompleted ? 'bg-green-100' : 'bg-white'}`}>
      <div className="flex-1">
        <h3 className={`text-lg font-semibold ${todo.isCompleted ? 'line-through text-gray-500' : ''}`}>{todo.task}</h3>
        <p className="text-sm text-gray-600">カテゴリ: {todo.category}</p>
        <p className="text-sm text-gray-600">期限: {todo.dueDate}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onToggleComplete(todo.id)}
          className={`py-1 px-3 rounded text-white text-sm ${todo.isCompleted ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'}`}
        >
          {todo.isCompleted ? '未完了に戻す' : '完了'}
        </button>
        <button
          onClick={() => onDeleteTodo(todo.id)}
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm"
        >
          削除
        </button>
      </div>
    </div>
  );
};