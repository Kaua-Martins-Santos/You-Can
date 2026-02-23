import { CheckCircle2, Circle } from 'lucide-react';
import { useState } from 'react';

export function WorkoutPlan() {
  const [completed, setCompleted] = useState<Record<number, boolean>>({});

  const split = [
    { day: 1, name: 'Segunda', focus: 'Peito + Tríceps' },
    { day: 2, name: 'Terça', focus: 'Costas + Bíceps' },
    { day: 3, name: 'Quarta', focus: 'Descanso Ativo / Cardio' },
    { day: 4, name: 'Quinta', focus: 'Ombro + Abdômen' },
    { day: 5, name: 'Sexta', focus: 'Posterior + Core leve' },
    { day: 6, name: 'Sábado', focus: 'Descanso' },
    { day: 0, name: 'Domingo', focus: 'Descanso' },
  ];

  const today = new Date().getDay(); // 0 é Domingo

  const toggleDay = (day: number) => {
    setCompleted(prev => ({ ...prev, [day]: !prev[day] }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold">Plano de Treino</h2>
      <div className="space-y-3">
        {split.map((workout) => {
          const isToday = workout.day === today;
          const isDone = completed[workout.day];

          return (
            <div 
              key={workout.day}
              onClick={() => toggleDay(workout.day)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                isToday ? 'border-accent bg-accent/5' : 'border-gray-800 bg-dark'
              } ${isDone ? 'opacity-50' : ''}`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className={`font-bold ${isToday ? 'text-accent' : 'text-gray-200'}`}>
                    {workout.name} {isToday && '(Hoje)'}
                  </h3>
                  <p className="text-sm text-gray-400">{workout.focus}</p>
                </div>
                {isDone ? <CheckCircle2 className="text-accent" /> : <Circle className="text-gray-600" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}