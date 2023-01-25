import { Team } from '@haus23/dtp-types';
import { cachedQuery } from '~/utils/cached-query';
import { db } from '../server/db';
import { modelConverter } from '../server/model-converter';

export const getTeams = cachedQuery(
  async (): Promise<Team[]> => {
    console.info(`[${new Date().toLocaleString()}] Query teams`);

    const docsSnaphot = await db.collection('teams').withConverter(modelConverter<Team>()).get();

    return docsSnaphot.docs.map((doc) => Team.parse(doc.data()));
  },
  {
    name: 'masterdata',
    getKey: () => 'teams',
  }
);
