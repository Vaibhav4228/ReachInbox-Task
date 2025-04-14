import { useTheme } from './context/ThemeContext';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <button onClick={toggleTheme} className="p-2 m-4 bg-gray-200 dark:bg-gray-800 rounded">
        Toggle to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
   
    </div>
  );
}

export default App;
