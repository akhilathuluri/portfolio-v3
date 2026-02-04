import { Projects } from 'app/components/projects'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Projects',
  description: 'View my projects.',
}

export default async function Page() {
  return (
    <section>
      <h1 className="font-semibold mb-8">Projects</h1>
      <Projects />
    </section>
  )
}
