import { useState } from 'react';
import { Flame, Target, Award } from 'lucide-react';
import { useApp } from '../hooks/useApp';
import { ProgressBar } from './ProgressBar';
import { TaskItem } from './TaskItem';

export const CoreAreaCard = ({ area }) => {
  const { toggleTask, deleteTask, addTask } = useApp();
  const [newTask, setNewTask] = useState('');

  const completedTasks = area.tasks.filter(t => t.completed).length;
  const totalTasks = area.tasks.length;
  const isComplete = completedTasks === totalTasks;

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    addTask(area.id, newTask.trim());
    setNewTask('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-2 border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`text-3xl ${area.color} w-14 h-14 rounded-xl flex items-center justify-center`}
          >
            {area.emoji}
          </div>
          <div>
            <h3 className="font-bold text-xl text-gray-800 dark:text-gray-100">
              {area.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {area.description}
            </p>
          </div>
        </div>
        {isComplete && <Award className="w-6 h-6 text-yellow-500" />}
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
          <span>{completedTasks} / {totalTasks} erledigt</span>
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="font-semibold">{area.streak} Tage</span>
          </div>
        </div>
        <ProgressBar completed={completedTasks} total={totalTasks} color={area.color} />
      </div>

      <div className="space-y-2">
        {area.tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            areaId={area.id}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
      </div>

      <div className="flex gap-2 mt-3">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && handleAddTask()}
          placeholder="Neue Aufgabe..."
          className="flex-1 text-sm border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-400"
        />
        <button
          onClick={handleAddTask}
          className="px-3 py-2 bg-purple-500 text-white text-sm rounded-lg hover:bg-purple-600 transition-colors"
        >
          +
        </button>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <span className="text-sm text-gray-600 dark:text-gray-300">Gesamtpunkte</span>
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-purple-500" />
          <span className="font-bold text-lg text-gray-800 dark:text-gray-100">
            {area.points}
          </span>
        </div>
      </div>
    </div>
  );
};