import { Helmet } from 'react-helmet-async';

interface SeoProps {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  image?: string;
}

const SITE = 'https://lucen-holo-flow.lovable.app';

export default function Seo({ title, description, path, type = 'website', image }: SeoProps) {
  const url = `${SITE}${path}`;
  const ogImage =
    image ||
    'https://storage.googleapis.com/gpt-engineer-file-uploads/FdJx4aJIVyRDCc8pVD6WYhkG19l2/social-images/social-1775238564626-Lucene-logo.webp';
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
