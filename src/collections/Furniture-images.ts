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
    singular: 'ავეჯის სურათები და მოდელი',
    plural: 'ავეჯის სურათები და მოდელები',
  },
  upload: {
    staticDir: 'furniture-images',
    imageSizes: [
      {
        name: 'details',
        width: 600,
        height: 350,
        position: 'centre',
      },
      {
        name: 'card',
        width: 270,
        height: 170,
        position: 'centre',
      },
    ],
    adminThumbnail: 'card',
    mimeTypes: ['image/*', 'model/gltf-binary', 'model/gltf+json', 'model/obj'],
  },
  fields: [
    {
      name: 'mediaType',
      type: 'select',
      options: [
        { label: 'მთავარი სურათი', value: 'main-image' },
        { label: 'დამატებითი სურათები', value: 'additional-image' },
        { label: '3დ მოდელი', value: '3d-model' },
      ],
      required: true,
    },
    {
      name: 'alt',
      type: 'text',
      label: 'ალტერნატიული ტექსტი',
    },
  ],
}
