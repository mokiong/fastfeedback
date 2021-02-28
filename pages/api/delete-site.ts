import { auth } from '@/lib/firebase-admin';
import { deleteSite } from '@/lib/firestore';
import { logger, formatObjectKeys } from '@/utils/logger';

export default async (req, res) => {
   try {
      const { uid } = await auth.verifyIdToken(req.headers.token);
      const { siteId } = req.query;

      // const {success} = await deleteSite(siteId);

      res.status(200).json('hi');
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
