// src/components/ResultsPage.tsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Link as LinkIcon, X } from 'lucide-react';

// --- This is the new line for handling deployment environments ---
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000';


// --- Interfaces matching the backend structure ---
interface Source {
  quote: string;
  url: string;
}

interface PersonaValue {
  value: string | number;
  sources: Source[];
}

interface Trait {
    name: string;
    active: boolean;
    sources: Source[];
}

interface Motivation {
    name: string;
    value: number;
    sources: Source[];
}

interface Personality {
    name: string;
    value: number;
    sources: Source[];
}

interface PersonaData {
  username: string;
  summaryQuote: PersonaValue;
  profileImage: string;
  profileInfo: {
    age: PersonaValue;
    occupation: PersonaValue;
    status: PersonaValue;
    location: PersonaValue;
    tier: PersonaValue;
    archetype: PersonaValue;
  };
  traits: Trait[];
  motivations: Motivation[];
  personality: Personality[];
  behaviors: PersonaValue[];
  frustrations: PersonaValue[];
  goals: PersonaValue[];
  quote: PersonaValue;
}

interface ResultsPageProps {
  username: string;
}

// Reusable Components
const loadingSteps = [
    { message: "Good things take time. Cooking the perfect persona report...", duration: 150, image: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTZzY3Q4N3JpeXB0enRtZGJlNzZvdjFubzRnaXp1NXA0OGdsd2M2MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8cG6zdMFPB7ag/giphy.gif" },
    { message: "Looks like you've got a fascinating account! Analyzing deep archives...", duration: 120, image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmhzdHRhMXlmZWF3Y2VsYjBmMmxpc2ZkMTg4YW5oYmJkM2YxbmgwMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/jSEsCWf9kXazGN9Bft/giphy.gif" },
    { message: "Just a few more moments. The results are worth the wait!", duration: 120, image: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHhiY2g2bTI5aHl3dXo2eHM4MDlza291bm4xcG5xOHFyZzV5anczYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QBd2kLB5qDmysEXre9/giphy.gif" }
];

const SourceModal = ({ sources, onClose }: { sources: Source[]; onClose: () => void; }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full relative">
            <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"><X size={24} /></button>
            <div className="p-6"><h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Evidence & Sources</h3>
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                    {sources && sources.length > 0 ? sources.map((source, index) => (
                        <div key={index} className="border-l-4 border-orange-500 pl-4 py-2 bg-gray-50 rounded-r-lg">
                            <p className="text-gray-800 italic">"{source.quote || 'N/A'}"</p>
                            <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-sm text-orange-600 hover:text-orange-800 underline break-all">{source.url}</a>
                        </div>
                    )) : <p className="text-gray-600">No specific source was cited for this item.</p>}
                </div>
            </div>
        </div>
    </div>
);

const SectionList = ({ title, items, openModal }: { title: string, items?: PersonaValue[], openModal: (s: Source[]) => void }) => (
  <div>
    <h3 className="text-xl font-bold text-orange-500 pb-2 border-b border-orange-200 mb-6">{title}</h3>
    <ul className="space-y-4">
      {items && items.length > 0 ? items.map((item, i) => (
        <li key={i} className="flex items-start">
          <span className="text-orange-500 mr-2 mt-1">•</span>
          <span className="flex-1 text-gray-700">{String(item.value)}</span>
          <button onClick={() => openModal(item.sources)} className="ml-2 text-gray-400 hover:text-orange-500"><LinkIcon size={14}/></button>
        </li>
      )) : <li className="text-gray-500 italic">No information available.</li>}
    </ul>
  </div>
);

// --- Main Component ---
const ResultsPage = ({ username }: ResultsPageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [personaData, setPersonaData] = useState<PersonaData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  const [countdown, setCountdown] = useState(loadingSteps[0].duration);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSources, setModalSources] = useState<Source[]>([]);

  useEffect(() => {
    const fetchPersonaData = async () => {
      setIsLoading(true); setError(null);
      try {
        // --- CHANGE: Using the API_URL constant ---
        const response = await fetch(`${API_URL}/api/generate-persona`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Server error: ${response.status}`);
        }
        setPersonaData(await response.json());
      } catch (e: any) { setError(e.message); } finally { setIsLoading(false); }
    };
    if (username) fetchPersonaData();
  }, [username]);

  useEffect(() => {
      if (!isLoading) return;
      const timer = setInterval(() => {
          setCountdown(prev => {
              if (prev > 1) return prev - 1;
              const nextIndex = (loadingStepIndex + 1) % loadingSteps.length;
              setLoadingStepIndex(nextIndex);
              return loadingSteps[nextIndex].duration;
          });
      }, 1000);
      return () => clearInterval(timer);
  }, [isLoading, loadingStepIndex]);

  const openModal = (sources: Source[]) => {
      setModalSources(sources); setIsModalOpen(true);
  };
  
  const handleDownload = async () => {
      if (!personaData) return;
      try {
          // --- CHANGE: Using the API_URL constant ---
          const response = await fetch(`${API_URL}/api/download-report`, {
              method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(personaData),
          });
          if (!response.ok) throw new Error("Failed to generate report.");
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url; a.download = `${username}_persona_report.txt`;
          document.body.appendChild(a); a.click(); a.remove();
          window.URL.revokeObjectURL(url);
      } catch (err) { alert("Could not download the report."); }
  };

  if (isLoading) {
      const currentStep = loadingSteps[loadingStepIndex];
      return (
          <div className="w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center p-4">
              <img src={currentStep.image} alt="Loading animation" className="w-48 h-48 object-cover rounded-lg mb-6 shadow-lg"/>
              <h2 className="text-2xl font-bold text-orange-600 mb-2">{currentStep.message}</h2>
              <p className="text-lg text-gray-700 mb-4">Generating persona for u/{username}</p>
              <p className="text-4xl font-mono text-gray-900">{Math.floor(countdown / 60)}:{String(countdown % 60).padStart(2, '0')}</p>
          </div>
      );
  }

  if (error) {
     return (
        <div className="w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Generation Failed</h2>
            <p className="text-lg text-gray-700 mb-6">{error}</p>
            <Link to="/" className="px-6 py-3 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600">Try Again</Link>
        </div>
    );
  }

  if (!personaData) return <div className="p-8 text-center text-gray-600">No persona data could be generated.</div>;

  return (
    <>
      {isModalOpen && <SourceModal sources={modalSources} onClose={() => setIsModalOpen(false)} />}
      <div className="w-full py-8 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Link to="/" className="inline-flex items-center text-orange-500 hover:text-orange-600"><ArrowLeft className="h-4 w-4 mr-2" />Back to Home</Link>
            <button onClick={handleDownload} className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"><Download className="h-4 w-4 mr-2" />Download Report</button>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-1 flex flex-col">
                <div className="bg-gray-100 rounded-lg shadow-inner overflow-hidden">
                  <img src={personaData.profileImage} alt={`${username}'s profile`} className="w-full h-auto aspect-square object-cover" />
                </div>
                {personaData?.summaryQuote?.value && (
                  <div className="mt-4 bg-orange-600 p-4 text-white rounded-lg shadow-md flex-grow">
                    <p className="text-base italic">"{personaData.summaryQuote.value}"</p>
                  </div>
                )}
              </div>
              <div className="lg:col-span-2">
                <h1 className="text-3xl font-bold text-gray-800">u/{username}</h1>
                <h2 className="text-xl font-medium text-orange-600 mb-6">{personaData?.profileInfo?.archetype?.value || "User"}</h2>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-6">
                  {personaData.profileInfo && Object.entries(personaData.profileInfo).map(([key, item]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-gray-500 uppercase text-xs font-bold tracking-wider">{key}</span>
                      <span className="text-gray-900 font-medium">{String(item.value)}</span>
                      <button onClick={() => openModal(item.sources)} className="text-gray-400 hover:text-orange-500"><LinkIcon size={14}/></button>
                    </div>
                  ))}
                </div>
                <h3 className="text-lg font-bold text-orange-500 mt-8 mb-4">MOTIVATIONS</h3>
                <div className="space-y-3">
                  {personaData.motivations?.map(m => (
                    <div key={m.name} className="flex items-center">
                      <div className="w-32 text-gray-700 font-medium text-sm">{m.name.toUpperCase()}</div>
                      <div className="flex-1 bg-gray-200 h-5 rounded-full"><div className="bg-orange-400 h-full rounded-full" style={{ width: `${m.value}%` }}></div></div>
                      <button onClick={() => openModal(m.sources)} className="ml-2 text-gray-400 hover:text-orange-500"><LinkIcon size={14}/></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {personaData.personality && <div className="mb-8">
                <h3 className="text-lg font-bold text-orange-500 pb-2 border-b border-orange-200 mb-6">PERSONALITY</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                    {personaData.personality.map(trait => (
                      <div key={trait.name} className="flex flex-col">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>{trait.name.split('-')[0]}</span>
                          <span>{trait.name.split('-')[1]}</span>
                        </div>
                        <div className="relative w-full bg-gray-200 h-2 rounded-full">
                            <div className="absolute top-1/2 -translate-y-1/2 bg-gray-700 w-4 h-4 rounded-full border-2 border-white shadow" style={{ left: `calc(${trait.value}% - 8px)` }}></div>
                        </div>
                      </div>
                    ))}
                </div>
            </div>}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <SectionList title="BEHAVIOUR & HABITS" items={personaData.behaviors} openModal={openModal} />
              <SectionList title="FRUSTRATIONS" items={personaData.frustrations} openModal={openModal} />
            </div>

            <div className="w-full">
               <SectionList title="GOALS & NEEDS" items={personaData.goals} openModal={openModal} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultsPage;