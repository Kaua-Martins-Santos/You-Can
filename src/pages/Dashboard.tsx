import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/database';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, 
  LineElement, Title, Tooltip, Filler 
} from 'chart.js';
import { Activity, Flame, TrendingDown } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler);

export function Dashboard() {
  const logs = useLiveQuery(() => db.weeklyLogs.orderBy('date').toArray());
  const dailyLogs = useLiveQuery(() => db.dailyLogs.toArray());

  const currentWeight = logs?.length ? logs[logs.length - 1].weight : 0;
  const initialWeight = logs?.length ? logs[0].weight : 0;
  const weightDiff = currentWeight - initialWeight;

  const streak = dailyLogs?.filter(log => log.trained && log.water3L && log.protein3x && log.sleep6h).length || 0;

  const chartData = {
    labels: logs?.map(log => log.date.slice(5)) || [], // Pega apenas MM-DD
    datasets: [
      {
        fill: true,
        label: 'Peso (kg)',
        data: logs?.map(log => log.weight) || [],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { display: false }, x: { grid: { display: false } } },
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="flex justify-between items-center mt-2">
        <h1 className="text-2xl font-bold tracking-tight">Resumo Geral</h1>
        <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700">
          <span className="text-sm font-bold text-accent">NJ</span>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-dark p-4 rounded-2xl border border-gray-800 shadow-lg">
          <div className="flex items-center gap-2 text-gray-400 mb-2">
            <Activity size={16} /> <span className="text-xs uppercase tracking-wider">Peso Atual</span>
          </div>
          <div className="text-3xl font-light">{currentWeight > 0 ? `${currentWeight} kg` : '--'}</div>
          <div className={`text-xs mt-1 font-medium ${weightDiff <= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {weightDiff > 0 ? '+' : ''}{weightDiff.toFixed(1)} kg total
          </div>
        </div>

        <div className="bg-dark p-4 rounded-2xl border border-gray-800 shadow-lg">
          <div className="flex items-center gap-2 text-gray-400 mb-2">
            <Flame size={16} className="text-orange-500" /> <span className="text-xs uppercase tracking-wider">Dias Perfeitos</span>
          </div>
          <div className="text-3xl font-light">{streak} <span className="text-lg text-gray-600">/ 90</span></div>
          <div className="text-xs mt-1 text-gray-400">Consistência total</div>
        </div>
      </div>

      <div className="bg-dark p-4 rounded-2xl border border-gray-800 shadow-lg">
        <h3 className="text-sm text-gray-400 mb-4 flex items-center gap-2">
          <TrendingDown size={16} /> Evolução de Peso
        </h3>
        <div className="h-48">
          {logs && logs.length > 0 ? (
            <Line data={chartData} options={chartOptions} />
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-gray-600 text-sm">Adicione seu peso em "Peso" para ver o gráfico.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}