import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCases } from '@/data/usecases';
import MediaGallery from '@/components/MediaGallery';
import LucenHeader from '@/components/LucenHeader';
import ParticleField from '@/components/ParticleField';
import CursorGlow from '@/components/CursorGlow';
import Seo from '@/components/Seo';

export default function UseCasePage() {
  const { slug } = useParams<{ slug: string }>();
  const useCase = useCases.find((u) => u.slug === slug);

  if (!useCase) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LucenHeader />
        <div className="text-center pt-20">
          <h1 className="font-display text-3xl text-foreground mb-4">Use Case Not Found</h1>
          <Link to="/" className="text-primary hover:underline">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <Seo
        title={`${useCase.title} — Lucen Use Case`}
        description={useCase.description.slice(0, 155)}
        path={`/use-cases/${useCase.slug}`}
      />
      <ParticleField />
      <CursorGlow />
      <LucenHeader />

      <div className="pt-24 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(15px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <div className="md:hidden">
              <div className="w-full" style={{ height: '80vh' }}>
                <MediaGallery images={useCase.images} videos={useCase.videos} title={useCase.title} />
              </div>
            </div>
            <div className="hidden md:block">
              <MediaGallery images={useCase.images} videos={useCase.videos} title={useCase.title} />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-sm font-display tracking-[0.3em] uppercase text-primary mb-4">Use Case</p>
              <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-6">
                {useCase.title}
              </h1>
              <p className="text-muted-foreground font-body text-lg leading-relaxed">
                {useCase.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="font-display text-xl font-semibold text-foreground mb-6">Key Highlights</h3>
              <div className="space-y-3">
                {useCase.highlights.map((h, i) => (
                  <motion.div
                    key={h}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    className="glass-panel-elevated glow-edge p-4 flex items-center gap-3 group"
                  >
                    <span className="text-primary text-glow text-sm">◉</span>
                    <span className="font-body text-sm text-foreground group-hover:text-primary transition-colors">{h}</span>
                  </motion.div>
                ))}
              </div>

              <Link
                to="/get-started"
                className="mt-8 inline-block glass-panel-elevated glow-edge px-8 py-3 font-display text-sm font-medium tracking-wide text-primary hover:text-foreground transition-colors duration-300"
              >
                Get Started
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
