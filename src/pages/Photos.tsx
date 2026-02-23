import { useState } from 'react';
import { db } from '../db/database';
import { useLiveQuery } from 'dexie-react-hooks';
import { format } from 'date-fns';
import { Upload, Trash2 } from 'lucide-react';

export function Photos() {
  const photos = useLiveQuery(() => db.photos.orderBy('date').reverse().toArray());

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      await db.photos.add({
        date: format(new Date(), 'yyyy-MM-dd HH:mm'),
        imageBase64: base64String
      });
    };
    reader.readAsDataURL(file);
  };

  const deletePhoto = async (id: number) => {
    if(confirm('Apagar foto?')) await db.photos.delete(id);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold">Progresso Visual</h2>

      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-700 border-dashed rounded-2xl cursor-pointer hover:border-accent hover:bg-dark transition">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className="w-8 h-8 mb-3 text-gray-400" />
          <p className="mb-2 text-sm text-gray-400"><span className="font-semibold text-accent">Clique</span> para adicionar foto</p>
        </div>
        <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
      </label>

      <div className="grid grid-cols-2 gap-4 mt-6">
        {photos?.map((photo) => (
          <div key={photo.id} className="relative group rounded-xl overflow-hidden border border-gray-800">
            <img src={photo.imageBase64} alt="Progresso" className="object-cover w-full h-48" />
            <div className="absolute bottom-0 w-full bg-black/60 p-2 text-xs text-white flex justify-between items-center">
              <span>{photo.date}</span>
              <button onClick={() => deletePhoto(photo.id!)} className="text-red-400 hover:text-red-300">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}