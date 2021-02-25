import { NextSeo } from 'next-seo';
import React from 'react';

const Page = ({ name, path, children }) => {
   const title = `Fast Feedback - ${name}`;
   const url = `https://fastfeedback-sigma-swart.vercel.app${path}`;

   return (
      <>
         <NextSeo
            title={title}
            canonical={url}
            openGraph={{
               url,
               title,
            }}
         />
         {children}
      </>
   );
};

export default Page;
