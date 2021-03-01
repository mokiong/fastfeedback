import { getAllSites, getMySitesFeedBack } from '@/lib/db-admin';
import { auth } from '@/lib/firebase-admin';
import { logger, formatObjectKeys } from '@/utils/logger';

export default async (req, res) => {
   try {
      const { uid } = await auth.verifyIdToken(req.headers.token);
      const { sites } = await getAllSites(uid);

      let finalFeedback = [];
      for (const site of sites) {
         const feed = await getMySitesFeedBack(site.id);
         if (feed) {
            finalFeedback = finalFeedback.concat(feed.feedback);
         }
      }

      res.status(200).json({ feedback: finalFeedback });
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
