import { createContext, useState, useEffect } from 'react';
import { INITIAL_AREAS } from '../data/coreAreas';

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [areas, setAreas] = useState(() => {
    try {
      const saved = localStorage.getItem('coreMapData');
      return saved ? JSON.parse(saved) : INITIAL_AREAS;
    } catch (error) {
      console.error('Fehler beim Laden:', error);
      return INITIAL_AREAS;
    }
  });

  const [lastVisit, setLastVisit] = useState(() => {
    return localStorage.getItem('lastVisit') || new Date().toDateString();
  });

  useEffect(() => {
    try {
      localStorage.setItem('coreMapData', JSON.stringify(areas));
    } catch (error) {
      console.error('Fehler beim Speichern:', error);
    }
  }, [areas]);

  useEffect(() => {
    const today = new Date().toDateString();
    if (lastVisit !== today) {
      resetDailyTasks();
      setLastVisit(today);
      localStorage.setItem('lastVisit', today);
    }
  }, [lastVisit]);

  const resetDailyTasks = () => {
    setAreas(prevAreas => 
      prevAreas.map(area => ({
        ...area,
        tasks: area.tasks.map(task => ({ 
          ...task, 
          completed: false 
        }))
      }))
    );
  };

  const toggleTask = (areaId, taskId) => {
    setAreas(prevAreas => 
      prevAreas.map(area => {
        if (area.id !== areaId) return area;

        const updatedTasks = area.tasks.map(task => 
          task.id === taskId 
            ? { ...task, completed: !task.completed } 
            : task
        );

        const completedCount = updatedTasks.filter(t => t.completed).length;
        const allCompleted = completedCount === updatedTasks.length;
        const wasAllCompleted = area.tasks.every(t => t.completed);

        return {
          ...area,
          tasks: updatedTasks,
          points: area.points + (allCompleted && !wasAllCompleted ? 10 : 0),
          streak: allCompleted && !wasAllCompleted ? area.streak + 1 : area.streak
        };
      })
    );
  };

  const resetProgress = () => {
    setAreas(INITIAL_AREAS);
    localStorage.removeItem('coreMapData');
    localStorage.removeItem('lastVisit');
    setLastVisit(new Date().toDateString());
  };

  const value = {
    areas,
    toggleTask,
    resetProgress
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};