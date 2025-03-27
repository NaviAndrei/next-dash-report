import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Your Ultimate Dashboard Solution
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Organize, analyze, and visualize your data with our intuitive dashboard platform. Start your journey today.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/dashboard">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link href="/#features">
                <Button variant="outline" size="lg">Learn More</Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full aspect-video rounded-xl bg-muted">
              {/* Imagine placeholder - va fi înlocuită */}
              <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                {/* Înlocuiește placeholder-ul cu imaginea reală */}
                <Image 
                  src="/images/hero.png" 
                  alt="Dashboard interface showcase" 
                  fill 
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 