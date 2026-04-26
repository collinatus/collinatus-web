import { getAllPostIds, getPostData } from '../../../lib/posts';
import Date from '../../../components/date';

// This replaces getStaticPaths
export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths.map((path) => ({
    id: path.params.id,
  }));
}

export default async function Post({ params }) {
  const postData = await getPostData(params.id);
  return (
    <article>
      <h1>{postData.title}</h1>
      <div>
        <Date dateString={postData.date} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
  );
}