import { z } from 'zod';
import { unstable_sendNoContent } from '~/utils/unstable-send-no-content';

const BodySchema = z.object({ key: z.string().regex(/^\w+(\:\w+)+/) }).strict();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const parsed = BodySchema.safeParse(body);

  if (!parsed.success) {
    throw createError({
      statusCode: 406,
      statusText: 'Not accetable',
      statusMessage: 'Invalid cache key.',
    });
  } else {
    await useStorage().removeItem(`db:cache:${parsed.data.key}.json`);

    unstable_sendNoContent(event);
  }
});
