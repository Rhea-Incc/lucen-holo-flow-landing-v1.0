import { motion } from 'framer-motion';
import LucenHeader from '@/components/LucenHeader';
import ParticleField from '@/components/ParticleField';
import CursorGlow from '@/components/CursorGlow';

export default function Contact() {
  return (
    <div className="relative min-h-screen">
      <ParticleField />
      <CursorGlow />
      <LucenHeader />

      <div className="pt-28 pb-20 px-6 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(15px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8 }}
          className="glass-panel-elevated glow-edge p-10 sm:p-14 max-w-xl w-full"
        >
          <p className="text-sm font-display tracking-[0.3em] uppercase text-primary mb-4">Reach Out</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-8">Contact Us</h1>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="font-display text-xs text-muted-foreground tracking-wide uppercase block mb-2">Name</label>
              <input className="w-full glass-panel px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30" placeholder="Your name" />
            </div>
            <div>
              <label className="font-display text-xs text-muted-foreground tracking-wide uppercase block mb-2">Email</label>
              <input type="email" className="w-full glass-panel px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30" placeholder="your@email.com" />
            </div>
            <div>
              <label className="font-display text-xs text-muted-foreground tracking-wide uppercase block mb-2">Message</label>
              <textarea rows={4} className="w-full glass-panel px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30 resize-none" placeholder="Tell us about your project..." />
            </div>
            <button className="w-full glass-panel-elevated glow-edge px-8 py-3 font-display text-sm font-medium tracking-wide text-primary hover:text-foreground transition-colors duration-300">
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
