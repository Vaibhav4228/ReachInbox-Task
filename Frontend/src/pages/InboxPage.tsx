import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmails, setPage } from '../redux/emailSlice';
import { RootState, AppDispatch } from '../redux/store';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import { useNavigate } from 'react-router-dom';
import { Email } from '../types/email';

const InboxPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, page, total } = useSelector((state: RootState) => state.emails);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchEmails());
  }, [dispatch, page]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Inbox</h2>

      {loading ? (
        <div className="flex justify-center mt-10">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="border rounded-md overflow-hidden">
            <table className="min-w-full text-sm text-gray-800 dark:text-white">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="p-3 text-left">From</th>
                  <th className="p-3 text-left">Subject</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {data.map((email: Email) => (
                  <tr
                    key={email.messageId}
                    className="border-t hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition"
                    onClick={() => navigate(`/email/${email.messageId}`)}
                  >
                    <td className="p-3">{email.from}</td>
                    <td className="p-3 font-medium">{email.subject}</td>
                    <td className="p-3">
                      <span className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-xs capitalize">
                        {email.category || 'uncategorized'}
                      </span>
                    </td>
                    <td className="p-3">
                      {email.date ? new Date(email.date).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {total > 10 && (
            <div className="flex justify-end mt-4">
              <Pagination
                count={Math.ceil(total / 10)}
                page={page}
                onChange={(_, value) => {
                  dispatch(setPage(value));
                  dispatch(fetchEmails());
                }}
                color="primary"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default InboxPage;
