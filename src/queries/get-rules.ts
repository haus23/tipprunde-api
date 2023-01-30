import { Rules } from '@haus23/dtp-types';
import { cachedQuery } from '~/utils/cached-query';
import { toMap } from '~/utils/to-map';
import { db } from '../server/db';
import { modelConverter } from '../server/model-converter';

export const getRules = cachedQuery(
  async () => {
    console.info(`[${new Date().toLocaleString()}] Query rules`);

    const docsSnaphot = await db.collection('rules').withConverter(modelConverter<Rules>()).get();

    return toMap(docsSnaphot.docs.map((doc) => Rules.parse(doc.data())));
  },
  {
    name: 'masterdata',
    getKey: () => 'rules',
  }
);
