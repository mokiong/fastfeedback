import { getAllFeedBack, getSite } from '@/lib/db-admin';

export default async (req, res) => {
   const { siteId } = req.query;
   const respo = await getAllFeedBack(siteId, null);
   const { site } = await getSite(siteId);
   console.log('at api feedback/id');
   if (respo === null) {
      return res.status(200).json({ feedback: null, site });
   }
   if (respo.error) {
      res.status(500).json({ error: respo.error });
   }

   res.status(200).json({ feedback: respo.feedback, site });
};
