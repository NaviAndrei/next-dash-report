'use client';

import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for those who are just starting",
    price: 49,
    duration: "month",
    features: [
      "All basic features",
      "Up to 5 users",
      "10GB storage",
      "Email support",
      "Regular updates"
    ],
    highlighted: false,
    buttonText: "Start now"
  },
  {
    name: "Professional",
    description: "For growing teams",
    price: 99,
    duration: "month",
    features: [
      "All Starter features",
      "Up to 20 users",
      "50GB storage",
      "Priority support",
      "API access",
      "Advanced integrations"
    ],
    highlighted: true,
    buttonText: "Popular choice"
  },
  {
    name: "Enterprise",
    description: "For large businesses",
    price: 249,
    duration: "month",
    features: [
      "All Professional features",
      "Unlimited users",
      "Unlimited storage",
      "24/7 support",
      "Dedicated account manager",
      "Complete customization",
      "Dedicated training"
    ],
    highlighted: false,
    buttonText: "Contact us"
  }
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  
  // Calculate the annual discount (20% off)
  const calculateAnnualPrice = (monthlyPrice: number): string => {
    return (monthlyPrice * 0.8).toFixed(0); // 20% discount rounded to integer
  };

  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Pricing
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Simple and transparent plans
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the plan that best fits your needs. All plans include a 14-day trial period.
            </p>
          </div>
          
          {/* Pricing Toggle */}
          <div className="flex justify-center mt-8 mb-10">
            <div className="relative flex items-center p-1 bg-muted/80 dark:bg-muted/20 rounded-full shadow-inner w-[220px]">
              <span className="absolute inset-0 m-1 pointer-events-none" aria-hidden="true">
                <span 
                  className={`absolute inset-0 w-1/2 bg-primary dark:bg-primary rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                    isAnnual ? 'translate-x-full' : 'translate-x-0'
                  }`}
                ></span>
              </span>
              <button
                className={`relative z-10 flex-1 py-2 px-4 text-sm font-medium rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors duration-200 ease-in-out ${
                  isAnnual 
                    ? 'text-muted-foreground dark:text-muted-foreground' 
                    : 'text-white dark:text-primary-foreground font-semibold'
                }`}
                onClick={() => setIsAnnual(false)}
                role="switch"
                aria-checked="false"
              >
                Monthly
              </button>
              <button
                className={`relative z-10 flex-1 py-2 px-4 text-sm font-medium rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors duration-200 ease-in-out ${
                  isAnnual 
                    ? 'text-white dark:text-primary-foreground font-semibold' 
                    : 'text-muted-foreground dark:text-muted-foreground'
                }`}
                onClick={() => setIsAnnual(true)}
                role="switch"
                aria-checked="true"
              >
                Annually <span className="text-xs ml-1 font-medium bg-white/20 dark:bg-white/30 text-white dark:text-primary-foreground px-1.5 py-0.5 rounded-full">-20%</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 mx-auto mt-8">
          {pricingPlans.map((plan) => {
            const monthlyPrice = plan.price;
            const annualPrice = calculateAnnualPrice(monthlyPrice);
            const displayPrice = isAnnual ? annualPrice : monthlyPrice;
            
            return (
              <div 
                key={plan.name}
                className={`flex flex-col rounded-xl border p-6 shadow-sm ${
                  plan.highlighted 
                    ? 'bg-primary/5 border-primary ring-1 ring-primary' 
                    : 'bg-background'
                }`}
              >
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold">€{displayPrice}</span>
                  <span className="ml-1 text-muted-foreground">/{plan.duration}</span>
                </div>
                {isAnnual && (
                  <div className="mt-1 text-sm text-muted-foreground">
                    <span className="line-through">€{monthlyPrice}</span> per month with annual billing
                  </div>
                )}
                <div className="mt-6 flex flex-col gap-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4">
                  <Button 
                    className="w-full" 
                    variant={plan.highlighted ? "default" : "outline"}
                  >
                    {plan.buttonText}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>All prices are in Euro and do not include VAT. {!isAnnual && (
            <button 
              onClick={() => setIsAnnual(true)} 
              className="font-medium underline underline-offset-4 cursor-pointer hover:text-primary"
            >
              Save 20% with annual billing
            </button>
          )}</p>
        </div>
      </div>
    </section>
  );
} 