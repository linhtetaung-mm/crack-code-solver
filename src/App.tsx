import { useState } from 'react';
import CrackCode from './crack-code/CrackCode';
import AdvancedSolver from './crack-code/AdvanceCodeSolver';
import ReactMarkdown from 'react-markdown';

// Vite magic: "?raw" tells Vite to load the file contents directly as a text string
import rulesMarkdown from './crack-code/rules.md?raw';
import techMarkdown from './crack-code/crackcodesolver.md?raw';

function App() {
  const [activeTab, setActiveTab] = useState<'game' | 'solver'>('game');
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 relative min-h-screen">
      
      {/* Top Header & Info Row */}
      <div className="flex justify-between items-center max-w-md mx-auto mb-6">
        {/* Navigation Switch */}
        <div className="flex bg-gray-200 p-1 rounded-xl flex-1 mr-4">
          <button
            onClick={() => setActiveTab('game')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === 'game' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🎮 Crack Code Game
          </button>
          <button
            onClick={() => setActiveTab('solver')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === 'solver' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🤖 Advanced Solver
          </button>
        </div>

        {/* Floating Help Button */}
        <button
          onClick={() => setIsHelpOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium rounded-xl shadow transition-all cursor-pointer"
        >
          ❓ How to Play
        </button>
      </div>

      {/* Component Persistent Container wrapper */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 md:p-8 shadow-sm">
        <div className={activeTab === 'game' ? 'block' : 'hidden'}>
          <CrackCode />
        </div>
        <div className={activeTab === 'solver' ? 'block' : 'hidden'}>
          <AdvancedSolver />
        </div>
      </div>

      {/* The Accessible Modal Overlay */}
      {isHelpOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[80vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Puzzle Instructions</h2>
              <button 
                onClick={() => setIsHelpOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            {/* Scrollable Content Pane with Tailwind Prose Styles */}
            <div className="p-6 overflow-y-auto text-left">
              <article className="prose prose-slate max-w-none prose-headings:font-bold">
                <ReactMarkdown>{rulesMarkdown}</ReactMarkdown>
                <hr/><br/>
                <ReactMarkdown>{techMarkdown}</ReactMarkdown>
              </article>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl text-right">
              <button
                onClick={() => setIsHelpOpen(false)}
                className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2 text-sm font-medium rounded-xl cursor-pointer"
              >
                Got it, let's play!
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default App;


