import { Team } from '@haus23/dtp-types';
import { cachedQuery } from '~/utils/cached-query';
import { toMap } from '~/utils/to-map';
import { db } from '../server/db';
import { modelConverter } from '../server/model-converter';

export const getTeams = cachedQuery(
  async () => {
    console.info(`[${new Date().toLocaleString()}] Query teams`);

    const docsSnaphot = await db.collection('teams').withConverter(modelConverter<Team>()).get();

    return toMap(docsSnaphot.docs.map((doc) => Team.parse(doc.data())));
  },
  {
    name: 'masterdata',
    getKey: () => 'teams',
  }
);
