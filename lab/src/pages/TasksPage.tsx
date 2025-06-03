import React, { useState } from 'react';
import { MapPin, Clock, AlertCircle, Plus, X, Filter } from 'lucide-react';

interface Task {
  id: number;
  location: string;
  address: string;
  date: string;
  priority: 'ALTA' | 'MÉDIA' | 'BAIXA';
  type: 'Entrega' | 'Recolha';
  time: string;
  availableTime: string;
  status: 'POR CONCLUIR' | 'CONCLUÍDO';
}

interface NewTask {
  location: string;
  address: string;
  date: string;
  priority: 'ALTA' | 'MÉDIA' | 'BAIXA';
  type: 'Entrega' | 'Recolha';
  time: string;
  availableTimeStart: string;
  availableTimeEnd: string;
}

const TasksPage: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState<'ALTA' | 'MÉDIA' | 'BAIXA' | 'ALL'>('ALL');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [newTask, setNewTask] = useState<NewTask>({
    location: '',
    address: '',
    date: '',
    priority: 'MÉDIA',
    type: 'Entrega',
    time: '',
    availableTimeStart: '',
    availableTimeEnd: '',
  });
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      location: 'UTAD - ECT - Polo I',
      address: 'Quinta dos Prados, 5100-801, Vila Real',
      date: '16/06/2025',
      priority: 'ALTA',
      type: 'Entrega',
      time: '12:00h',
      availableTime: '9:00h às 12:00h',
      status: 'POR CONCLUIR'
    },
    {
      id: 2,
      location: 'Entrega no ZOO',
      address: 'Quinta do ZOO, 5234-122, Vila Real',
      date: '16/06/2025',
      priority: 'MÉDIA',
      type: 'Entrega',
      time: '14:30h',
      availableTime: '14:00h às 15:00h',
      status: 'POR CONCLUIR'
    },
    {
      id: 3,
      location: 'Lidl',
      address: 'Avenida 1º Maio, 5521-332, Vila Real',
      date: '16/06/2025',
      priority: 'BAIXA',
      type: 'Recolha',
      time: '16:00h',
      availableTime: '15:00h às 17:00h',
      status: 'POR CONCLUIR'
    }
  ]);

  const handleAddTask = () => {
    const task: Task = {
      id: tasks.length + 1,
      ...newTask,
      availableTime: `${newTask.availableTimeStart} às ${newTask.availableTimeEnd}`,
      status: 'POR CONCLUIR'
    };
    setTasks([...tasks, task]);
    setShowNewTaskForm(false);
    setNewTask({
      location: '',
      address: '',
      date: '',
      priority: 'MÉDIA',
      type: 'Entrega',
      time: '',
      availableTimeStart: '',
      availableTimeEnd: '',
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'ALTA':
        return 'bg-red-500';
      case 'MÉDIA':
        return 'bg-orange-500';
      case 'BAIXA':
        return 'bg-green-600';
      default:
        return 'bg-gray-500';
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesPriority = selectedPriority === 'ALL' || task.priority === selectedPriority;
    const matchesDate = !selectedDate || task.date === selectedDate;
    return matchesPriority && matchesDate;
  });

  const renderFilters = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-semibold">Filtros</h3>
          <button onClick={() => setShowFilters(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prioridade</label>
            <select
              className="w-full border border-gray-300 rounded-md p-2"
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value as 'ALTA' | 'MÉDIA' | 'BAIXA' | 'ALL')}
            >
              <option value="ALL">Todas</option>
              <option value="ALTA">Alta</option>
              <option value="MÉDIA">Média</option>
              <option value="BAIXA">Baixa</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md p-2"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          <button
            className="w-full px-4 py-2 bg-[#333333] text-white rounded-lg font-medium mt-4"
            onClick={() => setShowFilters(false)}
          >
            Aplicar Filtros
          </button>
        </div>
      </div>
    </div>
  );

  const renderTaskCard = (task: Task) => (
    <div 
      key={task.id}
      className="bg-white rounded-lg shadow-md mb-3 cursor-pointer"
      onClick={() => setSelectedTask(task)}
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full mt-1.5" style={{ backgroundColor: '#333' }} />
            <h3 className="font-medium">{task.location}</h3>
          </div>
          <div className={`px-3 py-1 text-white text-sm rounded-full ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
          <MapPin size={16} />
          <span>{task.address}</span>
        </div>
        <div className="text-sm text-gray-500">
          {task.date}
        </div>
      </div>
    </div>
  );

  const renderNewTaskForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-semibold">Nova Tarefa</h3>
          <button onClick={() => setShowNewTaskForm(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Local</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2"
              value={newTask.location}
              onChange={(e) => setNewTask({...newTask, location: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Morada</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2"
              value={newTask.address}
              onChange={(e) => setNewTask({...newTask, address: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md p-2"
              value={newTask.date}
              onChange={(e) => setNewTask({...newTask, date: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prioridade</label>
            <select
              className="w-full border border-gray-300 rounded-md p-2"
              value={newTask.priority}
              onChange={(e) => setNewTask({...newTask, priority: e.target.value as 'ALTA' | 'MÉDIA' | 'BAIXA'})}
            >
              <option value="ALTA">Alta</option>
              <option value="MÉDIA">Média</option>
              <option value="BAIXA">Baixa</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
            <select
              className="w-full border border-gray-300 rounded-md p-2"
              value={newTask.type}
              onChange={(e) => setNewTask({...newTask, type: e.target.value as 'Entrega' | 'Recolha'})}
            >
              <option value="Entrega">Entrega</option>
              <option value="Recolha">Recolha</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hora Prevista</label>
            <input
              type="time"
              className="w-full border border-gray-300 rounded-md p-2"
              value={newTask.time}
              onChange={(e) => setNewTask({...newTask, time: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hora Início</label>
              <input
                type="time"
                className="w-full border border-gray-300 rounded-md p-2"
                value={newTask.availableTimeStart}
                onChange={(e) => setNewTask({...newTask, availableTimeStart: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hora Fim</label>
              <input
                type="time"
                className="w-full border border-gray-300 rounded-md p-2"
                value={newTask.availableTimeEnd}
                onChange={(e) => setNewTask({...newTask, availableTimeEnd: e.target.value})}
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              className="flex-1 px-4 py-2 bg-gray-200 rounded-lg text-gray-800 font-medium"
              onClick={() => setShowNewTaskForm(false)}
            >
              Cancelar
            </button>
            <button
              className="flex-1 px-4 py-2 bg-[#333333] text-white rounded-lg font-medium"
              onClick={handleAddTask}
            >
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTaskDetails = (task: Task) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">{task.location}</h2>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin size={16} />
                <span className="text-sm">{task.address}</span>
              </div>
            </div>
            <div className={`px-3 py-1 text-white text-sm rounded-full ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <Clock size={20} className="text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Hora Prevista</p>
                <p className="font-medium">{task.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <AlertCircle size={20} className="text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Hora disponível para receção</p>
                <p className="font-medium">{task.availableTime}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-6">
              <div className="flex justify-between items-center">
                <span className="text-sm">Tipo:</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">{task.type}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Estado:</span>
                <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">
                  {task.status}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              className="w-full px-4 py-2 bg-gray-200 rounded-lg text-gray-800 font-medium"
              onClick={() => setSelectedTask(null)}
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-[#717171] p-4">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setShowNewTaskForm(true)}
          className="bg-[#333333] text-white py-2 px-4 rounded-md font-medium flex items-center gap-2"
        >
          <Plus size={20} />
          Adicionar Tarefa
        </button>
        <button
          onClick={() => setShowFilters(true)}
          className="bg-[#333333] text-white py-2 px-4 rounded-md font-medium flex items-center gap-2"
        >
          <Filter size={20} />
          Filtros
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredTasks.map(renderTaskCard)}
      </div>
      {selectedTask && renderTaskDetails(selectedTask)}
      {showNewTaskForm && renderNewTaskForm()}
      {showFilters && renderFilters()}
    </div>
  );
};

export default TasksPage;