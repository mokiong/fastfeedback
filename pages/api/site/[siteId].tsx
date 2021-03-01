import { getSite } from '@/lib/db-admin';
import { auth } from '@/lib/firebase-admin';
import { logger, formatObjectKeys } from '@/utils/logger';

export default async (req, res) => {
   try {
      const { siteId } = req.query;
      const { site } = await getSite(siteId);
      console.log('at api site/siteId');

      res.status(200).json({ site });
   } catch (error) {
      logger.error(
         {
            request: {
               headers: formatObjectKeys(req.headers),
               url: req.url,
               method: req.method,
            },
            response: {
               statusCode: res.statusCode,
            },
         },
         error.message
      );

      res.status(500).json({ error });
   }
};
