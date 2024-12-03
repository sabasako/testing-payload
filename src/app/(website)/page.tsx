import { getPayload } from 'payload'
import config from '@payload-config'
import ClientComponent from '@/components/ClientComponent'

const payload = await getPayload({ config })

export default async function MainPage() {
  const colors = await payload.find({
    collection: 'color',
  })

  const furniture = await payload.find({
    collection: 'furniture',
  })

  return (
    <main>
      <ClientComponent data={furniture} />
    </main>
  )
}
