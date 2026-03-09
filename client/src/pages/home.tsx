import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Layers,
  BarChart3,
  Brain,
  Cpu,
  Zap,
  BookOpen,
  Code2,
  Database,
  MessageCircle,
  Users2,
  Play,
  Award,
  Target,
  Clock,
  Star,
  ChevronRight,
  ArrowRight,
  UserCheck,
  Rocket,
  Video,
  Newspaper,
  ClipboardCheck,
  FolderKanban,
  HelpCircle,
  FileCheck2,
  Quote,
  Sparkles,
  TrendingUp,
  Network,
  Binary,
  CircuitBoard,
  Sigma,
  GraduationCap,
  Globe,
  CheckCircle2,
} from "lucide-react";

const specializations = [
  {
    level: "Bronze",
    title: "Data Science Foundations",
    description:
      "Build your foundation in data science with Python programming, statistics, and data manipulation techniques.",
    skills: ["Python", "Statistics", "Data Wrangling", "SQL"],
    duration: "3 months",
    modules: 12,
    icon: Layers,
    gradient: "from-amber-500 to-orange-600",
  },
  {
    level: "Silver",
    title: "Data Analysis & Statistical Modeling",
    description:
      "Master advanced statistical analysis, data visualization, and exploratory data analysis techniques.",
    skills: ["Advanced Statistics", "Visualization", "EDA", "Hypothesis Testing"],
    duration: "4 months",
    modules: 16,
    icon: BarChart3,
    gradient: "from-slate-400 to-slate-500",
  },
  {
    level: "Gold",
    title: "Machine Learning Practitioner",
    description:
      "Dive into machine learning algorithms, model training, evaluation, and feature engineering.",
    skills: ["Supervised Learning", "Unsupervised Learning", "Feature Engineering", "Model Eval"],
    duration: "5 months",
    modules: 20,
    icon: Brain,
    gradient: "from-yellow-500 to-amber-500",
  },
  {
    level: "Platinum",
    title: "Advanced AI & Deep Learning",
    description:
      "Explore neural networks, computer vision, NLP, and cutting-edge deep learning architectures.",
    skills: ["Neural Networks", "Computer Vision", "NLP", "Transformers"],
    duration: "6 months",
    modules: 24,
    icon: Cpu,
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    level: "Diamond",
    title: "AI Engineering & Production Systems",
    description:
      "Master MLOps, model deployment, scalable AI systems, and production-grade ML pipelines.",
    skills: ["MLOps", "Model Deployment", "Scalable Systems", "CI/CD for ML"],
    duration: "6 months",
    modules: 22,
    icon: Zap,
    gradient: "from-cyan-400 to-teal-500",
  },
];

const courses = [
  {
    title: "Introduction to Python for Data Science",
    instructor: "Dr. Sarah Chen",
    level: "Beginner",
    duration: "8 weeks",
    rating: 4.8,
    reviews: 2340,
    students: "12.5K",
    category: "Programming",
    gradient: "from-blue-600 to-indigo-700",
  },
  {
    title: "Statistical Analysis & Probability",
    instructor: "Prof. Michael Torres",
    level: "Beginner",
    duration: "10 weeks",
    rating: 4.7,
    reviews: 1850,
    students: "9.8K",
    category: "Statistics",
    gradient: "from-emerald-600 to-teal-700",
  },
  {
    title: "Machine Learning Fundamentals",
    instructor: "Dr. Emily Zhang",
    level: "Intermediate",
    duration: "12 weeks",
    rating: 4.9,
    reviews: 3120,
    students: "15.2K",
    category: "Machine Learning",
    gradient: "from-purple-600 to-pink-700",
  },
  {
    title: "Deep Learning with TensorFlow",
    instructor: "Dr. James Wilson",
    level: "Advanced",
    duration: "14 weeks",
    rating: 4.8,
    reviews: 2780,
    students: "11.3K",
    category: "Deep Learning",
    gradient: "from-orange-500 to-red-600",
  },
  {
    title: "Natural Language Processing",
    instructor: "Dr. Aisha Patel",
    level: "Advanced",
    duration: "12 weeks",
    rating: 4.6,
    reviews: 1560,
    students: "7.4K",
    category: "NLP",
    gradient: "from-cyan-600 to-blue-700",
  },
  {
    title: "MLOps & Production AI Systems",
    instructor: "Dr. David Kim",
    level: "Expert",
    duration: "10 weeks",
    rating: 4.9,
    reviews: 980,
    students: "4.2K",
    category: "MLOps",
    gradient: "from-slate-600 to-zinc-700",
  },
];

