import { nanoid } from 'nanoid'
import type { CollectionConfig } from 'payload'
import { slugify } from 'transliteration'

export const BlogPost: CollectionConfig = {
  slug: 'blog-post',
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
    update: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
    delete: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
  },
  admin: {
    useAsTitle: 'title',
  },
  labels: {
    singular: 'ბლოგი',
    plural: 'ბლოგი',
  },
  fields: [
    {
      name: 'title',
      label: 'სათაური',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'description',
      label: 'მოკლე აღწერა',
      type: 'textarea',
      required: true,
    },
    {
      name: 'image',
      label: 'სურათი',
      type: 'upload',
      relationTo: 'blog-images',
      required: true,
    },
    {
      name: 'date',
      label: 'თარიღი',
      type: 'date',
      required: true,
    },
    {
      name: 'content',
      label: 'პოსტი',
      type: 'richText',
      required: true,
    },
  ],
  hooks: {
    beforeValidate: [
      async ({ data, operation }) => {
        // Generate the slug based on the title
        const title = data?.title || ''

        const baseSlug = slugify(title, {
          lowercase: true,
          separator: '-',
        })

        const slug = baseSlug.toLowerCase().concat(`-${nanoid(5)}`)

        if (data) {
          data.slug = slug || ''
        }
      },
    ],
  },
}
