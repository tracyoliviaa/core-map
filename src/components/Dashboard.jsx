import { useState } from 'react';
import { useApp } from '../hooks/useApp';
import { DashboardHeader } from './DashboardHeader';
import { CoreAreaCard } from './CoreAreaCard';

export const Dashboard = () => {
  const { areas, addArea } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: '',
    emoji: '⭐',
    description: '',
    color: 'bg-violet-500',
  });

  const handleAdd = () => {
    if (!form.name.trim()) return;
    addArea(form.name, form.emoji, form.description, form.color);
    setShowForm(false);
    setForm({
      name: '',
      emoji: '⭐',
      description: '',
      color: 'bg-violet-500',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader />

        {/* 1. „Neue Area hinzufügen“‑Button */}
        <button
          onClick={() => setShowForm(true)}
          className="mt-6 w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-500 dark:text-gray-400 hover:border-purple-400 hover:text-purple-500 transition-colors text-sm font-medium"
        >
          + Neue Area hinzufügen
        </button>

        {/* 2. Formular mit Grid (nur wenn showForm === true) */}
        {showForm && (
          <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-2 border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-4">
              Neue Area
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <input
                placeholder="Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm"
              />
              <input
                placeholder="Emoji"
                value={form.emoji}
                onChange={(e) =>
                  setForm({ ...form, emoji: e.target.value })
                }
                className="border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm"
              />
              <input
                placeholder="Beschreibung"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="col-span-2 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm hover:bg-purple-600"
              >
                Hinzufügen
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm"
              >
                Abbrechen
              </button>
            </div>
          </div>
        )}

        {/* 3. Area‑Karten */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area) => (
            <CoreAreaCard key={area.id} area={area} />
          ))}
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Neue Aufgaben werden täglich um Mitternacht zurückgesetzt.</p>
        </div>
      </div>
    </div>
  );
};