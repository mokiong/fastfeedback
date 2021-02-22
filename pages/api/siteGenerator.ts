import { getAllSites } from '@/lib/db-admin';

export default async (_, res) => {
   const { sites, error } = await getAllSites();

   const siteId = [];

   if (error) {
      res.status(500).json({ error });
   }

   sites.forEach((doc) => {
      siteId.push(doc.id);
   });
   res.status(200).json({ siteId });
};
