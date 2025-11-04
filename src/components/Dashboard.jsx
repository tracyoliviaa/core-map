import { useApp } from '../hooks/useApp';
import { DashboardHeader } from './DashboardHeader';
import { CoreAreaCard } from './CoreAreaCard';

export const Dashboard = () => {
  const { areas } = useApp();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map(area => (
            <CoreAreaCard key={area.id} area={area} />
          ))}
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Neue Aufgaben werden täglich um Mitternacht zurückgesetzt</p>
        </div>
      </div>
    </div>
  );
};