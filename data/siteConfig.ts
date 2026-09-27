export interface SiteConfig {
  name: string;
  role: string;
  tagline: string;
  email: string;
  academicEmail: string;
  phone: string;
  location: string;
  githubUsername: string;
  githubUrl: string;
  linkedinUrl: string;
  buildVersion: string;
}

export const siteConfig: SiteConfig = {
  name: "Chathuranga Sandaruwan",
  role: "Computer Science Student & Full Stack Developer",
  tagline: "Computer Science student at NSBM Green University specializing in scalable backend systems, distributed campus transit solutions, and AI-powered educational web platforms.",
  email: "chathurangasadaruwan076@gmail.com",
  academicEmail: "hacsandaruwan@students.nsbm.ac.lk",
  phone: "+94 76 835 3650",
  location: "Moratuwa, Colombo, Sri Lanka",
  githubUsername: "chathuranga00",
  githubUrl: "https://github.com/chathuranga00",
  linkedinUrl: "https://www.linkedin.com/in/chathuranga-sandaruwan-44b054365/",
  buildVersion: "CHATHURANGA.DEV v1.0",
};

export default siteConfig;