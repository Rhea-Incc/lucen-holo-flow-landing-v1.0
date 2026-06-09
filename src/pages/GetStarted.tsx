import LucenFooter from '@/components/LucenFooter';
import { motion } from 'framer-motion';
import LucenHeader from '@/components/LucenHeader';
import ParticleField from '@/components/ParticleField';
import CursorGlow from '@/components/CursorGlow';
import Seo from '@/components/Seo';

export default function GetStarted() {
  return (
    <div className="relative min-h-screen">
      <Seo
        title="Get Started with Lucen — Request a Demo"
        description="Tell us about your space and goals. A Lucen specialist will design your holographic experience and respond within one business day."
        path="/get-started"
      />
      <ParticleField />
      <CursorGlow />
      <LucenHeader />

      <div className="pt-28 pb-20 px-6 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(15px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8 }}
          className="glass-panel-elevated glow-edge p-10 sm:p-14 max-w-xl w-full text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-16 h-16 mx-auto mb-8 rounded-full border border-primary/20 flex items-center justify-center"
            style={{ boxShadow: '0 0 50px -10px hsl(192 95% 60% / 0.3)' }}
          >
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse-glow" />
          </motion.div>

          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            <span className="lucen-gradient-text">Get Started with Lucen</span>
          </h1>
          <p className="text-muted-foreground font-body leading-relaxed mb-8">
            Ready to transform your physical spaces? Let's design your holographic experience.
          </p>

          <form className="space-y-5 text-left" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="font-display text-xs text-muted-foreground tracking-wide uppercase block mb-2">Company</label>
              <input className="w-full glass-panel px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30" placeholder="Your company" />
            </div>
            <div>
              <label className="font-display text-xs text-muted-foreground tracking-wide uppercase block mb-2">Email</label>
              <input type="email" className="w-full glass-panel px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30" placeholder="your@email.com" />
            </div>
            <div>
              <label className="font-display text-xs text-muted-foreground tracking-wide uppercase block mb-2">Industry</label>
              <input className="w-full glass-panel px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30" placeholder="e.g. Retail, Real Estate, Automotive..." />
            </div>
            <button className="w-full glass-panel-elevated glow-edge px-8 py-4 font-display text-sm font-medium tracking-wide text-primary hover:text-foreground transition-colors duration-300">
              Request a Demo
            </button>
          </form>
        </motion.div>
      </div>
      <LucenFooter />
    </div>
  );
}