const studySteps = [
  {
    title: "Learning Path",
    description:
      "Choose your specialization track and get a personalized learning roadmap tailored to your goals.",
    icon: Target,
  },
  {
    title: "Course Modules",
    description:
      "Access structured video lectures, readings, and interactive content designed by industry experts.",
    icon: BookOpen,
  },
  {
    title: "Assignments",
    description:
      "Complete hands-on assignments to reinforce concepts and build practical problem-solving skills.",
    icon: ClipboardCheck,
  },
  {
    title: "Projects",
    description:
      "Build real-world projects using industry datasets, tools, and best practices.",
    icon: FolderKanban,
  },
  {
    title: "Examinations",
    description:
      "Validate your knowledge with comprehensive assessments and receive detailed feedback.",
    icon: FileCheck2,
  },
  {
    title: "Certification",
    description:
      "Earn your professional certificate recognized by top companies worldwide.",
    icon: Award,
  },
];

const evaluationCriteria = [
  {
    name: "Assignments",
    percentage: 20,
    gradient: "from-blue-500 to-indigo-500",
    icon: ClipboardCheck,
    description: "Weekly coding assignments and problem sets",
  },
  {
    name: "Projects",
    percentage: 30,
    gradient: "from-emerald-500 to-teal-500",
    icon: FolderKanban,
    description: "End-to-end data science and ML projects",
  },
  {
    name: "Quizzes",
    percentage: 20,
    gradient: "from-amber-500 to-orange-500",
    icon: HelpCircle,
    description: "Module quizzes testing conceptual understanding",
  },
  {
    name: "Final Assessment",
    percentage: 30,
    gradient: "from-purple-500 to-pink-500",
    icon: FileCheck2,
    description: "Comprehensive capstone assessment",
  },
];

const studyModes = [
  {
    title: "Self-Paced Learning",
    description:
      "Learn at your own speed with lifetime access to all course materials and resources.",
    icon: Play,
    highlight: "Most Popular",
  },
  {
    title: "Instructor Guided",
    description:
      "Join live sessions with expert instructors and get real-time feedback on your work.",
    icon: UserCheck,
    highlight: null,
  },
  {
    title: "Project Based Learning",
    description:
      "Apply your skills on real-world projects with industry datasets and mentor support.",
    icon: Rocket,
    highlight: null,
  },
  {
    title: "Certification Track",
    description:
      "Follow a structured path to earn professional certifications recognized globally.",
    icon: Award,
    highlight: "Best Value",
  },
];

const resources = [
  {
    title: "Video Lectures",
    description: "HD quality video lectures with downloadable content by industry experts.",
    icon: Video,
    count: "1,200+",
  },
  {
    title: "Coding Notebooks",
    description: "Interactive Jupyter notebooks with hands-on exercises and solutions.",
    icon: Code2,
    count: "800+",
  },
  {
    title: "Datasets",
    description: "Curated real-world datasets for practice, projects, and competitions.",
    icon: Database,
    count: "500+",
  },
  {
    title: "Research Papers",
    description: "Access to latest AI, ML, and data science research publications.",
    icon: Newspaper,
    count: "350+",
  },
  {
    title: "Discussion Forum",
    description: "Engage with peers and mentors in our active learning community.",
    icon: MessageCircle,
    count: "24/7",
  },
  {
    title: "Community",
    description: "Join a global network of 50,000+ data science professionals.",
    icon: Users2,
    count: "50K+",
  },
];

const testimonials = [
  {
    name: "Alex Johnson",
    role: "ML Engineer at Google",
    quote:
      "The structured specialization pathway helped me transition from a software developer to a machine learning engineer. The projects were incredibly relevant to real-world scenarios.",
    initials: "AJ",
    rating: 5,
  },
  {
    name: "Maria Rodriguez",
    role: "Data Scientist at Microsoft",
    quote:
      "The quality of instruction is on par with top university programs. I completed the Gold specialization and landed my dream job within months.",
    initials: "MR",
    rating: 5,
  },
  {
    name: "Ryan Park",
    role: "AI Research Intern at DeepMind",
    quote:
      "The Diamond level specialization on production AI systems gave me the practical skills that academic programs often miss. Highly recommended for anyone serious about AI.",
    initials: "RP",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Senior Data Analyst at Amazon",
    quote:
      "The Silver specialization transformed my approach to statistical modeling. The hands-on datasets and mentorship were invaluable. Best investment in my career.",
    initials: "PS",
    rating: 5,
  },
];

