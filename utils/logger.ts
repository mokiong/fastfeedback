import pino from 'pino';
import { logflarePinoVercel } from 'pino-logflare';

const { stream, send } = logflarePinoVercel({
   apiKey: 'xhXG-3DStF3Q',
   sourceToken: '2b245fae-322d-4cbf-a2cd-b5691fc53990',
});

const logger = pino(
   {
      browser: {
         transmit: {
            send: send,
         },
      },
      level: 'debug',
      base: {
         env: process.env.NODE_ENV || 'NODE_ENV not set',
         revision: process.env.VERCEL_GITHUB_COMMIT_SHA,
      },
   },
   stream
);

const formatObjectKeys = (headers) => {
   const keyValues = {};
   Object.keys(headers).map((key) => {
      const newKey = key.replace(/-/g, '_');
      keyValues[newKey] = headers[key];
   });

   return keyValues;
};

export { formatObjectKeys, logger };
