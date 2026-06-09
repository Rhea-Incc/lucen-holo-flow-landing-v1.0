import Seo from '@/components/Seo';
import ParticleField from '@/components/ParticleField';
import CursorGlow from '@/components/CursorGlow';
import LucenHeader from '@/components/LucenHeader';
import LucenHero from '@/components/LucenHero';
import LucenDefinition from '@/components/LucenDefinition';
import LucenOfferings from '@/components/LucenOfferings';
import LucenPipeline from '@/components/LucenPipeline';
import LucenIndustries from '@/components/LucenIndustries';
import LucenUseCases from '@/components/LucenUseCases';
import LucenMediaGallery from '@/components/LucenMediaGallery';
import LucenBusinessModels from '@/components/LucenBusinessModels';
import LucenNetwork from '@/components/LucenNetwork';
import LucenEngine from '@/components/LucenEngine';
import LucenPartners from '@/components/LucenPartners';
import LucenClosing from '@/components/LucenClosing';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollSection from '@/components/ScrollSection';
import LucenFooter from '@/components/LucenFooter';


const Index = () => {
  return (
    <div className="relative min-h-screen">
      <Seo
        title="Lucen — Holographic Interface System"
        description="Lucen is a real-time holographic interface where media, motion, and light form a continuous intelligent system for retail, real estate, automotive, and DOOH."
        path="/"
      />
      <ParticleField />
      <CursorGlow />
      <LucenHeader />
      <WhatsAppButton />
      <LucenHero />

      <ScrollSection y={100} delay={0}>
        <LucenDefinition />
      </ScrollSection>

      <ScrollSection y={80} delay={0.05}>
        <LucenOfferings />
      </ScrollSection>

      <ScrollSection y={90} delay={0}>
        <LucenPipeline />
      </ScrollSection>

      <ScrollSection y={80} delay={0.05}>
        <LucenIndustries />
      </ScrollSection>

      <ScrollSection y={70}>
        <LucenUseCases />
      </ScrollSection>

      <ScrollSection y={60} scale={0.95}>
        <LucenMediaGallery />
      </ScrollSection>

      <ScrollSection y={80}>
        <LucenBusinessModels />
      </ScrollSection>

      <ScrollSection y={90}>
        <LucenNetwork />
      </ScrollSection>

      <ScrollSection y={80} scale={0.97}>
        <LucenEngine />
      </ScrollSection>

      <ScrollSection y={60}>
        <LucenPartners />
      </ScrollSection>

      <ScrollSection y={100}>
        <LucenClosing />
      </ScrollSection>

      <LucenFooter />

    </div>
  );
};

export default Index;
