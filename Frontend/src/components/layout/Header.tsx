import { useTheme } from '../../context/ThemeContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { setFilters, fetchEmails } from '../../redux/emailSlice';
import { useEffect, useState } from 'react';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const searchQuery = useSelector((state: RootState) => state.emails.filters.query);
  const [input, setInput] = useState(searchQuery);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      dispatch(setFilters({ query: input }));
      dispatch(fetchEmails());
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [input]);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 gap-4 flex-wrap">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Inbox</h1>

      <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-md w-full max-w-sm">
        <SearchIcon className="text-gray-500 dark:text-gray-300" />
        <input
          type="text"
          placeholder="Search emails..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent outline-none flex-1 text-sm text-gray-700 dark:text-white"
        />
      </div>

      <button
        onClick={toggleTheme}
        className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-600 dark:text-white hover:scale-105 transition"
      >
        {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
      </button>
    </header>
  );
};

export default Header;
