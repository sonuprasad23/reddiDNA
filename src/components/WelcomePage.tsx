import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, PieChart, BarChart, Target } from 'lucide-react';

const WelcomePage = ({ onGeneratePersona }: { onGeneratePersona: (username: string) => void; }) => {
  const [profileUrl, setProfileUrl] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // --- URL Validation and Username Extraction Logic ---
    try {
      if (!profileUrl.trim()) {
        throw new Error('Please enter a Reddit profile link.');
      }
      
      const url = new URL(profileUrl);

      if (url.hostname !== 'www.reddit.com' && url.hostname !== 'reddit.com') {
        throw new Error('Please enter a valid Reddit.com URL.');
      }

      const pathParts = url.pathname.split('/').filter(part => part);
      
      if (pathParts.length < 2 || pathParts[0] !== 'user') {
        throw new Error('URL must be a valid user profile link (e.g., reddit.com/user/username).');
      }

      const username = pathParts[1];
      onGeneratePersona(username);
      navigate('/results');

    } catch (err: any) {
      if (err instanceof TypeError) {
         setError('Please enter a valid and complete URL (e.g., https://www.reddit.com/...).');
      } else {
         setError(err.message);
      }
    }
  };

  return (
    <div className="w-full py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img src="/logo.png" alt="ReddiDNA Logo" className="h-24 w-24" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Welcome to ReddiDNA
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Extracting the digital DNA of Reddit users. Enter any Reddit profile
            link to generate a comprehensive AI-powered persona.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-12">
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="w-full max-w-lg mb-4">
              <label htmlFor="profileUrl" className="block text-sm font-medium text-gray-700 mb-2">
                Reddit User Profile Link
              </label>
              <input
                type="text"
                id="profileUrl"
                value={profileUrl}
                onChange={e => setProfileUrl(e.target.value)}
                placeholder="e.g., https://www.reddit.com/user/kojied/"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Generate Persona
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<Users className="h-8 w-8 text-orange-500" />}
            title="Detailed Demographics"
            description="Get insights into the user's age, location, and other demographic information."
          />
          <FeatureCard
            icon={<PieChart className="h-8 w-8 text-orange-500" />}
            title="Behavior Analysis"
            description="Understand user behaviors, habits, and patterns based on their Reddit activity."
          />
          <FeatureCard
            icon={<BarChart className="h-8 w-8 text-orange-500" />}
            title="Motivation Metrics"
            description="Discover what drives the user's interests and engagement on the platform."
          />
          <FeatureCard
            icon={<Target className="h-8 w-8 text-orange-500" />}
            title="Goals & Frustrations"
            description="Identify user goals, needs, and pain points for a deeper understanding."
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string; }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default WelcomePage;