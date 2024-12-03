import { nanoid } from 'nanoid'
import type { CollectionConfig } from 'payload'
import { slugify } from 'transliteration'

export const Categories: CollectionConfig = {
  slug: 'categories',
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
    singular: 'კატეგორია',
    plural: 'კატეგორიები',
  },
  upload: true,
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

        const slug = baseSlug.toLowerCase().concat(`-${nanoid(2)}`)

        if (data) {
          data.slug = slug || ''
        }
      },
    ],
  },
}
