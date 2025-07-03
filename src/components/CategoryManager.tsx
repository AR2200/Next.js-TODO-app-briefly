// src/components/CategoryManager.tsx
import React, { useState } from 'react';
import { TodoCategory } from '@/types/todo';

interface CategoryManagerProps {
  categories: TodoCategory[];
  onAddCategory: (newCategory: string) => void;
  onDeleteCategory: (categoryToDelete: TodoCategory) => void;
}

export const CategoryManager: React.FC<CategoryManagerProps> = ({ categories, onAddCategory, onDeleteCategory }) => {
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleAddCategory = () => {
    if (newCategoryName.trim() && !categories.includes(newCategoryName.trim())) {
      onAddCategory(newCategoryName.trim());
      setNewCategoryName('');
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4">カテゴリ管理</h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="新しいカテゴリ名"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
        />
        <button
          onClick={handleAddCategory}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          追加
        </button>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">既存カテゴリ:</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <span key={category} className="bg-blue-200 text-blue-800 text-sm font-medium px-3 py-1 rounded-full flex items-center">
              {category}
              <button
                onClick={() => onDeleteCategory(category)}
                className="ml-2 text-blue-800 hover:text-blue-900 font-bold"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};