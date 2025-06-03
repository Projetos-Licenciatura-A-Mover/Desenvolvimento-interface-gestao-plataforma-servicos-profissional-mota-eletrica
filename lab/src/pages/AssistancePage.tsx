import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: string;
}

interface Request {
  id: number;
  reason: string;
  subject: string;
  date: string;
  messages: Message[];
}

const AssistancePage: React.FC = () => {
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [reason, setReason] = useState('');
  const [subject, setSubject] = useState('');
  const [requests, setRequests] = useState<Request[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = () => {
    if (reason && subject) {
      const newRequest = {
        id: requests.length + 1,
        reason,
        subject,
        date: new Date().toLocaleDateString(),
        messages: [{
          id: 1,
          text: subject,
          sender: 'user',
          timestamp: new Date().toLocaleTimeString()
        }]
      };
      setRequests([newRequest, ...requests]);
      setReason('');
      setSubject('');
      setShowNewRequest(false);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedRequest) {
      const message = {
        id: selectedRequest.messages.length + 1,
        text: newMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString()
      };
      
      const updatedRequest = {
        ...selectedRequest,
        messages: [...selectedRequest.messages, message]
      };

      setRequests(requests.map(req => 
        req.id === selectedRequest.id ? updatedRequest : req
      ));
      
      setSelectedRequest(updatedRequest);
      setNewMessage('');
    }
  };

  const renderChat = () => (
    <div className="flex-1 bg-white rounded-md p-4 shadow-md flex flex-col">
      <div className="flex justify-between items-center mb-4 pb-3 border-b">
        <div>
          <h2 className="font-semibold text-lg">{selectedRequest?.reason}</h2>
          <p className="text-sm text-gray-500">{selectedRequest?.date}</p>
        </div>
        <button
          onClick={() => setSelectedRequest(null)}
          className="text-gray-500 hover:text-gray-700"
        >
          Voltar
        </button>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {selectedRequest?.messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-[#333333] text-white'
                  : 'bg-gray-100'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escreva uma mensagem..."
          className="flex-1 border border-gray-300 rounded-md p-2"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
        />
        <button
          onClick={handleSendMessage}
          className="bg-[#333333] text-white p-2 rounded-md hover:bg-gray-700 transition-colors"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full p-4 space-y-4">
      <button
        onClick={() => setShowNewRequest(true)}
        className="bg-white text-black py-2 px-4 rounded-md font-semibold shadow-md w-fit"
      >
        + Enviar Pedido
      </button>

      <div className="flex gap-4 h-full">
        {/* Left side - Request History */}
        <div className="flex-1 bg-white rounded-md p-4 shadow-md overflow-auto">
          <h2 className="text-black font-semibold mb-4">Histórico de Pedidos</h2>
          <div className="space-y-2">
            {requests.map(request => (
              <div
                key={request.id}
                className="border-b border-gray-200 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setSelectedRequest(request)}
              >
                <div className="font-medium">{request.reason}</div>
                <div className="text-sm text-gray-500 mt-1">{request.date}</div>
                <div className="text-xs text-gray-400 mt-1">
                  {request.messages.length} mensagens
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Chat or New Request Form */}
        <div className="flex-1">
          {selectedRequest ? (
            renderChat()
          ) : showNewRequest ? (
            <div className="bg-white rounded-md p-4 shadow-md">
              <h2 className="text-black font-semibold mb-4">Novo Pedido</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1">Motivo:</label>
                  <input
                    type="text"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Assunto:</label>
                  <textarea
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 h-32"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleSubmit}
                    className="bg-[#333333] text-white py-2 px-6 rounded-md font-semibold hover:bg-[#444444] transition-colors"
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AssistancePage;