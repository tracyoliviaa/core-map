import { Flame, Target, Award } from 'lucide-react';
import { useApp } from '../hooks/useApp';
import { ProgressBar } from './ProgressBar';
import { TaskItem } from './TaskItem';

export const CoreAreaCard = ({ area }) => {
  const { toggleTask } = useApp();
  const completedTasks = area.tasks.filter(t => t.completed).length;
  const totalTasks = area.tasks.length;
  const isComplete = completedTasks === totalTasks;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100 hover:shadow-xl transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`text-3xl ${area.color} w-14 h-14 rounded-xl flex items-center justify-center`}>
            {area.emoji}
          </div>
          <div>
            <h3 className="font-bold text-xl text-gray-800">{area.name}</h3>
            <p className="text-sm text-gray-500">{area.description}</p>
          </div>
        </div>
        {isComplete && <Award className="w-6 h-6 text-yellow-500" />}
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>{completedTasks} / {totalTasks} erledigt</span>
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="font-semibold">{area.streak} Tage</span>
          </div>
        </div>
        <ProgressBar completed={completedTasks} total={totalTasks} color={area.color} />
      </div>

      <div className="space-y-2">
        {area.tasks.map(task => (
          <TaskItem key={task.id} task={task} areaId={area.id} onToggle={toggleTask} />
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
        <span className="text-sm text-gray-600">Gesamtpunkte</span>
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-purple-500" />
          <span className="font-bold text-lg text-gray-800">{area.points}</span>
        </div>
      </div>
    </div>
  );
};