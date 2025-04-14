import { Client } from '@elastic/elasticsearch';
import dotenv from 'dotenv';

dotenv.config();

const elastic = new Client({
  node: process.env.ELASTICSEARCH_NODE || 'http://localhost:9200',
});

const INDEX_NAME = 'emails';

export const createIndex = async () => {
  try {
    const exists = await elastic.indices.exists({ index: INDEX_NAME });
    if (!exists.body) {
      await elastic.indices.create({
        index: INDEX_NAME,
        body: {
          mappings: {
            properties: {
              messageId: { type: 'keyword' },
              from: { type: 'text' },
              to: { type: 'text' },
              subject: { type: 'text' },
              body: { type: 'text' },
              date: { type: 'date' },
              folder: { type: 'keyword' },
              account: { type: 'keyword' },
              category: { type: 'keyword' },
            },
          },
        },
      });
      console.log(' new Elasticsearch index: emails');
    } else {
      console.log(' elasticsearch index "emails" already exists.');
    }
  } catch (error) {
    if (error.meta?.body?.error?.type === 'resource_already_exists_exception') {
      console.log('elasyic search index already exists, skipping creation...');
    } else {
      console.error('eerror creating Elasticsearch index:', error.message);
    }
  }
};

export const indexEmail = async (emailDoc) => {
  try {
    await elastic.index({
      index: INDEX_NAME,
      id: emailDoc.messageId,
      body: {
        messageId: emailDoc.messageId,
        from: emailDoc.from,
        to: emailDoc.to.join(', '),
        subject: emailDoc.subject,
        body: emailDoc.body,
        date: emailDoc.date,
        folder: emailDoc.folder,
        account: emailDoc.account,
        category: emailDoc.category || 'uncategorized',
      },
    });
    console.log(` email: ${emailDoc.subject}`);
  } catch (error) {
    console.error('elasticsearch indexing error:', error.meta?.body?.error || error.message);
  }
};
