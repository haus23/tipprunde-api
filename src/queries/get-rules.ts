import { Rules } from '@haus23/dtp-types';
import { cachedQuery } from '~/utils/cached-query';
import { db } from '../server/db';
import { modelConverter } from '../server/model-converter';

export const getRules = cachedQuery(
  async (): Promise<Rules[]> => {
    console.info(`[${new Date().toLocaleString()}] Query rules`);

    const docsSnaphot = await db.collection('rules').withConverter(modelConverter<Rules>()).get();

    return docsSnaphot.docs.map((doc) => Rules.parse(doc.data()));
  },
  {
    name: 'masterdata',
    getKey: () => 'rules',
  }
);
