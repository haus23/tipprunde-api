import { H3Event } from 'h3';

// TODO: replace with released fn
export function unstable_sendNoContent(event: H3Event) {
  event.node.res.statusCode = 204;
  event.node.res.removeHeader('content-length');
  event.node.res.end();
}
