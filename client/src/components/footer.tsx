import { GraduationCap } from "lucide-react";
import { SiGithub, SiLinkedin, SiYoutube } from "react-icons/si";

const footerLinks = {
  Platform: ["Home", "About Us", "Careers", "Blog"],
  Courses: ["Data Science", "Machine Learning", "Deep Learning", "MLOps"],
  Specializations: [
    "Bronze Level",
    "Silver Level",
    "Gold Level",
    "Platinum Level",
    "Diamond Level",
  ],
  Support: ["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"],
};

const socialLinks = [
  { icon: SiLinkedin, label: "LinkedIn" },
  { icon: SiGithub, label: "GitHub" },
  { icon: SiYoutube, label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-card border-t" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold">AI DSA</span>
            </div>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Empowering the next generation of data scientists and AI engineers
              through structured learning pathways.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="w-9 h-9 rounded-md bg-muted flex items-center justify-center text-muted-foreground hover-elevate"
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
              <h4 className="font-semibold text-sm mb-4 font-display">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover-elevate inline-block rounded-sm px-1 -mx-1"
                      data-testid={`footer-link-${link.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
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
          </div>
        </div>
      </div>
    </footer>
  );
}
