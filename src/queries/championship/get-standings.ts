import {
  ChampionshipMatch,
  ChampionshipPlayer,
  ChampionshipRound,
  ChampionshipTip,
} from '@haus23/dtp-types';
import { db } from '~/server/db';
import { modelConverter } from '~/server/model-converter';
import { cachedQuery } from '~/utils/cached-query';

export const getStandings = cachedQuery(
  async (championshipId: string) => {
    console.info(`[${new Date().toLocaleString()}] Query standings ${championshipId}`);

    const matchesDocsSnapshot = await db
      .collection(`championships/${championshipId}/matches`)
      .withConverter(modelConverter<ChampionshipMatch>())
      .get();
    const matches = matchesDocsSnapshot.docs
      .map((d) => ChampionshipMatch.parse(d.data()))
      .sort((a, b) => a.nr - b.nr);

    const playersDocsSnapshot = await db
      .collection(`championships/${championshipId}/players`)
      .withConverter(modelConverter<ChampionshipPlayer>())
      .get();
    const players = playersDocsSnapshot.docs
      .map((d) => ChampionshipPlayer.parse(d.data()))
      .sort((a, b) => a.rank - b.rank);

    const roundsDocsSnapshot = await db
      .collection(`championships/${championshipId}/rounds`)
      .withConverter(modelConverter<ChampionshipRound>())
      .get();
    const rounds = roundsDocsSnapshot.docs
      .map((d) => ChampionshipRound.parse(d.data()))
      .sort((a, b) => a.nr - b.nr);

    const tipsDocsSnapshot = await db
      .collection(`championships/${championshipId}/tips`)
      .withConverter(modelConverter<ChampionshipTip>())
      .get();
    const tips = tipsDocsSnapshot.docs.map((d) => ChampionshipTip.parse(d.data()));

    console.info(`[${new Date().toLocaleString()}] Query standings ${championshipId} finished`);
    return { matches, players, rounds, tips };
  },
  {
    name: 'standings',
    getKey: (championshipId: string) => championshipId,
  }
);
