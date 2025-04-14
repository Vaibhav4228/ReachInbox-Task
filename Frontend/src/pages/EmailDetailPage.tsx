import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import SendIcon from '@mui/icons-material/Send';

const EmailDetailPage = () => {
  const { id } = useParams();
  interface Email {
    subject: string;
    from: string;
    date: string;
    body: string;
    category?: string;
  }

  const [email, setEmail] = useState<Email | null>(null);
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState<string>('');
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const { data } = await axios.get(`/api/emails/search`, {
          params: { query: id },
        });
        setEmail(data.results?.[0]);
      } catch (err) {
        console.error('Error fetching email:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEmail();
  }, [id]);

  const handleSuggestReply = async () => {
    if (!email) return;
    setGenerating(true);
    try {
      const { data } = await axios.post('/api/emails/suggest-reply', {
        emailText: email.body,
      });
      setReply(data.reply);
    } catch (err) {
      console.error('Error suggesting reply:', err);
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = () => {
    if (reply) {
      navigator.clipboard.writeText(reply);
      setCopied(true);
    }
  };

  const handleSend = async () => {
    if (!reply || !email) return;
    setSending(true);
    setTimeout(() => {
      console.log('Email sent (simulated):', reply);
      alert('Email sent successfully (simulated)');
      setSending(false);
    }, 1000);
  };

  if (loading)
    return (
      <div className="flex justify-center mt-10">
        <CircularProgress />
      </div>
    );

  if (!email) return <p className="text-center text-gray-500 mt-10">Email not found</p>;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl font-bold mb-1">{email.subject}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          From: {email.from} • {new Date(email.date).toLocaleString()}
        </p>
        <span className="bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-white px-2 py-1 rounded text-xs mt-2 inline-block">
          {email.category || 'Uncategorized'}
        </span>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <p>{email.body}</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleSuggestReply}
          disabled={generating}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {generating ? 'Regenerating...' : 'Suggest AI Reply'}
        </button>

        {reply && (
          <button
            onClick={handleSend}
            disabled={sending}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition flex items-center gap-1"
          >
            <SendIcon style={{ fontSize: 18 }} />
            {sending ? 'Sending...' : 'Send'}
          </button>
        )}
      </div>

      {reply && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded border dark:border-gray-700 relative">
          <h3 className="font-semibold mb-2 text-blue-700 dark:text-blue-400 flex items-center justify-between">
            Editable AI Reply
            <button
              onClick={handleSuggestReply}
              className="text-xs text-blue-600 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1"
            >
              <RefreshIcon style={{ fontSize: 16 }} /> Refresh
            </button>
          </h3>

          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            className="w-full h-40 p-3 rounded text-sm bg-white dark:bg-gray-900 dark:text-white border dark:border-gray-700"
          />

          <button
            onClick={handleCopy}
            className="mt-3 px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-1 text-sm"
          >
            <ContentCopyIcon style={{ fontSize: 16 }} />
            Copy to Clipboard
          </button>
        </div>
      )}

      <Snackbar
        open={copied}
        autoHideDuration={3000}
        onClose={() => setCopied(false)}
        message="Reply copied to clipboard!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </div>
  );
};

export default EmailDetailPage;
