import { CheckCircle2, TrendingUp, Flame } from 'lucide-react';
import { useApp } from '../hooks/useApp';

export const DashboardHeader = () => {
  const { areas, resetProgress } = useApp();
  const totalCompleted = areas.reduce((sum, area) => 
    sum + area.tasks.filter(t => t.completed).length, 0
  );
  const totalTasks = areas.reduce((sum, area) => sum + area.tasks.length, 0);
  const totalPoints = areas.reduce((sum, area) => sum + area.points, 0);

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-2xl shadow-xl mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">CoreMap</h1>
          <p className="text-purple-100">Deine Interessen im Gleichgewicht</p>
        </div>
        <button
          onClick={resetProgress}
          className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm transition-all"
        >
          Zurücksetzen
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/10 backdrop-blur rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm opacity-90">Aufgaben heute</span>
          </div>
          <p className="text-3xl font-bold">{totalCompleted} / {totalTasks}</p>
        </div>

        <div className="bg-white/10 backdrop-blur rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm opacity-90">Gesamtpunkte</span>
          </div>
          <p className="text-3xl font-bold">{totalPoints}</p>
        </div>

        <div className="bg-white/10 backdrop-blur rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Flame className="w-5 h-5" />
            <span className="text-sm opacity-90">Beste Streak</span>
          </div>
          <p className="text-3xl font-bold">{Math.max(...areas.map(a => a.streak), 0)} Tage</p>
        </div>
      </div>
    </div>
  );
};