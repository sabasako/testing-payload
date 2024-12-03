'use client'

import { Furniture } from '@/payload-types'
import { PaginatedDocs } from 'payload'

export default function ClientComponent({ data }: { data: PaginatedDocs<Furniture> }) {
  return (
    <>
      <p>{data.docs[0].title}</p>
      <p>{data.docs[0].slug}</p>
      <p>{data.docs[0].inStock ? 'true' : 'false'}</p>
    </>
  )
}
