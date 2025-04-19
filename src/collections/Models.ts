import type { CollectionConfig } from 'payload'

export const Models: CollectionConfig = {
  slug: 'models',
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
    update: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
    delete: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
  },
  labels: {
    singular: {
      en: '3D model',
      ka: '3დ მოდელი',
    },
    plural: {
      en: '3D models',
      ka: '3D მოდელები',
    },
  },
  upload: {
    staticDir: 'models',
    mimeTypes: ['model/gltf-binary', 'model/gltf+json', 'model/obj'],
    // disableLocalStorage: true,
  },
  fields: [],
}
