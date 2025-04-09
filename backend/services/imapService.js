import Imap from 'node-imap';
import { simpleParser } from 'mailparser';
import Email from '../models/Email.js';
import dotenv from 'dotenv';
import { indexEmail } from './searchService.js';

dotenv.config();

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

const fetchEmails = (imap, account) => {
  const sinceDate = new Date();
  sinceDate.setDate(sinceDate.getDate() - 30);

  imap.openBox('INBOX', false, () => {
    imap.search(['ALL', ['SINCE', sinceDate.toDateString()]], (err, results) => {
      if (err) return console.error('Search error:', err);
      if (!results || results.length === 0) return;

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
    const parsedData = await simpleParser(buffer);
    const existingEmail = await Email.findOne({ messageId: parsedData.messageId });
    if (existingEmail) return;

    const email = new Email({
      messageId: parsedData.messageId,
      from: parsedData.from?.text,
      to: parsedData.to?.value.map(v => v.address),
      subject: parsedData.subject,
      body: parsedData.text,
      date: parsedData.date,
      folder: 'INBOX',
      account: account.user,
    });

    await email.save();
    await indexEmail(email);
    console.log(`Email savedd from by ${parsedData.from?.text}`);
  });
};

const ImapConnection = (account) => {
  const imap = new Imap({
    user: account.user,
    password: account.password,
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
  });

  imap.once('ready', () => {
    console.log(`connected to ${account.user}`);
    fetchEmails(imap, account);
  });

  imap.on('mail', () => {
    console.log(`newly mail for ${account.user}`);
    fetchEmails(imap, account);
  });

  imap.once('error', err => {
    console.error(`connected failed for ${account.user}:`, err);
  });

  imap.connect();
};

const startConnections = () => {
  emailAccounts.forEach(account => {
    ImapConnection(account);
  });
};

export default startConnections;
