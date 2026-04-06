import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { industries } from '@/data/industries';

export default function LucenIndustries() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <p className="text-sm font-display tracking-[0.3em] uppercase text-primary mb-4">Spatial Coverage</p>
          <h2 className="font-display text-5xl sm:text-6xl font-bold tracking-tight text-foreground">
            Industries We Transform
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.slug}
              initial={{ opacity: 0, y: 30, filter: 'blur(15px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, boxShadow: '0 0 30px -8px hsl(192 95% 60% / 0.2)' }}
            >
              <Link
                to={`/industries/${ind.slug}`}
                className="glass-panel-elevated glow-edge p-5 text-center group cursor-pointer block"
              >
                <div className="text-3xl text-primary text-glow mb-4 group-hover:text-accent group-hover:text-glow-accent transition-all duration-500">
                  {ind.icon}
                </div>
                <h4 className="font-display text-base sm:text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {ind.name}
                </h4>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">{ind.value}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
