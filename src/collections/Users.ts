import type { CollectionConfig } from 'payload'

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
    singular: 'მომხმარებელი',
    plural: 'მომხმარებლები',
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'role',
      label: 'როლი',
      type: 'select',
      options: [
        {
          label: 'admin',
          value: 'admin',
        },
        {
          label: 'editor',
          value: 'editor',
        },
        {
          label: 'viewer',
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
      label: 'სახელი',
      required: true,
      access: {
        update: ({ req }) => req.user?.role === 'admin',
      },
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'გვარი',
      required: true,
      access: {
        update: ({ req }) => req.user?.role === 'admin',
      },
    },
  ],
}
