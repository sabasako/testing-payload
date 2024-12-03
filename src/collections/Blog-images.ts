import type { CollectionConfig } from 'payload'

export const BlogImages: CollectionConfig = {
  slug: 'blog-images',
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
    update: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
    delete: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
  },
  labels: {
    singular: 'ბლოგის სურათები',
    plural: 'ბლოგის სურათები',
  },
  upload: {
    staticDir: 'blog-images',
    adminThumbnail: 'card',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'ალტერნატიული ტექსტი',
    },
  ],
}
