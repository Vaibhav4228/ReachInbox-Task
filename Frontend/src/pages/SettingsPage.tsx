import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { setFilters, fetchEmails } from '../redux/emailSlice';

const SettingsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const account = useSelector((state: RootState) => state.emails.filters.account);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilters({ account: e.target.value, folder: '', category: '' }));
    dispatch(fetchEmails());
  };

  return (
    <div className="max-w-md space-y-4">
      <h2 className="text-xl font-semibold">Select Account</h2>
      <select
        value={account}
        onChange={handleChange}
        className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
      >
        <option value="">All Accounts</option>
        <option value="vaibhav200345@gmail.com">vaibhav200345@gmail.com</option>
        <option value="mfact266@gmail.com">mfact266@gmail.com</option>
      </select>
    </div>
  );
};

export default SettingsPage;
