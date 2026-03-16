// Lead capture
export interface Lead {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  teamSize?: string;
  source?: string;
  plan?: string;
  createdAt: string;
}

// Newsletter subscriber
export interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
  confirmed: boolean;
}

// Contact form submission
export interface ContactSubmission {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  message: string;
  createdAt: string;
}

// Blog post frontmatter
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  image?: string;
  tags: string[];
  category?: string;
  published: boolean;
  readingTime?: string;
}

// Customer case study
export interface CaseStudy {
  slug: string;
  title: string;
  description: string;
  date: string;
  company: string;
  industry: string;
  logo?: string;
  image?: string;
  metrics?: { label: string; value: string }[];
  published: boolean;
}

// Integration listing
export interface Integration {
  slug: string;
  name: string;
  description: string;
  category: string;
  logo: string;
  status: "available" | "coming-soon" | "beta";
  docsUrl?: string;
}

// Changelog entry
export interface ChangelogEntry {
  slug: string;
  title: string;
  description: string;
  date: string;
  version: string;
  type: "feature" | "improvement" | "fix";
}

// Career posting
export interface JobPosting {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "contract";
  description: string;
  published: boolean;
}