const trustedCompanies = [
  "Google", "Microsoft", "Amazon", "Meta", "Apple", "Netflix",
];

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
};

function SectionHeader({
  badge,
  title,
  description,
}: {
  badge: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div className="text-center max-w-3xl mx-auto mb-16" {...fadeIn}>
      <Badge
        variant="secondary"
        className="mb-4"
        data-testid={`badge-${badge.toLowerCase().replace(/\s/g, "-")}`}
      >
        {badge}
      </Badge>
      <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 tracking-tight">
        {title}
      </h2>
      <p className="text-muted-foreground text-lg leading-relaxed">{description}</p>
    </motion.div>
  );
}

function HeroSection() {
  const floatingIcons = [
    { icon: Brain, x: "10%", y: "20%", delay: 0, size: "w-8 h-8" },
    { icon: Network, x: "85%", y: "15%", delay: 0.5, size: "w-10 h-10" },
    { icon: Binary, x: "75%", y: "70%", delay: 1, size: "w-7 h-7" },
    { icon: CircuitBoard, x: "15%", y: "75%", delay: 1.5, size: "w-9 h-9" },
    { icon: Sigma, x: "90%", y: "45%", delay: 0.8, size: "w-6 h-6" },
    { icon: Database, x: "5%", y: "50%", delay: 1.2, size: "w-7 h-7" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900"
      data-testid="section-hero"
    >
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-500/8 rounded-full blur-[150px]" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          className="absolute hidden md:block"
          style={{ left: item.x, top: item.y }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: [0, 0.15, 0.1, 0.15],
            scale: [0.8, 1, 0.9, 1],
            y: [0, -15, 0, -15],
          }}
          transition={{
            duration: 6,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <item.icon className={`${item.size} text-white`} />
        </motion.div>
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium bg-white/10 text-white/90 border border-white/10 backdrop-blur-sm mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            #1 AI & Data Science Platform
          </span>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-[1.1] tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Master Data Science,{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Artificial Intelligence
          </span>{" "}
          & Machine Learning
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Follow our structured 5-level specialization pathway from foundations to
          production AI systems. Learn from industry experts with hands-on projects
          and earn professional certifications.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Button size="lg" asChild data-testid="button-explore-courses">
            <a href="#courses">
              Explore Courses <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="backdrop-blur-sm bg-white/5 text-white border-white/20"
            asChild
            data-testid="button-start-learning"
          >
            <a href="#specializations">Start Learning</a>
          </Button>
        </motion.div>

        <motion.div
          className="grid grid-cols-3 gap-8 mt-20 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {[
            { value: "50K+", label: "Students" },
            { value: "200+", label: "Courses" },
            { value: "50+", label: "Expert Instructors" },
          ].map((stat) => (
            <div key={stat.label} data-testid={`stat-${stat.label.toLowerCase().replace(/\s/g, "-")}`}>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-display">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <p className="text-xs text-slate-500 mb-4 uppercase tracking-wider font-medium">
            Our graduates work at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {trustedCompanies.map((company) => (
              <span
                key={company}
                className="text-sm sm:text-base font-display font-semibold text-slate-500/70 tracking-wide"
                data-testid={`company-${company.toLowerCase()}`}
              >
                {company}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

function SpecializationsSection() {
  return (
    <section
      id="specializations"
      className="py-24 bg-background scroll-mt-16"
      data-testid="section-specializations"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Specialization Program"
          title="5-Level Data Science Specialization Path"
          description="Progress through our structured pathway designed to take you from beginner to expert in data science and AI engineering."
        />

        <div className="hidden lg:flex items-center justify-center gap-0 mb-12 max-w-4xl mx-auto">
          {specializations.map((spec, index) => (
            <div key={spec.level} className="flex items-center">
              <motion.div
                className="flex flex-col items-center gap-2"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.12 }}
              >
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${spec.gradient} flex items-center justify-center shadow-lg`}
                >
                  <spec.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">
                  {spec.level}
                </span>
              </motion.div>
              {index < specializations.length - 1 && (
                <motion.div
                  className="w-16 xl:w-24 h-px bg-gradient-to-r from-border to-border mx-2"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.12 + 0.2 }}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {specializations.map((spec, index) => (
            <motion.div
              key={spec.level}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className="hover-elevate h-full relative"
                data-testid={`card-specialization-${spec.level.toLowerCase()}`}
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-11 h-11 rounded-lg flex items-center justify-center bg-gradient-to-br ${spec.gradient} shrink-0 shadow-sm`}
                    >
                      <spec.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span
                        className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold bg-gradient-to-r ${spec.gradient} text-white`}
                      >
                        {spec.level} Level
                      </span>
                    </div>
                  </div>

                  <h3 className="font-display text-lg font-semibold mb-2">
                    {spec.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow leading-relaxed">
                    {spec.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {spec.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {spec.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      {spec.modules} modules
                    </span>
                  </div>

                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full"
                    data-testid={`button-view-${spec.level.toLowerCase()}`}
                  >
                    View Courses <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoursesSection() {
  return (
    <section
      id="courses"
      className="py-24 bg-muted/30 scroll-mt-16"
      data-testid="section-courses"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Featured Courses"
          title="Industry-Leading Courses"
          description="Explore our comprehensive catalog of courses designed and taught by leading data scientists and AI researchers."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Card
                className="overflow-hidden h-full"
                data-testid={`card-course-${index}`}
              >
                <CardContent className="p-0 flex flex-col h-full">
                  <div
                    className={`h-40 bg-gradient-to-br ${course.gradient} flex flex-col justify-between p-5 relative`}
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                    <span className="relative z-10 self-start inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium bg-white/20 text-white backdrop-blur-sm border border-white/10">
                      {course.category}
                    </span>

                    <div className="relative z-10 flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-white text-white" />
                        <span className="text-white font-semibold text-sm">{course.rating}</span>
                      </div>
                      <span className="text-white/60 text-xs">
                        ({course.reviews.toLocaleString()} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-display font-semibold text-base mb-1.5 leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {course.instructor}
                    </p>

                    <div className="flex items-center gap-3 flex-wrap text-xs text-muted-foreground mb-5 mt-auto">
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" />
                        {course.level}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users2 className="w-3.5 h-3.5" />
                        {course.students} students
                      </span>
                    </div>

                    <Button
                      className="w-full"
                      size="sm"
                      data-testid={`button-enroll-${index}`}
                    >
                      Enroll Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StudySchemeSection() {
  return (
    <section
      id="study-scheme"
      className="py-24 bg-background scroll-mt-16"
      data-testid="section-study-scheme"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Study Scheme"
          title="How Students Learn"
          description="Our structured learning approach ensures you build skills progressively with clear milestones at every stage."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {studySteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className="hover-elevate h-full relative"
                data-testid={`card-step-${index}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-sm shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <step.icon className="w-4 h-4 text-primary" />
                        <h3 className="font-display font-semibold">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="flex items-center justify-center gap-2 mt-8"
          {...fadeIn}
        >
          {studySteps.map((_, index) => (
            <div key={index} className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-primary" />
              {index < studySteps.length - 1 && (
                <div className="w-8 sm:w-12 h-px bg-primary/30" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function EvaluationSection() {
  const total = evaluationCriteria.reduce((sum, c) => sum + c.percentage, 0);
  let cumulativeAngle = 0;

  return (
    <section
      className="py-24 bg-muted/30 scroll-mt-16"
      data-testid="section-evaluation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Evaluation & Passing Criteria"
          title="Academic Evaluation Framework"
          description="Our comprehensive evaluation system ensures mastery of concepts through multiple assessment methods."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative w-64 h-64 sm:w-72 sm:h-72">
              <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                {evaluationCriteria.map((criteria, index) => {
                  const angle = (criteria.percentage / total) * 360;
                  const startAngle = cumulativeAngle;
                  cumulativeAngle += angle;
                  const endAngle = cumulativeAngle;

                  const startRad = (startAngle * Math.PI) / 180;
                  const endRad = (endAngle * Math.PI) / 180;
                  const radius = 80;
                  const cx = 100;
                  const cy = 100;

                  const x1 = cx + radius * Math.cos(startRad);
                  const y1 = cy + radius * Math.sin(startRad);
                  const x2 = cx + radius * Math.cos(endRad);
                  const y2 = cy + radius * Math.sin(endRad);
                  const largeArcFlag = angle > 180 ? 1 : 0;

                  const colors = [
                    ["#3b82f6", "#6366f1"],
                    ["#10b981", "#14b8a6"],
                    ["#f59e0b", "#f97316"],
                    ["#a855f7", "#ec4899"],
                  ];

                  return (
                    <motion.path
                      key={criteria.name}
                      d={`M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                      fill={`url(#gradient-${index})`}
                      stroke="hsl(var(--background))"
                      strokeWidth="2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.15 }}
                    >
                      <defs>
                        <linearGradient id={`gradient-${index}`}>
                          <stop offset="0%" stopColor={colors[index][0]} />
                          <stop offset="100%" stopColor={colors[index][1]} />
                        </linearGradient>
                      </defs>
                    </motion.path>
                  );
                })}
                <circle cx="100" cy="100" r="50" fill="hsl(var(--background))" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-display font-bold">100%</div>
                  <div className="text-xs text-muted-foreground">Total Score</div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="space-y-4">
            {evaluationCriteria.map((criteria, index) => (
              <motion.div
                key={criteria.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className="hover-elevate"
                  data-testid={`card-evaluation-${criteria.name.toLowerCase().replace(/\s/g, "-")}`}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${criteria.gradient} flex items-center justify-center shrink-0`}
                    >
                      <criteria.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="font-display font-semibold text-sm">
                          {criteria.name}
                        </h4>
                        <span className="text-lg font-display font-bold shrink-0">
                          {criteria.percentage}%
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {criteria.description}
                      </p>
                      <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${criteria.gradient}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${criteria.percentage * 3.33}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 + index * 0.15 }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StudyModesSection() {
  return (
    <section className="py-24 bg-background scroll-mt-16" data-testid="section-study-modes">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Study Modes"
          title="Flexible Learning Formats"
          description="Choose the learning format that fits your schedule and learning style."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {studyModes.map((mode, index) => (
            <motion.div
              key={mode.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className="hover-elevate h-full relative"
                data-testid={`card-mode-${mode.title.toLowerCase().replace(/\s/g, "-")}`}
              >
                {mode.highlight && (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-10">
                    <Badge className="text-[10px] px-2">{mode.highlight}</Badge>
                  </div>
                )}
                <CardContent className="p-6 text-center flex flex-col items-center h-full">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                    <mode.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-base mb-2">{mode.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {mode.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResourcesSection() {
  return (
    <section
      id="resources"
      className="py-24 bg-muted/30 scroll-mt-16"
      data-testid="section-resources"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Learning Resources"
          title="Everything You Need to Succeed"
          description="Access a comprehensive suite of learning resources designed to support your journey at every step."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Card
                className="hover-elevate h-full"
                data-testid={`card-resource-${resource.title.toLowerCase().replace(/\s/g, "-")}`}
              >
                <CardContent className="p-6 flex gap-4 h-full">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <resource.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="font-display font-semibold">
                        {resource.title}
                      </h3>
                      <span className="text-xs font-semibold text-primary shrink-0">
                        {resource.count}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {resource.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-24 bg-background scroll-mt-16" data-testid="section-testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Student Success Stories"
          title="Hear From Our Graduates"
          description="Join thousands of students who have transformed their careers through our programs."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
            >
              <Card
                className="hover-elevate h-full"
                data-testid={`card-testimonial-${index}`}
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center gap-0.5 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <Quote className="w-7 h-7 text-primary/15 mb-3 shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-sm">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section
      className="relative py-28 overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900"
      data-testid="section-cta"
    >
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-indigo-500/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-cyan-500/15 rounded-full blur-[80px]" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <motion.div
        className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        {...fadeIn}
      >
        <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-8 border border-white/10">
          <GraduationCap className="w-8 h-8 text-white" />
        </div>

        <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          Start Your Data Science Journey Today
        </h2>
        <p className="text-lg text-slate-300 mb-10 max-w-xl mx-auto leading-relaxed">
          Join 50,000+ students worldwide and take the first step towards mastering
          data science and artificial intelligence.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <Button size="lg" data-testid="button-cta-enroll">
            Enroll Now <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="backdrop-blur-sm bg-white/5 text-white border-white/20"
            data-testid="button-cta-curriculum"
          >
            View Curriculum
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Free 7-day trial
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Cancel anytime
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Certificate included
          </span>
        </div>
      </motion.div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <HeroSection />
      <SpecializationsSection />
      <CoursesSection />
      <StudySchemeSection />
      <EvaluationSection />
      <StudyModesSection />
      <ResourcesSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
