import type { CollectionConfig } from 'payload'

export const FurnitureImages: CollectionConfig = {
  slug: 'furniture-images',
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
    update: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
    delete: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
  },
  labels: {
    singular: {
      en: 'Furniture image',
      ka: 'ავეჯის სურათი',
    },
    plural: {
      en: 'Furniture images',
      ka: 'ავეჯის სურათები',
    },
  },
  upload: {
    staticDir: 'furniture-images',
    mimeTypes: ['image/*'],
    // disableLocalStorage: true,
  },
  fields: [
    {
      name: 'mediaType',
      type: 'select',
      options: [
        {
          label: {
            en: 'Main image',
            ka: 'მთავარი სურათი',
          },
          value: 'main-image',
        },
        {
          label: {
            en: 'Additional images',
            ka: 'დამატებითი სურათები',
          },
          value: 'additional-image',
        },
        // {
        //   label: {
        //     en: '3D model',
        //     ka: '3D მოდელი',
        //   },
        //   value: '3d-model',
        // },
      ],
      required: true,
    },
    {
      name: 'alt',
      type: 'text',
      label: {
        en: 'Alt Text',
        ka: 'ალტ ტექსტი',
      },
      localized: true,
    },
  ],
}
