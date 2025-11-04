import { CheckCircle2, Circle } from 'lucide-react';

export const TaskItem = ({ task, areaId, onToggle }) => {
  const handleClick = () => {
    onToggle(areaId, task.id);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        w-full flex items-center gap-3 p-3 rounded-lg 
        border-2 transition-all duration-200
        ${task.completed 
          ? 'border-green-500 bg-green-50' 
          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
        }
      `}
      aria-pressed={task.completed}
    >
      {task.completed ? (
        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
      ) : (
        <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
      )}
      <span 
        className={`
          text-left flex-1
          ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}
        `}
      >
        {task.text}
      </span>
    </button>
  );
};