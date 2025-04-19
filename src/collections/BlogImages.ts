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
    singular: {
      en: 'Blog Image',
      ka: 'ბლოგის სურათი',
    },
    plural: {
      en: 'Blog Images',
      ka: 'ბლოგის სურათები',
    },
  },
  upload: {
    staticDir: 'blog-images',
    // adminThumbnail: 'card',
    // disableLocalStorage: true,
    mimeTypes: ['image/*'],
    formatOptions: {
      format: 'webp',
      options: {
        quality: 80,
      },
    },
  },
  fields: [
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
