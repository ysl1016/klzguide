import { defineDocumentType, makeSource } from 'contentlayer2/source-files';

export const Guide = defineDocumentType(() => ({
  name: 'Guide',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    difficulty: {
      type: 'enum',
      options: ['beginner', 'basic', 'intermediate', 'advanced', 'expert'],
      default: 'beginner',
    },
    readTime: {
      type: 'number',
      default: 5,
    },
    date: {
      type: 'date',
      required: true,
    },
    category: {
      type: 'string',
      required: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      default: [],
    },
    featured: {
      type: 'boolean',
      default: false,
    },
    draft: {
      type: 'boolean',
      default: false,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => {
        const pathParts = doc._raw.flattenedPath.split('/');
        return pathParts.slice(1).join('/');
      },
    },
    locale: {
      type: 'string',
      resolve: (doc) => {
        const pathParts = doc._raw.flattenedPath.split('/');
        return pathParts[0];
      },
    },
    url: {
      type: 'string',
      resolve: (doc) => {
        const pathParts = doc._raw.flattenedPath.split('/');
        const locale = pathParts[0];
        const slug = pathParts.slice(1).join('/');
        return `/${locale}/${slug}`;
      },
    },
  },
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Guide],
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});
