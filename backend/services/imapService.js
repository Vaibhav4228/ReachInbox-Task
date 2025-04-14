import Imap from 'node-imap';
import { simpleParser } from 'mailparser';
import Email from '../models/Email.js';
import dotenv from 'dotenv';
import { WebClient } from '@slack/web-api';
import { indexEmail } from './searchService.js';
import categorizeWithGemini from './geminiService.js';
import axios from 'axios'; 

dotenv.config();

const slack = new WebClient(process.env.SLACK_API_TOKEN);

const emailAccounts = [
  {
    user: process.env.EMAIL_USER_1,
    password: process.env.EMAIL_PASS_1,
  },
  {
    user: process.env.EMAIL_USER_2,
    password: process.env.EMAIL_PASS_2,
  }
];

const sendSlackNotification = async (subject, from, to, body) => {
  try {
    await slack.chat.postMessage({
      channel: process.env.SLACK_CHANNEL_ID,
      text: `New Interested Email!

Subject: ${subject}
From: ${from}
To: ${to.join(', ')}
Body: ${body}`
    });
    console.log("slack notification sent.");
  } catch (error) {
    console.error('error sending Slack notification:', error);
  }
};

const triggerWebhook = async (email) => {
  try {
    await axios.post(process.env.WEBHOOK_URL, {
      subject: email.subject,
      from: email.from,
      to: email.to,
      body: email.body,
      category: email.category,
    });
    console.log('webhook triggered.');
  } catch (error) {
    console.error('failed to trigger webhook:', error.message);
  }
};

const fetchEmails = (imap, account) => {
  const sinceDate = new Date();
  sinceDate.setDate(sinceDate.getDate() - 30);
  console.log(` Fetching emails for ${account.user} since ${sinceDate.toDateString()}`);

  imap.openBox('INBOX', false, () => {
    imap.search(['ALL', ['SINCE', sinceDate.toDateString()]], (err, results) => {
      if (err) return console.error('search error:', err);
      if (!results || results.length === 0) {
        console.log(`No emails found for ${account.user}`);
        return;
      }

      console.log(`Found ${results.length} emails for ${account.user}`);
      const fetcher = imap.fetch(results, { bodies: '' });
      fetcher.on('message', msg => handleMessage(msg, account));
    });
  });
};

const handleMessage = (msg, account) => {
  let buffer = '';
  let attributes = null;

  msg.on('body', stream => {
    stream.on('data', chunk => {
      buffer += chunk.toString('utf8');
    });
  });

  msg.once('attributes', attrs => {
    attributes = attrs;
  });

  msg.once('end', async () => {
    console.log(`🔍 Parsing email from ${account.user}...`);

    const parsedData = await simpleParser(buffer);
    console.log(`subject: ${parsedData.subject}`);

    const existingEmail = await Email.findOne({ messageId: parsedData.messageId });
    if (existingEmail) {
      console.log("duplicate email. Skipping...");
      return;
    }

    let category = 'uncategorized';
    try {
      category = await categorizeWithGemini(parsedData.text);
      console.log("ccategorized as:", category);
    } catch (err) {
      console.error(" failed to categorize with Gemini:", err.message);
    }

    const email = new Email({
      messageId: parsedData.messageId,
      from: parsedData.from?.text,
      to: parsedData.to?.value.map(v => v.address),
      subject: parsedData.subject,
      body: parsedData.text,
      date: parsedData.date,
      folder: 'INBOX',
      account: account.user,
      category,
    });

    await email.save();
    await indexEmail(email);
    console.log("email saved & indexed.");

    if (category === 'Interested') {
      await sendSlackNotification(parsedData.subject, parsedData.from?.text, parsedData.to?.value.map(v => v.address), parsedData.text);
      await triggerWebhook(email);
    }
  });
};

const connectImapWithRetry = (imap, account, retries = 0) => {
  imap.once('ready', () => {
    console.log(`connected to ${account.user}`);
    fetchEmails(imap, account);
  });

  imap.once('error', (err) => {
    if (retries < 3) {
      console.log(` coonnection failed, retrying... (${retries + 1}/3)`);
      setTimeout(() => connectImapWithRetry(imap, account, retries + 1), 5000);
    } else {
      console.error(`connection failed for ${account.user}:`, err);
    }
  });

  imap.connect();
};

const ImapConnection = (account) => {
  const imap = new Imap({
    user: account.user,
    password: account.password,
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
  });

  connectImapWithRetry(imap, account);
};

const startConnections = () => {
  emailAccounts.forEach(account => {
    ImapConnection(account);
  });
};

export default startConnections;
