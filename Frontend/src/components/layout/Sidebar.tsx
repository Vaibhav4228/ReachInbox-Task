import { NavLink } from 'react-router-dom';
import InboxIcon from '@mui/icons-material/Inbox';
import StarIcon from '@mui/icons-material/Star';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Sidebar = () => {
  const linkClass =
    'flex items-center gap-3 px-3 py-2 rounded-lg text-[15px] transition-all hover:bg-blue-100 dark:hover:bg-blue-800 hover:text-blue-600 dark:hover:text-white';

  const activeClass = 'font-semibold text-blue-600 dark:text-white bg-blue-50 dark:bg-blue-900';

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 shadow-md p-5 space-y-2">
      <h2 className="text-xl font-bold tracking-tight text-gray-800 dark:text-white mb-6 uppercase">#VMAIL</h2>

      <NavLink
        to="/inbox"
        className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}
      >
        <InboxIcon fontSize="small" />
        Inbox
      </NavLink>

      <NavLink
        to="/inbox?category=interested"
        className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}
      >
        <StarIcon fontSize="small" />
        Interested
      </NavLink>

      <NavLink
        to="/settings"
        className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}
      >
        <AccountCircleIcon fontSize="small" />
        Settings
      </NavLink>
    </aside>
  );
};

export default Sidebar;
