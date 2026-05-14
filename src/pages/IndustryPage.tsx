import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { industries } from '@/data/industries';
import { useCases } from '@/data/usecases';
import MediaGallery from '@/components/MediaGallery';
import LucenHeader from '@/components/LucenHeader';
import ParticleField from '@/components/ParticleField';
import CursorGlow from '@/components/CursorGlow';
import Seo from '@/components/Seo';

export default function IndustryPage() {
  const { slug } = useParams<{ slug: string }>();
  const industry = industries.find((i) => i.slug === slug);

  if (!industry) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LucenHeader />
        <div className="text-center pt-20">
          <h1 className="font-display text-3xl text-foreground mb-4">Industry Not Found</h1>
          <Link to="/" className="text-primary hover:underline">Back to Home</Link>
        </div>
      </div>
    );
  }

  const relatedUseCases = useCases.filter((u) => u.industrySlug === industry.slug);

  return (
    <div className="relative min-h-screen">
      <Seo
        title={`${industry.name} — Lucen Holographic Solutions`}
        description={industry.description.slice(0, 155)}
        path={`/industries/${industry.slug}`}
      />
      <ParticleField />
      <CursorGlow />
      <LucenHeader />

      <div className="pt-24 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(15px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <div className="md:hidden">
              <div className="w-full" style={{ height: '70vh' }}>
                <MediaGallery images={industry.images} videos={industry.videos} title={industry.name} />
              </div>
            </div>
            <div className="hidden md:block">
              <MediaGallery images={industry.images} videos={industry.videos} title={industry.name} />
            </div>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12 max-w-4xl"
          >
            <p className="text-sm font-display tracking-[0.3em] uppercase text-primary mb-4">{industry.icon} Industry</p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-6">{industry.name}</h1>
            <p className="text-muted-foreground font-body text-lg leading-relaxed mb-4">{industry.value}</p>
            <p className="text-muted-foreground font-body leading-relaxed">{industry.description}</p>
          </motion.div>

          {/* Metrics */}
          {industry.metrics && industry.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-16">
              {industry.metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="glass-panel-elevated glow-edge p-6 text-center"
                >
                  <p className="font-display text-3xl sm:text-4xl font-semibold text-primary text-glow mb-1">{m.value}</p>
                  <p className="text-muted-foreground text-xs tracking-wide uppercase">{m.label}</p>
                </motion.div>
              ))}
            </div>
          )}

          {/* Insights + Services / Deployments */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
            {industry.insights && industry.insights.length > 0 && (
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-6">Why it works in {industry.name}</h3>
                <div className="space-y-3">
                  {industry.insights.map((ins) => (
                    <div key={ins} className="glass-panel p-4 rounded-md text-sm font-body text-muted-foreground leading-relaxed border-l-2 border-primary/40">
                      {ins}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-6">Our services</h3>
              <div className="space-y-3">
                {industry.services.map((service) => (
                  <div key={service} className="glass-panel-elevated glow-edge p-4 flex items-center gap-3 group rounded-md">
                    <span className="text-primary text-glow text-sm">◉</span>
                    <span className="font-body text-sm text-foreground group-hover:text-primary transition-colors">{service}</span>
                  </div>
                ))}
              </div>
              {industry.deployments && (
                <div className="mt-6">
                  <p className="font-display text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">Typical deployments</p>
                  <div className="flex flex-wrap gap-2">
                    {industry.deployments.map((d) => (
                      <span key={d} className="glass-panel px-3 py-1.5 rounded-full text-xs font-body text-foreground/80">{d}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related use cases */}
          {relatedUseCases.length > 0 && (
            <div className="mb-16">
              <h3 className="font-display text-xl font-semibold text-foreground mb-6">Use cases in {industry.name}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedUseCases.map((u) => (
                  <Link key={u.slug} to={`/use-cases/${u.slug}`} className="glass-panel-elevated glow-edge p-5 group block">
                    <p className="font-display text-base text-foreground group-hover:text-primary transition-colors">{u.title}</p>
                    <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{u.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Industry-tailored Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel-elevated glow-edge p-8 sm:p-10 text-center"
          >
            <p className="text-sm font-display tracking-[0.3em] uppercase text-primary mb-3">Tailored for {industry.name}</p>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3">Scope your {industry.name.toLowerCase()} deployment</h3>
            <p className="text-muted-foreground font-body mb-6 max-w-xl mx-auto">
              Tell us about the venue, audience and outcomes you’re targeting. A specialist will reply within one business day.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to={`/contact?industry=${industry.slug}`}
                className="glass-panel-elevated glow-edge px-8 py-3 font-display text-sm font-medium tracking-wide text-primary hover:text-foreground transition-colors duration-300"
              >
                Start with {industry.name} brief
              </Link>
              <a
                href={`mailto:holograms@lucene.co?subject=${encodeURIComponent(`${industry.name} — Lucen enquiry`)}`}
                className="glass-panel px-6 py-3 rounded-md font-display text-sm tracking-wide text-foreground hover:text-primary transition-colors"
              >
                Email holograms@lucene.co
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
