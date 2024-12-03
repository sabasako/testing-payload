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
    singular: 'ავეჯი',
    plural: 'ავეჯები',
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
      label: 'აღწერა',
      type: 'richText',
      required: false,
    },
    {
      name: 'price',
      label: 'ფასი',
      type: 'number',
      required: true,
    },
    {
      name: 'discountedPrice',
      label: 'ფასდაკლებული ფასი',
      type: 'number',
      required: false,
    },
    {
      name: 'size', // Field name
      label: 'ზომა (სმ)', // Field label
      type: 'group', // Group type to nest related fields
      fields: [
        {
          name: 'length', // Sub-field name
          type: 'number', // Sub-field type
          label: 'სიგრძე', // Sub-field label
          required: true, // Make the field required (optional)
        },
        {
          name: 'width',
          type: 'number',
          label: 'სიგანე',
          required: true,
        },
        {
          name: 'height',
          type: 'number',
          label: 'სიმაღლე',
          required: true,
        },
      ],
      admin: {
        style: {
          display: 'grid', // Use grid layout for better alignment
          gridTemplateColumns: 'repeat(3, 1fr)', // 3 equal-width columns
          gap: '1rem', // Optional spacing between fields
        },
      },
    },
    {
      name: 'mainImage',
      label: 'მთავარი სურათი',
      type: 'upload',
      relationTo: 'furniture-images',
      required: true,
      filterOptions: {
        mediaType: { equals: 'main-image' },
      },
    },
    {
      name: 'additionalImages',
      label: 'დამატებითი სურათები',
      type: 'upload',
      relationTo: 'furniture-images',
      hasMany: true,
      filterOptions: {
        mediaType: { equals: 'additional-image' },
      },
    },
    {
      name: '3dModel',
      label: '3დ მოდელი',
      type: 'upload',
      relationTo: 'furniture-images',
      filterOptions: {
        mediaType: { equals: '3d-model' },
      },
    },
    {
      name: 'category',
      label: 'კატეგორია',
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
      label: 'მაღაზია',
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
      label: 'ფერები',
      type: 'array',
      fields: [
        {
          name: 'color',
          label: 'ფერი',
          type: 'relationship',
          relationTo: 'color',
          required: true,
        },
      ],
    },
    {
      name: 'inStock',
      label: 'მარაგშია',
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
