import { getAllSites, getAllFeedBack } from '@/lib/db-admin';
import { auth } from '@/lib/firebase-admin';
import { logger, formatObjectKeys } from '@/utils/logger';

export default async (req, res) => {
   try {
      const { uid } = await auth.verifyIdToken(req.headers.token);
      const { sites } = await getAllSites(uid);

      const feedback = [];
      for (const site of sites) {
         feedback.push(await getAllFeedBack(site.id, null));
      }

      res.status(200).json({ feedback });
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
