// import { useRouter } from 'next/router';
// import { Box, Text } from '@chakra-ui/react';
// import 'iframe-resizer/js/iframeResizer.contentWindow';

// import Feedback from '@/components/Feedback';
// import FeedbackLink from '@/components/FeedbackLink';
// import { getAllFeedBack, getAllSites, getSite } from '@/lib/db-admin';
// import { useTheme } from '@/utils/useTheme';

// export async function getStaticProps(context) {
//    const [siteId, route] = context.params.site;
//    const data = await getAllFeedBack(siteId, route);
//    const { site } = await getSite(siteId);

//    return {
//       props: {
//          initialFeedback: data ? data.feedback : [],
//          site,
//       },
//       revalidate: 1,
//    };
// }

// // export async function getStaticPaths() {
// //    const { sites } = await getAllSites();
// //    const paths = sites.map((site) => ({
// //       params: {
// //          siteId: [site.id.toString()],
// //       },
// //    }));

// //    return {
// //       paths,
// //       fallback: true,
// //    };
// // }

// export async function getStaticPaths() {
//    // const { sites } = await getAllSites();
//    // const paths = sites.map((site) => ({
//    //    params: {
//    //       site: [site.id.toString()],
//    //    },
//    // }));
//    // return {
//    //    paths,
//    //    fallback: true,
//    // };
// }

// const EmbeddedFeedbackPage = ({ initialFeedback, site }) => {
//    const router = useRouter();
//    const colorMode = useTheme();
//    const textColor = {
//       light: 'gray.900',
//       dark: 'gray.200',
//    };
//    console.log('site Id', router.query.siteId);
//    return (
//       <Box display="flex" flexDirection="column" width="full">
//          {/* <FeedbackLink paths={router?.query?.site || []} /> */}
//          <FeedbackLink siteId={router.query.siteId} />
//          {initialFeedback?.length ? (
//             initialFeedback.map((feedback, index) => (
//                <Feedback
//                   key={feedback.id}
//                   settings={site?.settings}
//                   isLast={index === initialFeedback.length - 1}
//                   {...feedback}
//                />
//             ))
//          ) : (
//             <Text>There are no comments for this site.</Text>
//          )}
//       </Box>
//    );
// };
const EmbeddedFeedbackPage = () => {
   return <div></div>;
};
export default EmbeddedFeedbackPage;
