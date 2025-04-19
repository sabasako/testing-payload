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
    singular: {
      en: 'Blog Post',
      ka: 'ბლოგის პოსტი',
    },
    plural: {
      en: 'Blog Posts',
      ka: 'ბლოგის პოსტები',
    },
  },
  fields: [
    {
      name: 'title',
      label: {
        en: 'Title',
        ka: 'სათაური',
      },
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      label: {
        en: 'Slug',
        ka: 'სლაგი',
      },
      type: 'text',
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'description',
      label: {
        en: 'Small description',
        ka: 'მოკლე აღწერა',
      },
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'image',
      label: {
        en: 'Image',
        ka: 'სურათი',
      },
      type: 'upload',
      relationTo: 'blog-images',
      required: true,
    },
    {
      name: 'date',
      label: {
        en: 'Date',
        ka: 'თარიღი',
      },
      type: 'date',
      required: true,
    },
    {
      name: 'content',
      label: {
        en: 'Content',
        ka: 'პოსტი',
      },
      type: 'richText',
      required: true,
      localized: true,
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
