import { CheckCircle2, Circle, Trash2 } from 'lucide-react';

export const TaskItem = ({ task, areaId, onToggle, onDelete }) => {
  const handleToggle = () => {
    onToggle(areaId, task.id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(areaId, task.id);
  };

  return (
    <div
      onClick={handleToggle}
      className={`
        w-full flex items-center gap-3 p-3 rounded-lg
        border-2 cursor-pointer transition-all duration-200
        ${task.completed
          ? 'border-green-500 bg-green-50 dark:bg-green-900 dark:border-green-600'
          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 hover:shadow-sm dark:hover:border-gray-600'
        }
      `}
      role="button"
      tabIndex={0}
      aria-pressed={task.completed}
      onKeyUp={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleToggle();
      }}
    >
      {task.completed ? (
        <CheckCircle2 className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0" />
      ) : (
        <Circle className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
      )}

      <span
        className={`
          text-left flex-1
          ${task.completed
            ? 'line-through text-gray-500 dark:text-gray-400'
            : 'text-gray-800 dark:text-gray-100'
          }
        `}
      >
        {task.text}
      </span>

      <button
        type="button"
        onClick={handleDelete}
        className="ml-auto p-1 text-gray-400 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
        aria-label="Aufgabe löschen"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};