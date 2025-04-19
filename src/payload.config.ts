import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { FurnitureImages } from './collections/FurnitureImages'
import { Categories } from './collections/Categories'
import { Furniture } from './collections/Furniture'
import { Shop } from './collections/Shop'
import { Color } from './collections/Color'
import { BlogImages } from './collections/BlogImages'
import { BlogPost } from './collections/BlogPost'
import { resendAdapter } from '@payloadcms/email-resend'
import { s3Storage } from '@payloadcms/storage-s3'
import { en } from '@payloadcms/translations/languages/en'
import { customTranslations, ka } from './translations'
import { Models } from './collections/Models'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// const storage = s3Storage({
//   collections: {
//     'furniture-images': {
//       // adapter: 's3',
//       disableLocalStorage: true,
//       prefix: 'furniture-images', // Optional prefix for uploaded files
//       generateFileURL: ({ filename, prefix }: { filename: string; prefix?: string }) =>
//         `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${process.env.R2_BUCKET}/${prefix ? `${prefix}/` : ''}${filename}`,
//     },
//     // 'blog-images': {
//     //   disableLocalStorage: true,
//     //   prefix: 'blog-images',
//     //   generateFileURL: ({ filename, prefix }: { filename: string; prefix?: string }) => {
//     //     console.log(
//     //       `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${process.env.R2_BUCKET}/${prefix ? `${prefix}/` : ''}${filename}`,
//     //     )

//     //     return `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${process.env.R2_BUCKET}/${prefix ? `${prefix}/` : ''}${filename}`
//     //   },
//     // },
//   },
//   // disableLocalStorage: true,
//   // enabled: true,
//   // clientUploads: true,
//   bucket: process.env.R2_BUCKET!,
//   config: {
//     endpoint: process.env.R2_ENDPOINT!,
//     credentials: {
//       accessKeyId: process.env.R2_ACCESS_KEY_ID!,
//       secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
//     },
//     region: 'auto', // Required for R2
//     forcePathStyle: true, // Required for R2
//   },
// })

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  i18n: {
    fallbackLanguage: 'en',
    supportedLanguages: {
      en,
      ka,
    } as any,
    translations: customTranslations as any,
  },
  localization: {
    locales: [
      {
        label: 'English',
        code: 'en',
      },
      {
        label: 'ქართული',
        code: 'ka',
      },
    ],
    defaultLocale: 'ka',
  },
  collections: [
    Users,
    FurnitureImages,
    Categories,
    Furniture,
    Shop,
    Color,
    BlogImages,
    BlogPost,
    Models,
  ],
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
    // storage,
    // storage-adapter-placeholder
  ],
})
