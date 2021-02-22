import { getAllFeedBack } from '@/lib/db-admin';

export default async (req, res) => {
   const { siteId } = req.query;
   const { feedback, error } = await getAllFeedBack(siteId);

   if (error) {
      res.status(500).json({ error });
   }

   res.status(200).json({ feedback });
};
