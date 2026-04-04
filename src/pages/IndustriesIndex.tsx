import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LucenHeader from '@/components/LucenHeader';
import ParticleField from '@/components/ParticleField';
import CursorGlow from '@/components/CursorGlow';
import { industries } from '@/data/industries';
import { OptimizedImage } from '@/components/OptimizedMedia';

export default function IndustriesIndex() {
  return (
    <div className="relative min-h-screen">
      <ParticleField />
      <CursorGlow />
      <LucenHeader />

      <div className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <p className="text-sm font-display tracking-[0.3em] uppercase text-primary mb-4">Spatial Coverage</p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              Industries We Transform
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, i) => (
              <motion.div
                key={ind.slug}
                initial={{ opacity: 0, y: 30, filter: 'blur(15px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                whileHover={{ y: -6, boxShadow: '0 0 40px -8px hsl(192 95% 60% / 0.2)' }}
              >
                <Link to={`/industries/${ind.slug}`} className="block glass-panel-elevated glow-edge overflow-hidden group">
                  <div className="relative aspect-video overflow-hidden">
                    <OptimizedImage
                      src={ind.heroImage}
                      alt={ind.name}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  </div>
                  <div className="p-5 -mt-6 relative z-10">
                    <span className="text-primary text-lg mr-2">{ind.icon}</span>
                    <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors inline">{ind.name}</h3>
                    <p className="text-muted-foreground font-body text-xs mt-1">{ind.value}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
