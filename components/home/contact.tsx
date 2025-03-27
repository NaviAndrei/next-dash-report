import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Contact
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Talk to us
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Have questions or want to learn more? Our team is ready to help you.
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12 mt-8">
          {/* Contact Form */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="first-name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  First Name
                </label>
                <Input id="first-name" placeholder="First Name" />
              </div>
              <div className="space-y-2">
                <label htmlFor="last-name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Last Name
                </label>
                <Input id="last-name" placeholder="Last Name" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email
              </label>
              <Input id="email" type="email" placeholder="email@example.com" />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Message
              </label>
              <Textarea className="min-h-[120px]" id="message" placeholder="How can we help you?" />
            </div>
            <Button className="w-full" size="lg">
              Send message
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2">
              We will respond as soon as possible, usually within 24 hours.
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="flex flex-col space-y-2 rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <MailIcon className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Email</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Send us an email at 
                <a href="mailto:contact@example.com" className="text-primary underline underline-offset-2 ml-1">
                  contact@example.com
                </a>
              </p>
            </div>
            
            <div className="flex flex-col space-y-2 rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <PhoneIcon className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Phone</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Call us at 
                <a href="tel:+40123456789" className="text-primary underline underline-offset-2 ml-1">
                  +40 123 456 789
                </a>
              </p>
              <p className="text-xs text-muted-foreground">
                Monday-Friday: 9:00 - 18:00
              </p>
            </div>
            
            <div className="flex flex-col space-y-2 rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Address</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Example Street, No. 123, Bucharest, Romania
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 