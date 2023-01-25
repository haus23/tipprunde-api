import { unstable_sendNoContent } from '~/utils/unstable-send-no-content';

export default eventHandler((event) => {
  setHeaders(event, {
    'access-control-allow-origin': '*',
    'access-control-allowed-methods': 'POST',
    'access-control-allow-headers': '*',
    'access-control-max-age': '0',
  });

  unstable_sendNoContent(event);
});
