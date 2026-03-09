import { db } from "./db";
import { users, courses, modules, lessons } from "@shared/schema";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import { eq } from "drizzle-orm";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

export async function seed() {
  const existingCourses = await db.select().from(courses);
  if (existingCourses.length > 0) {
    console.log("Database already seeded, skipping...");
    return;
  }

  console.log("Seeding database...");

  const adminPassword = await hashPassword("admin123");
  const studentPassword = await hashPassword("student123");

  await db.insert(users).values([
    { name: "Admin User", email: "admin@aidsa.academy", password: adminPassword, role: "admin", avatarInitials: "AU" },
    { name: "Sarah Chen", email: "sarah@aidsa.academy", password: adminPassword, role: "instructor", avatarInitials: "SC" },
    { name: "Michael Torres", email: "michael@aidsa.academy", password: adminPassword, role: "instructor", avatarInitials: "MT" },
    { name: "Emily Zhang", email: "emily@aidsa.academy", password: adminPassword, role: "instructor", avatarInitials: "EZ" },
    { name: "Test Student", email: "student@test.com", password: studentPassword, role: "student", avatarInitials: "TS" },
  ]);

  const courseData = [
    {
      title: "Introduction to Python for Data Science",
      description: "Master Python programming from the ground up, specifically tailored for data science applications. Learn essential libraries like NumPy, Pandas, and Matplotlib while building real-world data analysis projects.",
      shortDescription: "Learn Python for data analysis with NumPy, Pandas, and Matplotlib.",
      difficulty: "Beginner",
      specializationLevel: "Bronze",
      instructorName: "Dr. Sarah Chen",
      duration: "8 weeks",
      category: "Programming",
      gradient: "from-blue-600 to-indigo-700",
      rating: 4.8,
      reviewCount: 2340,
      studentCount: 12500,
      published: true,
    },
    {
      title: "Statistical Analysis & Probability",
      description: "Dive deep into statistical methods essential for data science. Cover probability theory, distributions, hypothesis testing, regression analysis, and Bayesian statistics with practical Python implementations.",
      shortDescription: "Master statistics and probability for data-driven decision making.",
      difficulty: "Beginner",
      specializationLevel: "Bronze",
      instructorName: "Prof. Michael Torres",
      duration: "10 weeks",
      category: "Statistics",
      gradient: "from-emerald-600 to-teal-700",
      rating: 4.7,
      reviewCount: 1850,
      studentCount: 9800,
      published: true,
    },
    {
      title: "Machine Learning Fundamentals",
      description: "Learn the core algorithms and techniques of machine learning. From linear regression to ensemble methods, build a strong foundation in supervised and unsupervised learning with scikit-learn.",
      shortDescription: "Core ML algorithms: regression, classification, clustering, and more.",
      difficulty: "Intermediate",
      specializationLevel: "Gold",
      instructorName: "Dr. Emily Zhang",
      duration: "12 weeks",
      category: "Machine Learning",
      gradient: "from-purple-600 to-pink-700",
      rating: 4.9,
      reviewCount: 3120,
      studentCount: 15200,
      published: true,
    },
    {
      title: "Deep Learning with TensorFlow",
      description: "Build and train neural networks using TensorFlow and Keras. Cover CNNs, RNNs, transformers, and generative models while working on computer vision and sequence modeling projects.",
      shortDescription: "Neural networks, CNNs, RNNs, and transformers with TensorFlow.",
      difficulty: "Advanced",
      specializationLevel: "Platinum",
      instructorName: "Dr. James Wilson",
      duration: "14 weeks",
      category: "Deep Learning",
      gradient: "from-orange-500 to-red-600",
      rating: 4.8,
      reviewCount: 2780,
      studentCount: 11300,
      published: true,
    },
    {
      title: "Natural Language Processing",
      description: "Master text processing, sentiment analysis, named entity recognition, and build modern NLP applications using transformers, BERT, and GPT architectures.",
      shortDescription: "Text analysis, transformers, BERT, and modern NLP applications.",
      difficulty: "Advanced",
      specializationLevel: "Platinum",
      instructorName: "Dr. Aisha Patel",
      duration: "12 weeks",
      category: "NLP",
      gradient: "from-cyan-600 to-blue-700",
      rating: 4.6,
      reviewCount: 1560,
      studentCount: 7400,
      published: true,
    },
    {
      title: "MLOps & Production AI Systems",
      description: "Learn to deploy, monitor, and maintain machine learning models in production. Cover Docker, Kubernetes, CI/CD pipelines, model versioning, and scalable ML infrastructure.",
      shortDescription: "Deploy and maintain ML models in production environments.",
      difficulty: "Expert",
      specializationLevel: "Diamond",
      instructorName: "Dr. David Kim",
      duration: "10 weeks",
      category: "MLOps",
      gradient: "from-slate-600 to-zinc-700",
      rating: 4.9,
      reviewCount: 980,
      studentCount: 4200,
      published: true,
    },
  ];

  const insertedCourses = await db.insert(courses).values(courseData).returning();

  const moduleData: { courseId: number; title: string; orderNumber: number; lessonTitles: string[] }[] = [
    {
      courseId: insertedCourses[0].id,
      title: "Python Basics",
      orderNumber: 1,
      lessonTitles: ["Setting Up Your Environment", "Variables and Data Types", "Control Flow", "Functions"],
    },
    {
      courseId: insertedCourses[0].id,
      title: "Data Structures",
      orderNumber: 2,
      lessonTitles: ["Lists and Tuples", "Dictionaries and Sets", "List Comprehensions", "Working with Files"],
    },
    {
      courseId: insertedCourses[0].id,
      title: "NumPy & Pandas",
      orderNumber: 3,
      lessonTitles: ["Introduction to NumPy", "Array Operations", "Pandas DataFrames", "Data Cleaning"],
    },
    {
      courseId: insertedCourses[1].id,
      title: "Descriptive Statistics",
      orderNumber: 1,
      lessonTitles: ["Measures of Central Tendency", "Measures of Spread", "Data Visualization Basics", "Exploratory Data Analysis"],
    },
    {
      courseId: insertedCourses[1].id,
      title: "Probability Theory",
      orderNumber: 2,
      lessonTitles: ["Probability Fundamentals", "Conditional Probability", "Probability Distributions", "Central Limit Theorem"],
    },
    {
      courseId: insertedCourses[2].id,
      title: "Supervised Learning",
      orderNumber: 1,
      lessonTitles: ["Linear Regression", "Logistic Regression", "Decision Trees", "Random Forests"],
    },
    {
      courseId: insertedCourses[2].id,
      title: "Unsupervised Learning",
      orderNumber: 2,
      lessonTitles: ["K-Means Clustering", "Hierarchical Clustering", "PCA", "Anomaly Detection"],
    },
    {
      courseId: insertedCourses[3].id,
      title: "Neural Network Foundations",
      orderNumber: 1,
      lessonTitles: ["Perceptrons and Neurons", "Backpropagation", "Activation Functions", "Building Your First NN"],
    },
    {
      courseId: insertedCourses[3].id,
      title: "Convolutional Neural Networks",
      orderNumber: 2,
      lessonTitles: ["Convolution Operations", "CNN Architectures", "Image Classification", "Transfer Learning"],
    },
    {
      courseId: insertedCourses[4].id,
      title: "Text Processing",
      orderNumber: 1,
      lessonTitles: ["Tokenization", "Word Embeddings", "Text Classification", "Sentiment Analysis"],
    },
    {
      courseId: insertedCourses[5].id,
      title: "ML Infrastructure",
      orderNumber: 1,
      lessonTitles: ["Model Serialization", "Docker for ML", "CI/CD Pipelines", "Model Monitoring"],
    },
  ];

  for (const mod of moduleData) {
    const [insertedModule] = await db.insert(modules).values({
      courseId: mod.courseId,
      title: mod.title,
      orderNumber: mod.orderNumber,
    }).returning();

    const lessonValues = mod.lessonTitles.map((title, i) => ({
      moduleId: insertedModule.id,
      title,
      content: `This lesson covers ${title.toLowerCase()} in detail. You will learn the core concepts, see practical examples, and complete hands-on exercises.`,
      duration: `${15 + Math.floor(Math.random() * 30)} min`,
      orderNumber: i + 1,
    }));

    await db.insert(lessons).values(lessonValues);
  }

  console.log("Database seeded successfully!");
}
