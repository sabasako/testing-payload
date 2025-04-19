import type { CollectionConfig } from 'payload'
import { en } from 'payload/i18n/en'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: ({ req }) => {
      const user = req.user
      if (user?.role === 'admin') {
        return true // Admins can access everything
      }
      if (user?.id) {
        return { id: { equals: user.id } } // Users can access their own profile
      }
      return false // Deny access if user is not logged in or has no ID
    },
    update: ({ req }) => {
      const user = req.user
      if (user?.role === 'admin') {
        return true // Admins can update everything
      }
      if (user?.id) {
        return { id: { equals: user.id } } // Users can update their own profile
      }
      return false // Deny access if user is not logged in or has no ID
    },
    create: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  auth: true,
  // auth: {
  //   verify: true,
  // },
  labels: {
    singular: {
      en: 'User',
      ka: 'მომხმარებელი',
    },
    plural: {
      en: 'Users',
      ka: 'მომხმარებლები',
    },
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'role',
      label: {
        en: 'Role',
        ka: 'როლი',
      },
      type: 'select',
      options: [
        {
          label: {
            en: 'Admin',
            ka: 'ადმინისტრატორი',
          },
          value: 'admin',
        },
        {
          label: {
            en: 'Editor',
            ka: 'რედაქტორი',
          },
          value: 'editor',
        },
        {
          label: {
            en: 'Viewer',
            ka: 'ვიზიტორი',
          },
          value: 'viewer',
        },
      ],
      required: true,
      defaultValue: 'viewer',
      access: {
        update: ({ req }) => req.user?.role === 'admin', // Only admins can update roles
      },
    },
    {
      name: 'name',
      type: 'text',
      label: {
        en: 'Name',
        ka: 'სახელი',
      },
      required: true,
      access: {
        update: ({ req }) => req.user?.role === 'admin',
      },
    },
    {
      name: 'lastName',
      type: 'text',
      label: {
        en: 'Last Name',
        ka: 'გვარი',
      },
      required: true,
      access: {
        update: ({ req }) => req.user?.role === 'admin',
      },
    },
  ],
}
