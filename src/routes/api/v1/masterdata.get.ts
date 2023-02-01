import { getChampionships } from '~/queries/get-championships';
import { getLeagues } from '~/queries/get-leagues';
import { getPlayers } from '~/queries/get-players';
import { getRules } from '~/queries/get-rules';
import { getTeams } from '~/queries/get-teams';

export default eventHandler(async (event) => {
  setHeaders(event, {
    'access-control-allow-origin': '*',
    'access-control-allowed-methods': 'GET',
    'access-control-allow-headers': '*',
    'access-control-max-age': '0',
  });

  const championships = await getChampionships();
  const leagues = await getLeagues();
  const players = await getPlayers();
  const rules = await getRules();
  const teams = await getTeams();

  return { championships, leagues, players, rules, teams };
});
