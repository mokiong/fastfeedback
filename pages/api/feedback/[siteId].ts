import { getAllFeedBack } from '@/lib/db-admin';

export default async (req, res) => {
   const { siteId } = req.query;
   const respo = await getAllFeedBack(siteId);

   if (respo.error) {
      res.status(500).json({ error: respo.error });
   }

   res.status(200).json({ feedback: respo.feedback });
};
