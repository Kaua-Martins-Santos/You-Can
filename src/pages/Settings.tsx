import { db } from '../db/database';
import { Download, Upload as UploadIcon } from 'lucide-react';

export function Settings() {
  const exportData = async () => {
    const data = {
      dailyLogs: await db.dailyLogs.toArray(),
      weeklyLogs: await db.weeklyLogs.toArray(),
      photos: await db.photos.toArray(),
    };
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tracker-backup-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
  };

  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json.dailyLogs) await db.dailyLogs.bulkPut(json.dailyLogs);
        if (json.weeklyLogs) await db.weeklyLogs.bulkPut(json.weeklyLogs);
        if (json.photos) await db.photos.bulkPut(json.photos);
        alert('Dados importados com sucesso!');
      } catch (error) {
        alert('Erro ao importar arquivo.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold">Configurações e Dados</h2>

      <div className="bg-dark p-6 rounded-2xl border border-gray-800 space-y-4">
        <h3 className="text-lg font-semibold text-gray-300">Backup Offline</h3>
        <p className="text-sm text-gray-500 mb-4">Como o app não tem servidor, você é dono dos seus dados. Faça backups regulares.</p>
        
        <button onClick={exportData} className="w-full bg-darker border border-gray-700 hover:border-accent text-white font-bold py-3 rounded-lg flex justify-center items-center gap-2 transition">
          <Download size={20} /> Exportar Backup (JSON)
        </button>

        <label className="w-full bg-darker border border-gray-700 hover:border-accent text-white font-bold py-3 rounded-lg flex justify-center items-center gap-2 transition cursor-pointer">
          <UploadIcon size={20} /> Importar Backup
          <input type="file" accept=".json" className="hidden" onChange={importData} />
        </label>
      </div>
    </div>
  );
}