'use client';

import * as React from 'react';
import Link from 'next/link';
import { getProjects } from '@/lib/actions/projects';
import { getSetting } from '@/lib/actions/settings';
import { Project } from '@/lib/types';

import { Section } from '@/components/section';
import { Heading } from '@/components/heading';
import { ProjectCard } from '@/components/project-card';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';

export default function ProjectsPage() {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);
  const [title, setTitle] = React.useState<string>('My Work');
  const [subtitle, setSubtitle] = React.useState<string>('A collection of my projects.');

  React.useEffect(() => {
    getProjects().then(setProjects);
    getSetting('projectsTitle').then(title => title && setTitle(title));
    getSetting('projectsSubtitle').then(subtitle => subtitle && setSubtitle(subtitle));
  }, []);

  const handleProjectClick = (project: Project) => {
    if (project.url) {
      window.open(project.url, '_blank');
    } else {
      setSelectedProject(project);
    }
  };

  return (
    <Section>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <Heading>{title}</Heading>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-500">{subtitle}</p>
        </div>

        <div className="mt-12 grid grid-cols-12 gap-4 md:gap-6">
          {projects.map(project => (
            <div key={project.id} className={project.gridSpan} onClick={() => handleProjectClick(project)}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedProject?.title}</DialogTitle>
              <DialogDescription>
                {selectedProject?.description}
              </DialogDescription>
            </DialogHeader>
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: selectedProject?.keyFeatures || '' }} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Section>
  );
}
