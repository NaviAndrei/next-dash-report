import React from 'react';
import Navbar from '@/components/home/navbar';
import Hero from '@/components/home/hero';
import Features from '@/components/home/features';
import Pricing from '@/components/home/pricing';
import FAQ from '@/components/home/faq';
import Contact from '@/components/home/contact';
import Footer from '@/components/home/footer';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
} 