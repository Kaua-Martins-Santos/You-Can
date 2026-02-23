import Dexie, { Table } from 'dexie';

export interface DailyChecklist {
  date: string; // YYYY-MM-DD
  trained: boolean;
  water3L: boolean;
  protein3x: boolean;
  sleep6h: boolean;
}

export interface WeeklyLog {
  id?: number;
  date: string;
  weight: number;
  energy: number; // 0-10
  notes: string;
}

export interface PhotoRecord {
  id?: number;
  date: string;
  imageBase64: string;
}

export interface Settings {
  id?: number;
  heightCm: number;
  age: number;
  gender: 'M' | 'F';
  activityLevel: number;
}

export class BodyTrackerDB extends Dexie {
  dailyLogs!: Table<DailyChecklist, string>;
  weeklyLogs!: Table<WeeklyLog, number>;
  photos!: Table<PhotoRecord, number>;
  settings!: Table<Settings, number>;

  constructor() {
    super('BodyTrackerDB');
    this.version(1).stores({
      dailyLogs: 'date',
      weeklyLogs: '++id, date',
      photos: '++id, date',
      settings: '++id'
    });
  }
}

export const db = new BodyTrackerDB();