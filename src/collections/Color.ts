import { nanoid } from 'nanoid'
import type { CollectionConfig } from 'payload'
import { slugify } from 'transliteration'

export const Color: CollectionConfig = {
  slug: 'color',
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
    update: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
    delete: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
  },
  admin: {
    useAsTitle: 'color',
  },
  labels: {
    singular: {
      en: 'Color',
      ka: 'ფერი',
    },
    plural: {
      en: 'Colors',
      ka: 'ფერები',
    },
  },
  upload: false,
  fields: [
    {
      name: 'color',
      label: {
        en: 'Color',
        ka: 'ფერი',
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
  ],
  hooks: {
    beforeValidate: [
      async ({ data, operation }) => {
        // Generate the slug based on the title
        const color = data?.color || ''

        const baseSlug = slugify(color, {
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
