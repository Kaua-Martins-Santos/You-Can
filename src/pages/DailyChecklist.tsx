import { db } from '../db/database';
import { format } from 'date-fns';
import { useLiveQuery } from 'dexie-react-hooks';
import { CheckCircle2, Circle } from 'lucide-react';

export function DailyChecklist() {
  const today = format(new Date(), 'yyyy-MM-dd');
  const todaysLog = useLiveQuery(() => db.dailyLogs.get(today), [today]);

  const toggleTask = async (task: keyof Omit<typeof todaysLog, 'date'>) => {
    const log = todaysLog || { date: today, trained: false, water3L: false, protein3x: false, sleep6h: false };
    // @ts-ignore - Forçando a tipagem booleana dinâmica
    log[task] = !log[task];
    await db.dailyLogs.put(log);
  };

  const tasks = [
    { key: 'trained', label: 'Treino Realizado', desc: 'Siga a divisão do dia' },
    { key: 'water3L', label: '3 Litros de Água', desc: 'Mantenha a hidratação' },
    { key: 'protein3x', label: 'Proteína em 3 Refeições', desc: 'Foco na dieta' },
    { key: 'sleep6h', label: 'Dormiu +6h30', desc: 'Recuperação muscular' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="mt-2">
        <h1 className="text-2xl font-bold tracking-tight">Checklist de Hoje</h1>
        <p className="text-gray-400 text-sm">{format(new Date(), 'dd/MM/yyyy')}</p>
      </header>

      <div className="space-y-3">
        {tasks.map(({ key, label, desc }) => {
          const isDone = todaysLog?.[key as keyof typeof todaysLog];
          return (
            <button
              key={key}
              onClick={() => toggleTask(key as any)}
              className={`w-full flex items-center p-4 rounded-2xl border transition-all duration-300 ${
                isDone 
                  ? 'bg-accent/10 border-accent/40 text-white' 
                  : 'bg-dark border-gray-800 text-gray-400 hover:border-gray-600'
              }`}
            >
              <div className="mr-4">
                {isDone ? <CheckCircle2 className="text-accent" size={28} /> : <Circle size={28} />}
              </div>
              <div className="text-left flex-1">
                <h3 className={`font-semibold ${isDone ? 'text-accent' : 'text-gray-200'}`}>{label}</h3>
                <p className="text-xs opacity-70 mt-1">{desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}