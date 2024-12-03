// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { en } from '@payloadcms/translations/languages/en'
// import { ka } from '@payloadcms/translations/languages/ka'

import { Users } from './collections/Users'
import { FurnitureImages } from './collections/Furniture-images'
import { Categories } from './collections/Categories'
import { Furniture } from './collections/Furniture'
import { Shop } from './collections/Shop'
import { Color } from './collections/Color'
import { BlogImages } from './collections/Blog-images'
import { BlogPost } from './collections/BlogPost'
import { resendAdapter } from '@payloadcms/email-resend'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  i18n: {
    fallbackLanguage: 'en',
    supportedLanguages: { en },
  },
  collections: [Users, FurnitureImages, Categories, Furniture, Shop, Color, BlogImages, BlogPost],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  email: resendAdapter({
    defaultFromAddress: 'dev@netpage.ge',
    defaultFromName: 'Netpage',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
