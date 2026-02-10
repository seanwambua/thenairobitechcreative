
export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  stack: string[];
  url: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  review: string;
  title: string;
  company: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
}
