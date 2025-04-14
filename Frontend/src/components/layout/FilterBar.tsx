import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { setFilters, fetchEmails } from '../../redux/emailSlice';

const FilterBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((state: RootState) => state.emails.filters);

  const handleChange = (field: string, value: string) => {
    const newFilters = { ...filters, [field]: value };
    dispatch(setFilters(newFilters));
    dispatch(fetchEmails());
  };
  
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <select
        value={filters.account}
        onChange={(e) => handleChange('account', e.target.value)}
        className="p-2 rounded border dark:bg-gray-800 dark:text-white"
      >
        <option value="">All Accounts</option>
        <option value="mfact266@gmail.com">mfact266@gmail.com</option>
        <option value="vaibhav200345@gmail.com">vaibhav200345@gmail.com</option>
      </select>

      <select
        value={filters.folder}
        onChange={(e) => handleChange('folder', e.target.value)}
        className="p-2 rounded border dark:bg-gray-800 dark:text-white"
      >
        <option value="">All Folders</option>
        <option value="INBOX">Inbox</option>
        <option value="SENT">Sent</option>
        <option value="SPAM">Spam</option>
      </select>

      <select
        value={filters.category}
        onChange={(e) => handleChange('category', e.target.value)}
        className="p-2 rounded border dark:bg-gray-800 dark:text-white"
      >
        <option value="">All Categories</option>
        <option value="Interested">Interested</option>
        <option value="Meeting Booked">Meeting Booked</option>
        <option value="Spam">Spam</option>
        <option value="Not Interested">Not Interested</option>
        <option value="Out of Office">Out of Office</option>
      </select>
    </div>
  );
};

export default FilterBar;
