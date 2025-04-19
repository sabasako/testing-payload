import { nanoid } from 'nanoid'
import type { CollectionConfig } from 'payload'
import { slugify } from 'transliteration'

export const Furniture: CollectionConfig = {
  slug: 'furniture',
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
      en: 'Furniture',
      ka: 'ავეჯი',
    },
    plural: {
      en: 'Furnitures',
      ka: 'ავეჯები',
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
        en: 'Description',
        ka: 'აღწერა',
      },
      type: 'richText',
      required: false,
      localized: true,
    },
    {
      name: 'price',
      label: {
        en: 'Price',
        ka: 'ფასი',
      },
      type: 'number',
      required: true,
    },
    {
      name: 'discountedPrice',
      label: {
        en: 'Discounted Price',
        ka: 'ფასდაკლებული ფასი',
      },
      type: 'number',
      required: false,
    },
    {
      name: 'size',
      label: {
        en: 'Size',
        ka: 'ზომა',
      },
      type: 'group',
      fields: [
        {
          name: 'length',
          type: 'number',
          label: {
            en: 'Length',
            ka: 'სიგრძე',
          },
          required: true,
        },
        {
          name: 'width',
          type: 'number',
          label: {
            en: 'Width',
            ka: 'სიგანე',
          },
          required: true,
        },
        {
          name: 'height',
          type: 'number',
          label: {
            en: 'Height',
            ka: 'სიმაღლე',
          },
          required: true,
        },
      ],
      admin: {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
        },
      },
    },
    {
      name: 'mainImage',
      label: {
        en: 'Main Image',
        ka: 'მთავარი სურათი',
      },
      type: 'upload',
      relationTo: 'furniture-images',
      required: true,
      filterOptions: {
        mediaType: { equals: 'main-image' },
      },
    },
    {
      name: 'additionalImages',
      label: {
        en: 'Additional Images',
        ka: 'დამატებითი სურათები',
      },
      type: 'upload',
      relationTo: 'furniture-images',
      hasMany: true,
      filterOptions: {
        mediaType: { equals: 'additional-image' },
      },
    },
    {
      name: '3dModel',
      label: {
        en: '3D Model',
        ka: '3D მოდელი',
      },
      type: 'upload',
      relationTo: 'models',
    },
    {
      name: 'category',
      label: {
        en: 'Category',
        ka: 'კატეგორია',
      },
      type: 'array',
      fields: [
        {
          name: 'title',
          label: 'სათაური',
          type: 'relationship',
          relationTo: 'categories',
          required: true,
        },
      ],
      required: true,
    },
    {
      name: 'shop',
      label: {
        en: 'Shop',
        ka: 'მაღაზია',
      },
      type: 'array',
      fields: [
        {
          name: 'name',
          label: 'სახელი',
          type: 'relationship',
          relationTo: 'shop',
          required: true,
        },
      ],
    },
    {
      name: 'colors',
      label: {
        en: 'Colors',
        ka: 'ფერები',
      },
      type: 'array',
      fields: [
        {
          name: 'color',
          label: {
            en: 'Color',
            ka: 'ფერი',
          },
          type: 'relationship',
          relationTo: 'color',
          required: true,
        },
      ],
    },
    {
      name: 'inStock',
      label: {
        en: 'In Stock',
        ka: 'შეკვეთით',
      },
      type: 'checkbox',
      required: false,
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
