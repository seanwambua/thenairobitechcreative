'use client';

import { Users, Lightbulb, TrendingUp, CircleCheck } from 'lucide-react';

const benefits = [
  {
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    title: 'Innovative Solutions',
    description:
      'We are driven by a relentless pursuit of innovation, constantly exploring new technologies and strategies to stay ahead of the curve.',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Collaborative Partnerships',
    description:
      'We believe in the power of teamwork. We work closely with our clients, fostering a collaborative environment to achieve shared goals.',
  },

  {
    icon: <CircleCheck className="h-8 w-8 text-primary" />,
    title: 'Proven Expertise',
    description:
      'Our team consists of industry experts with a proven track record of success. We bring a wealth of knowledge and experience to every project.',
  },
];

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="bg-primary/5 py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center font-headline text-4xl font-extrabold tracking-tight sm:text-5xl pb-10">
          Why Choose Us
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((value) => (
            <div
              key={value.title}
              className="flex flex-col items-center text-center"
            >
              {value.icon}
              <h3 className="mt-4 mb-2 text-2xl font-bold">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
