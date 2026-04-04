import { motion } from 'framer-motion';

const networkNodes = [
  'Malls', 'Airports', 'Banks', 'Retail', 'Events', 'Corporate',
  'Hotels', 'Train Stations', 'Stadiums', 'Hospitals', 'Convention Centers', 'Metro Stations',
];

export default function LucenNetwork() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="text-sm font-display tracking-[0.3em] uppercase text-primary mb-4">Spatial Network</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-6">
            Public Space Infrastructure
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto">
            Lucen builds and monetizes physical media networks in high-footfall environments.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel-elevated glow-edge p-10 sm:p-16 relative"
        >
          {/* Animated connection lines */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
            <svg className="w-full h-full opacity-15" viewBox="0 0 100 100" preserveAspectRatio="none">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.line
                  key={`h-${i}`}
                  x1="0" y1={20 + i * 15} x2="100" y2={20 + i * 15}
                  stroke="hsl(192 95% 60%)"
                  strokeWidth="0.15"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: i * 0.2 }}
                />
              ))}
              {[0, 1, 2, 3].map((i) => (
                <motion.line
                  key={`v-${i}`}
                  x1={15 + i * 22} y1="0" x2={15 + i * 22} y2="100"
                  stroke="hsl(260 80% 65%)"
                  strokeWidth="0.12"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 0.5 + i * 0.2 }}
                />
              ))}
            </svg>
          </div>

          <div className="relative grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
            {networkNodes.map((node, i) => (
              <motion.div
                key={node}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.1 }}
                className="relative flex flex-col items-center"
              >
                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 20px -8px hsl(192 95% 60% / 0.2)',
                      '0 0 40px -8px hsl(192 95% 60% / 0.5)',
                      '0 0 20px -8px hsl(192 95% 60% / 0.2)',
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                  className="w-14 h-14 rounded-full border border-primary/30 flex items-center justify-center mb-3"
                >
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                </motion.div>
                <span className="font-display text-[10px] tracking-wider text-muted-foreground uppercase text-center">{node}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
