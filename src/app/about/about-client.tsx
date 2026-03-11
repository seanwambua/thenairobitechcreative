'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Globe, Users, Lightbulb } from 'lucide-react';

// const teamMembers = [
//   {
//     name: 'Jane Doe',
//     role: 'CEO & Founder',
//     avatar: '/avatars/01.png',
//     bio: 'Jane is a visionary leader with a passion for helping businesses grow. She founded the company with the mission to deliver exceptional results through innovation and client-centric strategies.',
//   },
//   {
//     name: 'John Smith',
//     role: 'Head of Strategy',
//     avatar: '/avatars/02.png',
//     bio: 'John is a master strategist with a knack for seeing the bigger picture. He leads our team in developing data-driven strategies that drive sustainable growth for our clients.',
//   },
//   {
//     name: 'Emily Jones',
//     role: 'Lead Developer',
//     avatar: '/avatars/03.png',
//     bio: 'Emily is the architect of our technology solutions. Her expertise in cutting-edge development ensures that our clients benefit from robust and scalable platforms.',
//   },
// ];

const coreValues = [
  {
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    title: 'Innovation',
    description: 'We are driven by a relentless pursuit of innovation, constantly exploring new technologies and strategies to stay ahead of the curve.',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Collaboration',
    description: 'We believe in the power of teamwork. We work closely with our clients, fostering a collaborative environment to achieve shared goals.',
  },
  {
    icon: <Globe className="h-8 w-8 text-primary" />,
    title: 'Sustainability',
    description: 'We are committed to building solutions that are not only innovative but also environmentally responsible and sustainable for the long term.',
  },
];


export function AboutClient({
  founderImage,
  founderName,
  founderMessage,
}: {
  founderImage: string | null;
  founderName: string | null;
  founderMessage: string | null;
}) {
  return (
    <div className="bg-background text-foreground">
      <header className="bg-primary/5 text-center py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            About Us
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
            We are a team of passionate innovators dedicated to solving complex challenges and delivering outstanding results for our clients.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 md:px-6 md:py-20">
        {/* <section id="who-we-are" className="mb-20">
          <h2 className="mb-12 text-center font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">
            Who We Are
          </h2>
          <div className="grid gap-10 md:grid-cols-3">
            {teamMembers.map((member) => (
              <Card key={member.name} className="text-center">
                <CardHeader>
                  <Avatar className="mx-auto h-24 w-24 mb-4">
                    <AvatarImage src={member.avatar} alt={`Portrait of ${member.name}`} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <CardTitle>{member.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section> */}

        {/* <Separator className="my-20" /> */}

        <section id="our-mission" className="mb-20 text-center">
            <h2 className="mb-6 font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">
                Our Mission
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
                To empower businesses with transformative digital solutions that are not only effective but also perfectly aligned with their unique vision for success. We are committed to transparency, collaboration, and continuous optimization.
            </p>
        </section>


        <section id="core-values" className="mb-20">
          <h2 className="mb-12 text-center font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">
            Our Core Values
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {coreValues.map((value) => (
                <div key={value.title} className="flex flex-col items-center text-center">
                    {value.icon}
                    <h3 className="mt-4 mb-2 text-2xl font-bold">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                </div>
            ))}
          </div>
        </section>

        {founderName && founderMessage && (
          <>
            <Separator className="my-20" />
            <section id="founder" className="bg-primary/5 rounded-lg p-12">
              <div className="flex flex-col items-center text-center">
                {founderImage && (
                  <Avatar className="mb-4 h-24 w-24">
                    <AvatarImage
                      src={founderImage}
                      alt={`A portrait of ${founderName}`}
                    />
                    <AvatarFallback>{founderName.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <h3 className="font-headline text-3xl font-bold">{founderName}</h3>
                <p className="text-sm text-muted-foreground">Founder</p>
                <p className="mt-4 max-w-2xl text-lg font-medium italic">
                  &ldquo;{founderMessage}&rdquo;
                </p>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
