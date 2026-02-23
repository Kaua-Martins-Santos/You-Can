import { useState } from 'react';
import { db } from '../db/database';
import { format } from 'date-fns';
import { Save } from 'lucide-react';

export function WeeklyLog() {
  const [weight, setWeight] = useState('');
  const [energy, setEnergy] = useState('5');
  const [notes, setNotes] = useState('');

  const handleSave = async () => {
    if (!weight) return;
    await db.weeklyLogs.add({
      date: format(new Date(), 'yyyy-MM-dd'),
      weight: parseFloat(weight),
      energy: parseInt(energy),
      notes
    });
    setWeight(''); setNotes(''); setEnergy('5');
    alert('Registro salvo com sucesso!');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold">Check-in Semanal</h2>
      
      <div className="bg-dark p-6 rounded-2xl border border-gray-800 space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Peso (kg)</label>
          <input 
            type="number" step="0.1" value={weight} onChange={e => setWeight(e.target.value)}
            className="w-full bg-darker border border-gray-700 rounded-lg p-3 text-white focus:border-accent focus:outline-none"
            placeholder="Ex: 80.5"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Nível de Energia (0-10): {energy}</label>
          <input 
            type="range" min="0" max="10" value={energy} onChange={e => setEnergy(e.target.value)}
            className="w-full accent-accent"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Observações (Opcional)</label>
          <textarea 
            value={notes} onChange={e => setNotes(e.target.value)}
            className="w-full bg-darker border border-gray-700 rounded-lg p-3 text-white focus:border-accent focus:outline-none h-24"
            placeholder="Como foi a semana?"
          />
        </div>

        <button 
          onClick={handleSave}
          className="w-full bg-accent hover:bg-blue-600 text-white font-bold py-3 rounded-lg flex justify-center items-center gap-2 transition"
        >
          <Save size={20} /> Salvar Check-in
        </button>
      </div>
    </div>
  );
}