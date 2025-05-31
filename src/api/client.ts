import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3001',
});

// Добавляем экспорт типа
export interface TableItem {
  id: number;
  name: string;
  email: string;
  date: string;
  status: 'active' | 'inactive';
  [key: string]: string | number | boolean; 
}