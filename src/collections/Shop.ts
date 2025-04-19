import { nanoid } from 'nanoid'
import type { CollectionConfig } from 'payload'
import { slugify } from 'transliteration'

export const Shop: CollectionConfig = {
  slug: 'shop',
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
    update: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
    delete: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
  },
  admin: {
    useAsTitle: 'name',
  },
  labels: {
    singular: {
      en: 'Shop',
      ka: 'მაღაზია',
    },
    plural: {
      en: 'Shops',
      ka: 'მაღაზიები',
    },
  },
  upload: true,
  fields: [
    {
      name: 'name',
      label: {
        en: 'Name',
        ka: 'სახელი',
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
        const name = data?.name || ''

        const baseSlug = slugify(name, {
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
