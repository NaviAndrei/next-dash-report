import React from 'react';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "What is this SaaS platform?",
    answer: "Our platform is a complete solution for managing your business, offering analytics, automation, CRM, and many other features in an intuitive and easy-to-use interface."
  },
  {
    question: "How can I start with the platform?",
    answer: "You can start by creating a free account that gives you access to all basic features for 14 days. No credit card information is required for the trial period."
  },
  {
    question: "Can I cancel at any time?",
    answer: "Yes, you can cancel your subscription at any time, with no additional costs. Your data will remain available for another 30 days after cancellation, allowing you to export it if you wish."
  },
  {
    question: "What happens after the trial period?",
    answer: "After the 14-day trial period, you will be asked to choose a subscription plan to continue using the platform. If you don't wish to continue, your account will be deactivated, but your data will remain available for another 30 days."
  },
  {
    question: "How does support work?",
    answer: "We provide email support for all users. Customers with Professional and Enterprise plans benefit from priority support, and Enterprise customers have access to a dedicated account manager and 24/7 phone support."
  },
  {
    question: "Can I export my data?",
    answer: "Yes, our platform offers complete export options for all your data in standard formats such as CSV, JSON, or Excel. The data always belongs to you."
  },
  {
    question: "Do you have an SLA (Service Level Agreement)?",
    answer: "Yes, we guarantee 99.9% availability for all customers. Enterprise customers benefit from a customized SLA with 99.99% availability and compensation for any service interruption."
  }
];

export default function FAQ() {
  return (
    <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              FAQ
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Find answers to the most common questions about our platform.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-3xl mt-8">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-base font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Can't find the answer you're looking for? <Link href="/#contact" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Contact us</Link>
          </p>
        </div>
      </div>
    </section>
  );
} 