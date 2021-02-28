import { getAppSites } from '@/lib/db-admin';
import { logger, formatObjectKeys } from '@/utils/logger';

export default async (req, res) => {
   try {
      const sites = await getAppSites();
      res.status(200).json(sites);
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
