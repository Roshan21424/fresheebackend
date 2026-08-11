import "dotenv/config";
import connectDB from "./config/db.js";
import Job from "./models/Job.js";

const jobs = [
  {
    jobId: "FR-1001",
    company: "Google",
    role: "Associate Software Engineer",
    roleType: "Full-time",
    location: "Bengaluru, IN",
    salary: "₹18–24 LPA",
    category: "Software Engineering",
    skills: [
      { category: "Languages", items: ["Java", "C++", "Python"] },
      { category: "Core CS", items: ["Data Structures", "Algorithms", "System Design"] }
    ],
    aboutRole: "Build and maintain services used across Google's core infrastructure.",
    responsibilities: [
      "Write and review production code for backend services",
      "Debug and fix issues in existing systems",
      "Collaborate with senior engineers on design reviews"
    ],
    qualifications: [
      "B.Tech/B.E in CS or related field, 2025 batch",
      "Strong grasp of data structures and algorithms",
      "No active academic backlogs"
    ],
    preferredQualifications: ["Prior internship in software development", "Open-source contributions"],
    benefits: ["Health insurance", "Relocation support", "Annual bonus"],
    aboutCompany: "Google builds products used by billions, from Search to Cloud.",
    applyLink: "https://careers.google.com/jobs/results/"
  },
  {
    jobId: "FR-1002",
    company: "Microsoft",
    role: "Software Engineer I",
    roleType: "Full-time",
    location: "Hyderabad, IN",
    salary: "₹16–22 LPA",
    category: "Software Engineering",
    skills: [
      { category: "Languages", items: ["C#", "Java", "Python"] },
      { category: "Backend", items: ["REST APIs", "Azure"] }
    ],
    aboutRole: "Ship features for Microsoft 365 cloud services used by enterprises worldwide.",
    responsibilities: [
      "Develop and test cloud service features",
      "Fix bugs reported by internal QA",
      "Participate in sprint planning"
    ],
    qualifications: [
      "B.Tech/M.Tech, 2024/2025 batch",
      "Solid OOP fundamentals",
      "No active backlogs"
    ],
    preferredQualifications: ["Experience with cloud fundamentals (Azure/AWS/GCP)"],
    benefits: ["Health insurance", "Stock awards", "Hybrid work"],
    aboutCompany: "Microsoft builds productivity, cloud, and developer tools at global scale.",
    applyLink: "https://careers.microsoft.com/students/us/en/"
  },
  {
    jobId: "FR-1003",
    company: "Amazon",
    role: "Business Analyst",
    roleType: "Full-time",
    location: "Chennai, IN",
    salary: "₹9–12 LPA",
    category: "Business & Analytics",
    skills: [
      { category: "Data", items: ["SQL", "Excel"] },
      { category: "Tools", items: ["Tableau"] }
    ],
    aboutRole: "Analyze operational data to help fulfillment centers run efficiently.",
    responsibilities: [
      "Build weekly reports on fulfillment center performance",
      "Spot trends and flag anomalies to operations teams",
      "Support process improvement projects"
    ],
    qualifications: ["Any degree, 2025 batch", "CGPA 7.0+", "Comfortable with spreadsheets and SQL basics"],
    preferredQualifications: ["Prior analytics internship"],
    benefits: ["Health insurance", "Relocation assistance"],
    aboutCompany: "Amazon runs one of the world's largest e-commerce and logistics networks.",
    applyLink: "https://www.amazon.jobs/en/business_categories/university"
  },
  {
    jobId: "FR-1004",
    company: "Deloitte",
    role: "Analyst - Consulting",
    roleType: "Full-time",
    location: "Mumbai, IN",
    salary: "₹7–9 LPA",
    category: "Consulting",
    skills: [
      { category: "Tools", items: ["Excel", "PowerPoint"] },
      { category: "Core Skills", items: ["Problem Solving", "Communication"] }
    ],
    aboutRole: "Support client engagements across strategy and operations projects.",
    responsibilities: [
      "Gather and analyze client data",
      "Prepare client-facing presentations",
      "Assist senior consultants on delivery"
    ],
    qualifications: ["Any degree, 2025 batch", "No active backlogs", "Strong communication skills"],
    preferredQualifications: ["Case competition experience"],
    benefits: ["Health insurance", "Learning stipend"],
    aboutCompany: "Deloitte is a global professional services firm advising Fortune 500 clients.",
    applyLink: "https://apply.deloitte.com/careers"
  },
  {
    jobId: "FR-1005",
    company: "JPMorgan Chase",
    role: "Technology Analyst",
    roleType: "Full-time",
    location: "Bengaluru, IN",
    salary: "₹14–18 LPA",
    category: "Software Engineering",
    skills: [
      { category: "Languages", items: ["Java", "Python"] },
      { category: "Backend", items: ["SQL", "Microservices"] }
    ],
    aboutRole: "Develop applications supporting global banking technology platforms.",
    responsibilities: [
      "Build and maintain internal banking applications",
      "Write unit tests and participate in code reviews",
      "Work with product teams on requirements"
    ],
    qualifications: ["B.Tech/B.E/M.Tech, 2025 batch", "CGPA 7.5+", "Strong problem-solving skills"],
    preferredQualifications: ["Exposure to financial systems"],
    benefits: ["Health insurance", "Performance bonus", "Retirement plan"],
    aboutCompany: "JPMorgan Chase is a global leader in banking and financial services.",
    applyLink: "https://careers.jpmorgan.com/us/en/students"
  },
  {
    jobId: "FR-1006",
    company: "Accenture",
    role: "Associate Software Engineer",
    roleType: "Full-time",
    location: "Pune, IN",
    salary: "₹4.5–6 LPA",
    category: "Software Engineering",
    skills: [
      { category: "Languages", items: ["Java", "JavaScript"] },
      { category: "Frontend", items: ["React"] }
    ],
    aboutRole: "Deliver software solutions for enterprise clients across industries.",
    responsibilities: [
      "Build features per client requirements",
      "Fix defects found during testing",
      "Attend daily stand-ups with the delivery team"
    ],
    qualifications: ["Any engineering degree, 2025 batch", "No active backlogs", "Willingness to learn new tech"],
    preferredQualifications: ["Any personal or academic coding project"],
    benefits: ["Health insurance", "Training certifications"],
    aboutCompany: "Accenture is a global IT services and consulting company.",
    applyLink: "https://www.accenture.com/in-en/careers/jobsearch"
  },
  {
    jobId: "FR-1007",
    company: "Infosys",
    role: "Systems Engineer",
    roleType: "Full-time",
    location: "Mysuru, IN",
    salary: "₹3.6–4.5 LPA",
    category: "Software Engineering",
    skills: [
      { category: "Languages", items: ["Any one language"] },
      { category: "Core Skills", items: ["Aptitude", "Logical Reasoning"] }
    ],
    aboutRole: "Get trained and placed on client projects across technology stacks.",
    responsibilities: [
      "Complete initial technical training program",
      "Work on assigned client project post-training",
      "Support testing and documentation tasks"
    ],
    qualifications: ["B.E/B.Tech/M.Sc/MCA, 2025 batch", "CGPA 6.0+"],
    preferredQualifications: ["Basic programming knowledge"],
    benefits: ["Health insurance", "Structured training program"],
    aboutCompany: "Infosys is a global IT services and consulting company.",
    applyLink: "https://www.infosys.com/careers/apply.html"
  },
  {
    jobId: "FR-1008",
    company: "Goldman Sachs",
    role: "Analyst - Engineering",
    roleType: "Full-time",
    location: "Bengaluru, IN",
    salary: "₹20–26 LPA",
    category: "Software Engineering",
    skills: [
      { category: "Languages", items: ["Java", "Python", "C++"] },
      { category: "Core CS", items: ["Data Structures", "System Design"] }
    ],
    aboutRole: "Build trading and risk platforms used across global markets.",
    responsibilities: [
      "Design and build low-latency trading systems",
      "Write clean, tested, production-grade code",
      "Work closely with trading desk stakeholders"
    ],
    qualifications: ["B.Tech/M.Tech in CS/IT, 2025 batch", "CGPA 8.0+", "Strong CS fundamentals"],
    preferredQualifications: ["Competitive programming background"],
    benefits: ["Health insurance", "Annual bonus", "Wellness programs"],
    aboutCompany: "Goldman Sachs is a leading global investment bank and financial firm.",
    applyLink: "https://www.goldmansachs.com/careers/students/"
  },
  {
    jobId: "FR-1009",
    company: "Procter & Gamble",
    role: "Assistant Brand Manager",
    roleType: "Full-time",
    location: "Mumbai, IN",
    salary: "₹18–22 LPA",
    category: "Marketing",
    skills: [
      { category: "Core Skills", items: ["Brand Strategy", "Analytical Thinking"] },
      { category: "Tools", items: ["Excel", "PowerPoint"] }
    ],
    aboutRole: "Own brand strategy and go-to-market plans for a P&G brand.",
    responsibilities: [
      "Plan and execute brand campaigns",
      "Analyze market and consumer data",
      "Coordinate with sales and agency partners"
    ],
    qualifications: ["MBA, 2025 batch", "Strong analytical and communication skills"],
    preferredQualifications: ["FMCG internship experience"],
    benefits: ["Health insurance", "Performance bonus"],
    aboutCompany: "P&G owns and markets some of the world's largest consumer brands.",
    applyLink: "https://www.pgcareers.com/"
  },
  {
    jobId: "FR-1010",
    company: "IBM",
    role: "Data Analyst",
    roleType: "Full-time",
    location: "Bengaluru, IN",
    salary: "₹6–8 LPA",
    category: "Data",
    skills: [
      { category: "Languages", items: ["Python", "SQL"] },
      { category: "Tools", items: ["Excel", "Power BI"] }
    ],
    aboutRole: "Turn raw data into dashboards and insights for internal teams.",
    responsibilities: [
      "Clean and organize raw datasets",
      "Build dashboards for internal stakeholders",
      "Present findings to non-technical teams"
    ],
    qualifications: ["Any degree, 2025 batch", "CGPA 6.5+", "Comfortable with SQL and Excel"],
    preferredQualifications: ["Basic Python for data analysis"],
    benefits: ["Health insurance", "Learning credits"],
    aboutCompany: "IBM is a global leader in enterprise technology and consulting.",
    applyLink: "https://www.ibm.com/careers/early-professionals"
  }
];

await connectDB();
await Job.deleteMany({});
await Job.insertMany(jobs);
console.log(`Seeded ${jobs.length} jobs`);
process.exit(0);