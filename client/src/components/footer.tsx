import { GraduationCap, Mail, MapPin, Phone } from "lucide-react";
import { SiGithub, SiYoutube, SiX } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

const footerLinks = {
  Platform: [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
  ],
  Courses: [
    { label: "Data Science", href: "#courses" },
    { label: "Machine Learning", href: "#courses" },
    { label: "Deep Learning", href: "#courses" },
    { label: "MLOps", href: "#courses" },
  ],
  Specializations: [
    { label: "Bronze Level", href: "#specializations" },
    { label: "Silver Level", href: "#specializations" },
    { label: "Gold Level", href: "#specializations" },
    { label: "Platinum Level", href: "#specializations" },
    { label: "Diamond Level", href: "#specializations" },
  ],
  Support: [
    { label: "Help Center", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

const socialLinks = [
  { icon: SiX, label: "X" },
  { icon: FaLinkedin, label: "LinkedIn" },
  { icon: SiGithub, label: "GitHub" },
  { icon: SiYoutube, label: "YouTube" },
];

export default function Footer() {
  return (
    <footer
      id="about"
      className="bg-slate-950 text-slate-300 scroll-mt-16"
      data-testid="footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-10">
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-md bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-display font-bold text-lg">
                AI Data Science Academy
              </span>
            </div>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed max-w-xs">
              Empowering the next generation of data scientists and AI engineers
              through structured learning pathways and industry-grade projects.
            </p>

            <div className="space-y-2.5 mb-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <span>contact@aidsa.academy</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>San Francisco, CA</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="w-9 h-9 rounded-md bg-slate-800/80 flex items-center justify-center text-slate-400 hover-elevate"
                  data-testid={`link-social-${social.label.toLowerCase()}`}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4 font-display">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 hover-elevate inline-block rounded-sm px-1 -mx-1"
                      data-testid={`footer-link-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p data-testid="text-copyright">
            &copy; {new Date().getFullYear()} AI Data Science Academy. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover-elevate inline-block rounded-sm px-1 -mx-1">
              Privacy Policy
            </a>
            <a href="#" className="hover-elevate inline-block rounded-sm px-1 -mx-1">
              Terms of Service
            </a>
            <a href="#" className="hover-elevate inline-block rounded-sm px-1 -mx-1">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
