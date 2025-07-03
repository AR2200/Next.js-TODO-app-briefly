// src/app/page.tsx
'use client'; // クライアントコンポーネントとしてマーク

import React, { useState, useMemo, useEffect } from 'react';
import { Todo, TodoCategory } from '@/types/todo';
import { TodoForm } from '@/components/TodoForm';
import { TodoItem } from '@/components/TodoItem';
import { CategoryManager } from '@/components/CategoryManager'; // 新しくインポート
import { v4 as uuidv4 } from 'uuid'; // UUID生成ライブラリ

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  // カテゴリの初期値。Local Storageから読み込むか、デフォルト値を設定
  const [categories, setCategories] = useState<TodoCategory[]>(['仕事', 'プライベート', '買い物', 'その他']);
  const [filterCategory, setFilterCategory] = useState<TodoCategory | 'すべて'>('すべて');

  // コンポーネントマウント時にTODOとカテゴリをLocalStorageから読み込む
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
    const storedCategories = localStorage.getItem('categories');
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

  // todosが変更されたらLocalStorageに保存
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // categoriesが変更されたらLocalStorageに保存
  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  // 新しいTODOを追加
  const handleAddTodo = (newTodo: Omit<Todo, 'id' | 'isCompleted'>) => {
    const id = uuidv4();
    setTodos((prevTodos) => [...prevTodos, { ...newTodo, id, isCompleted: false }]);
  };

  // 完了状態を切り替え
  const handleToggleComplete = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  // TODOを削除
  const handleDeleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // 新しいカテゴリを追加
  const handleAddCategory = (newCategory: string) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  // カテゴリを削除
  const handleDeleteCategory = (categoryToDelete: TodoCategory) => {
    setCategories((prevCategories) => prevCategories.filter(cat => cat !== categoryToDelete));
    // 削除されたカテゴリに属するTODOを「その他」カテゴリに移動するか、削除するかなどの処理が必要になる場合がある
    // 今回はシンプルに、削除されたカテゴリのTODOはフィルタリングで表示されなくなる
    setTodos((prevTodos) =>
      prevTodos.map(todo =>
        todo.category === categoryToDelete ? { ...todo, category: 'その他' } : todo // 例: 「その他」に移動
      )
    );
    if (filterCategory === categoryToDelete) {
      setFilterCategory('すべて'); // フィルタリング中のカテゴリが削除されたらリセット
    }
  };

  // カテゴリでフィルタリングされたTODOリスト
  const filteredTodos = useMemo(() => {
    if (filterCategory === 'すべて') {
      return todos;
    }
    return todos.filter(todo => todo.category === filterCategory);
  }, [todos, filterCategory]);

  // フィルタリング用のカテゴリリスト（「すべて」を含む）
  const filterCategories = useMemo(() => ['すべて', ...categories], [categories]);

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">My TODO List</h1>

      {/* カテゴリ管理コンポーネント */}
      <CategoryManager
        categories={categories}
        onAddCategory={handleAddCategory}
        onDeleteCategory={handleDeleteCategory}
      />

      {/* TODO追加フォーム */}
      <TodoForm onAddTodo={handleAddTodo} availableCategories={categories} />

      {/* カテゴリフィルター */}
      <div className="mb-4">
        <label htmlFor="filterCategory" className="block text-gray-700 text-sm font-bold mb-2">カテゴリで絞り込み</label>
        <select
          id="filterCategory"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value as TodoCategory | 'すべて')}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {filterCategories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* TODOリストの表示 */}
      <div>
        {filteredTodos.length === 0 ? (
          <p className="text-center text-gray-500">表示するタスクはありません。</p>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleComplete={handleToggleComplete}
              onDeleteTodo={handleDeleteTodo}
            />
          ))
        )}
      </div>
    </div>
  );
}