export type TodoCategory = string;

export interface Todo { 
    id: string;
    task: string;
    category: TodoCategory;
    dueDate: string;
    isCompleted: boolean;
}