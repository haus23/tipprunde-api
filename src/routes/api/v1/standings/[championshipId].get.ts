import { z } from 'zod';
import { ChampionshipId } from '@haus23/dtp-types';
import { getStandings } from '~/queries/championship/get-standings';
import { getChampionships } from '~/queries/get-championships';

export default eventHandler(async (event) => {
  const championshipIdParseResult = ChampionshipId.or(z.literal('current')).safeParse(
    event.context.params.championshipId
  );

  if (!championshipIdParseResult.success) {
    throw createError({
      statusCode: 406,
      statusText: 'Not accetable',
      statusMessage: 'Invalid championship',
    });
  } else {
    const championships = await getChampionships();

    let championshipId: string | undefined;
    if (championshipIdParseResult.data === 'current') {
      championshipId = championships?.at(0)?.id;
    } else {
      const championship = championships?.find((c) => c.id === championshipIdParseResult.data);
      championshipId = championship?.id;
    }

    if (!championshipId) {
      throw createError({
        statusCode: 404,
        statusText: 'Not found',
        statusMessage: 'No such championship',
      });
    }

    return await getStandings(championshipId);
  }
});
