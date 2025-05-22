import { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

const Post: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'publishedAt', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  timestamps: true,
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'content',
              type: 'richText',
              required: true,
              editor: lexicalEditor(),
              label: 'Post Content',
            },
          ],
        },
        {
          label: 'Meta',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Meta Title',
              admin: {
                description:
                  'Title used for social sharing and search engines. If empty, the main title will be used.',
              },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Meta Description',
              admin: {
                description: 'Brief description for social sharing and search engines.',
              },
            },
            {
              name: 'metaImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Meta Image',
              admin: {
                description: 'Image used when sharing the post on social media.',
              },
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'seoTitle',
              type: 'text',
              label: 'SEO Title',
              admin: {
                description: 'Custom title for SEO purposes. Overrides Meta Title if set.',
              },
            },
            {
              name: 'seoDescription',
              type: 'textarea',
              label: 'SEO Description',
              admin: {
                description:
                  'Custom description for SEO purposes. Overrides Meta Description if set.',
              },
            },
            {
              name: 'seoKeywords',
              type: 'array',
              label: 'SEO Keywords',
              minRows: 1,
              maxRows: 10,
              fields: [
                {
                  name: 'keyword',
                  type: 'text',
                  label: 'Keyword',
                  required: true,
                },
              ],
              admin: {
                description: 'Relevant keywords for search engine optimization.',
              },
            },
          ],
        },
      ],
    },
    // Sidebar Fields
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: {
        position: 'sidebar',
        description:
          'URL-friendly identifier. Auto-generated if left blank, but can be customized.',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Published At',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description:
          'Set a specific publish date and time. If in the future, the post will be scheduled.',
      },
      defaultValue: () => new Date(),
    },
    {
      name: 'authors',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
      label: 'Author(s)',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      defaultValue: 'draft',
      required: true,
      label: 'Status',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

export default Post
