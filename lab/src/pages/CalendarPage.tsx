import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Clock } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  priority: 'alta' | 'media' | 'baixa';
  time: string;
  location: string;
  address: string;
  type: 'Entrega' | 'Recolha';
}

interface DayProps {
  day: number;
  events?: Event[];
  isPast: boolean;
}

const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 1)); // June 2025
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const monthName = currentDate.toLocaleString('pt-BR', { month: 'long' });
  const year = currentDate.getFullYear();

  // Example events data
  const eventsData: Record<number, Event[]> = {
    16: [
      { 
        id: 1, 
        title: 'UTAD - ECT - Polo I', 
        priority: 'alta', 
        time: '12:00h',
        location: 'UTAD - ECT - Polo I',
        address: 'Quinta dos Prados, 5100-801, Vila Real',
        type: 'Entrega'
      },
      { 
        id: 2, 
        title: 'Entrega no ZOO', 
        priority: 'media', 
        time: '14:30h',
        location: 'Entrega no ZOO',
        address: 'Quinta do ZOO, 5234-122, Vila Real',
        type: 'Entrega'
      },
      {
        id: 3,
        title: 'Lidl',
        priority: 'baixa',
        time: '16:00h',
        location: 'Lidl',
        address: 'Avenida 1º Maio, 5521-332, Vila Real',
        type: 'Recolha'
      }
    ]
  };

  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const isPastDate = (day: number) => {
    const today = new Date();
    const dateToCheck = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return dateToCheck < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  const renderDay = ({ day, events, isPast }: DayProps) => (
    <div 
      className={`h-16 border border-gray-200 p-1 relative cursor-pointer ${
        isPast ? 'bg-gray-100' : 'hover:bg-gray-50'
      }`}
      onClick={() => setSelectedDay(day)}
    >
      <span className={`text-sm ${isPast ? 'text-gray-500' : 'text-gray-900'}`}>
        {day}
      </span>
      {events && (
        <div className="absolute bottom-1 left-1 flex gap-0.5">
          {events.map(event => (
            <div
              key={event.id}
              className={`w-2 h-2 rounded-full ${
                event.priority === 'alta'
                  ? 'bg-red-500'
                  : event.priority === 'media'
                  ? 'bg-orange-500'
                  : 'bg-green-500'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-3 border-b">
        <button onClick={handlePreviousMonth}>
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold capitalize">
          {`${monthName} De ${year}`}
        </h2>
        <button onClick={handleNextMonth}>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 p-2">
        <div className="grid grid-cols-7 border border-gray-200 rounded-lg overflow-hidden">
          {/* Week days */}
          {weekDays.map((day) => (
            <div key={day} className="p-2 text-center font-semibold text-sm border-b border-r border-gray-200 last:border-r-0 bg-gray-50">
              {day}
            </div>
          ))}

          {/* Empty cells */}
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} className="border-r border-b border-gray-200 last:border-r-0 bg-gray-50" />
          ))}

          {/* Calendar days */}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const past = isPastDate(day);
            return (
              <div key={day} className="border-r border-b border-gray-200 last:border-r-0">
                {renderDay({ day, events: eventsData[day], isPast: past })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Priority Legend */}
      <div className="p-2 border-t flex justify-center gap-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <span>Alta</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-orange-500" />
          <span>Média</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span>Baixa</span>
        </div>
      </div>

      {/* Events Modal */}
      {selectedDay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-semibold">Eventos do Dia {selectedDay}</h3>
              <button onClick={() => setSelectedDay(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              {eventsData[selectedDay] ? (
                <div className="space-y-4">
                  {eventsData[selectedDay].map(event => (
                    <div key={event.id} className="border-b pb-3">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{event.title}</h4>
                          <p className="text-sm text-gray-600">{event.address}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          event.priority === 'alta'
                            ? 'bg-red-100 text-red-800'
                            : event.priority === 'media'
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {event.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{event.time}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center">Sem eventos para este dia</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;