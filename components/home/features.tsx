import React from 'react';
import { 
  BarChart, 
  Clock, 
  ArrowUpRight, 
  ShieldCheck, 
  LifeBuoy, 
  Settings2
} from 'lucide-react';

export default function Features() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Everything you need in one platform
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform provides all the tools you need to efficiently manage your business and help it grow.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {/* Feature 1 */}
          <div className="flex flex-col items-start gap-2 rounded-lg border p-6 bg-background shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <BarChart className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Advanced Analytics</h3>
            <p className="text-muted-foreground">
              Get valuable insights about your business performance with detailed reports and intuitive charts.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-start gap-2 rounded-lg border p-6 bg-background shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Automation</h3>
            <p className="text-muted-foreground">
              Save valuable time by automating repetitive tasks and business processes.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-start gap-2 rounded-lg border p-6 bg-background shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <ArrowUpRight className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Scalability</h3>
            <p className="text-muted-foreground">
              Grow your business without worries, our platform adapts to your evolving needs.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="flex flex-col items-start gap-2 rounded-lg border p-6 bg-background shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Advanced Security</h3>
            <p className="text-muted-foreground">
              Your data is protected with the most advanced security and encryption technologies.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="flex flex-col items-start gap-2 rounded-lg border p-6 bg-background shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <LifeBuoy className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Premium Support</h3>
            <p className="text-muted-foreground">
              Our team of experts is available 24/7 to help you with anything you need.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="flex flex-col items-start gap-2 rounded-lg border p-6 bg-background shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Settings2 className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Complete Customization</h3>
            <p className="text-muted-foreground">
              Adapt the platform to your specific business needs with extensive customization options.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 