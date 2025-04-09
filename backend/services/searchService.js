import { Client } from '@elastic/elasticsearch';
import dotenv from 'dotenv';

const elastic = new Client({
    node: process.env.ELASTICSEARCH_NODE || 'http://localhost:9200',
});

const INDEX_NAME = 'emails';

export const createIndex = async () => {
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
        console.log('elastic search emails ');
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
        }
      });
      console.log(`email email: ${emailDoc.subject}`);
    } catch (error) {
      console.error('elasyic  seach error:', error.meta?.body?.error || error.message);
    }
  };