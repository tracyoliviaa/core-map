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

  // API Load mit Fallback
  useEffect(() => {
    fetch('http://localhost:3001/areas')
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) setAreas(data);
      })
      .catch(() => console.log('API nicht erreichbar, nutze localStorage'));
  }, []);

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
          completed: false,
        })),
      }))
    );
  };

  // 🆕 API ToggleTask mit lokal Fallback
  const toggleTask = async (areaId, taskId) => {
    try {
      await fetch(`http://localhost:3001/areas/${areaId}/tasks/${taskId}`, {
        method: 'PATCH'
      });
    } catch (error) {
      console.log('API Toggle fehlgeschlagen, lokal updaten');
    }
    
    // Immer lokal updaten (Points/Streak)
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
          streak: allCompleted && !wasAllCompleted ? area.streak + 1 : area.streak,
        };
      })
    );
  };

  // 🆕 API DeleteTask mit lokal Fallback
  const deleteTask = async (areaId, taskId) => {
    try {
      await fetch(`http://localhost:3001/areas/${areaId}/tasks/${taskId}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.log('API Delete fehlgeschlagen, lokal updaten');
    }
    
    setAreas(prevAreas =>
      prevAreas.map(area =>
        area.id !== areaId ? area : {
          ...area,
          tasks: area.tasks.filter(t => t.id !== taskId),
        }
      )
    );
  };

  // 🆕 API AddTask mit lokal Fallback
  const addTask = async (areaId, taskText) => {
    try {
      const res = await fetch(`http://localhost:3001/areas/${areaId}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: taskText })
      });
      const newTask = await res.json();
      // API Antwort nutzen
      setAreas(prevAreas =>
        prevAreas.map(area =>
          area.id !== areaId ? area : {
            ...area,
            tasks: [...area.tasks, newTask]
          }
        )
      );
    } catch (error) {
      console.log('API Add fehlgeschlagen, lokal erstellen');
      // Lokal Fallback
      setAreas(prevAreas =>
        prevAreas.map(area =>
          area.id !== areaId ? area : {
            ...area,
            tasks: [
              ...area.tasks,
              {
                id: `${areaId}-${Date.now()}`,
                text: taskText,
                completed: false,
              },
            ],
          }
        )
      );
    }
  };

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const resetProgress = () => {
    setAreas(INITIAL_AREAS);
    localStorage.removeItem('coreMapData');
    localStorage.removeItem('lastVisit');
    setLastVisit(new Date().toDateString());
  };

  const addArea = (name, emoji, description, color) => {
    const id = name.toLowerCase().replace(/\s+/g, '-');
    setAreas(prev => [
      ...prev,
      {
        id,
        name,
        emoji,
        description,
        color,
        tasks: [],
        points: 0,
        streak: 0,
      },
    ]);
  };

  // LocalStorage Sync
  useEffect(() => {
    localStorage.setItem('coreMapData', JSON.stringify(areas));
  }, [areas]);

  const value = {
    areas,
    toggleTask,     // 🆕 API + lokal
    resetProgress,
    deleteTask,     // 🆕 API + lokal  
    addTask,        // 🆕 API + lokal
    darkMode,
    toggleDarkMode,
    addArea,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};cd 