import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Read .env.local directly and merge it in, overriding any empty/placeholder
// values a global dotenv-loading tool (e.g. dotenvx) may have already
// injected into process.env before this script started.
const envLocalPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  const parsed = dotenv.parse(fs.readFileSync(envLocalPath));
  for (const [key, value] of Object.entries(parsed)) {
    if (value) process.env[key] = value;
  }
}

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import AdminUser from "../src/models/AdminUser";
import TeamMember from "../src/models/TeamMember";
import Game from "../src/models/Game";
import CareerPosting from "../src/models/CareerPosting";
import BlogPost from "../src/models/BlogPost";

const TEAM: { name: string; role: string; bio: string; order: number }[] = [
  { name: "Alex Rivera", role: "Founder & CEO", bio: "Sets the studio's creative and business direction, with 15 years in game production.", order: 1 },
  { name: "Jordan Lee", role: "Creative Director", bio: "Shapes the vision and tone for every Games Creator title.", order: 2 },
  { name: "Sam Okafor", role: "Studio Head / Executive Producer", bio: "Runs day-to-day studio operations and keeps every project on track.", order: 3 },
  { name: "Priya Nair", role: "Lead Game Designer", bio: "Designs core gameplay loops and systems across our titles.", order: 4 },
  { name: "Chen Wu", role: "Game Designer", bio: "Builds levels, encounters, and progression systems.", order: 5 },
  { name: "Maria Gonzalez", role: "Lead Programmer (Unreal Engine)", bio: "Owns engine architecture and gameplay programming standards.", order: 6 },
  { name: "Tom Becker", role: "Unity Developer", bio: "Builds and ships our mobile and cross-platform titles in Unity.", order: 7 },
  { name: "Liam Foster", role: "Backend Developer", bio: "Builds the services and infrastructure powering our live games.", order: 8 },
  { name: "Ava Kim", role: "3D Artist", bio: "Models and textures characters, props, and environments.", order: 9 },
  { name: "Noah Bennett", role: "Concept Artist", bio: "Defines the visual language for new worlds before production begins.", order: 10 },
  { name: "Isabella Rossi", role: "Animator", bio: "Brings characters and creatures to life through motion.", order: 11 },
  { name: "Ethan Clarke", role: "UI/UX Designer", bio: "Designs intuitive, accessible interfaces for every screen.", order: 12 },
  { name: "Grace Park", role: "Sound Designer / Audio Engineer", bio: "Crafts soundscapes, SFX, and adaptive music systems.", order: 13 },
  { name: "Daniel Osei", role: "QA Lead", bio: "Builds and runs our test plans to ship polished, stable games.", order: 14 },
  { name: "Chloe Martin", role: "Marketing Manager", bio: "Plans launches and grows our community of players.", order: 15 },
  { name: "Ryan Walsh", role: "Community Manager", bio: "Runs our Discord, socials, and player feedback loops.", order: 16 },
];

const GAMES = [
  {
    title: "Nova Drift Chronicles",
    slug: "nova-drift-chronicles",
    description: "A fast-paced sci-fi racer set across shattered orbital cities, blending arcade handling with deep vehicle customization.",
    platform: ["PC", "Console"],
    genre: ["Racing", "Sci-Fi"],
    status: "In Development",
  },
  {
    title: "Emberfall Tactics",
    slug: "emberfall-tactics",
    description: "A turn-based tactics RPG where every decision reshapes a war-torn kingdom and the loyalty of your squad.",
    platform: ["PC"],
    genre: ["Tactics", "RPG"],
    status: "Coming Soon",
  },
  {
    title: "Pocket Dungeon Crawl",
    slug: "pocket-dungeon-crawl",
    description: "A roguelite dungeon crawler built for quick mobile sessions, with hundreds of item combinations to discover.",
    platform: ["Mobile"],
    genre: ["Roguelite", "Dungeon Crawler"],
    status: "Released",
  },
];

const CAREERS = [
  { title: "Senior Game Designer", department: "Design", location: "Remote", type: "Full-time", description: "Own core gameplay systems from prototype to ship on our next original title.", requirements: ["5+ years shipping games", "Strong systems design portfolio", "Unreal or Unity experience"] },
  { title: "Unity Developer", department: "Engineering", location: "Remote", type: "Full-time", description: "Build and optimize gameplay systems for our mobile titles.", requirements: ["3+ years C# / Unity", "Experience shipping mobile games"] },
  { title: "3D Environment Artist", department: "Art", location: "Remote", type: "Contract", description: "Create environment art and props for our sci-fi racer.", requirements: ["Strong portfolio in stylized/sci-fi art", "Blender or Maya proficiency"] },
  { title: "QA Tester", department: "Quality Assurance", location: "Remote", type: "Part-time", description: "Test builds, log bugs, and help us ship polished releases.", requirements: ["Attention to detail", "Passion for games"] },
  { title: "Community Manager", department: "Marketing", location: "Remote", type: "Full-time", description: "Grow and nurture our Discord and social communities.", requirements: ["Experience running gaming communities", "Great written communication"] },
];

const BLOGS = [
  {
    title: "Behind the Scenes: Building Nova Drift Chronicles' Track System",
    slug: "behind-the-scenes-nova-drift-track-system",
    excerpt: "How we designed a procedural track system that keeps every race feeling handcrafted.",
    content:
      "<p>When we started prototyping Nova Drift Chronicles, we knew a static set of tracks wouldn't be enough...</p><p>Our team built a modular track system combining hand-authored set pieces with procedural connectors, giving us dozens of unique race configurations without a matching explosion in art budget.</p>",
    author: "Games Creator Team",
    tags: ["devlog", "nova-drift-chronicles"],
    published: true,
  },
  {
    title: "Why We Don't Crunch",
    slug: "why-we-dont-crunch",
    excerpt: "A look at how Games Creator plans schedules to avoid crunch culture entirely.",
    content: "Crunch produces short-term output and long-term burnout. Here's how we structure milestones, buffer time, and scope decisions to avoid it — and what we do when a deadline is at risk anyway.",
    author: "Alex Rivera",
    tags: ["studio-culture"],
    published: true,
  },
];

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    const envPath = path.resolve(process.cwd(), ".env.local");
    const expected = ["MONGODB_URI", "NEXTAUTH_SECRET", "NEXTAUTH_URL", "ADMIN_SEED_EMAIL", "ADMIN_SEED_PASSWORD"];
    const withValues = expected.filter((k) => !!process.env[k]);
    const presentButEmpty = expected.filter((k) => k in process.env && !process.env[k]);
    throw new Error(
      `MONGODB_URI not set.\nExpected to load it from: ${envPath}\n` +
        `Keys with a real value: ${withValues.length ? withValues.join(", ") : "(none)"}\n` +
        `Keys present but empty (likely injected by another tool, e.g. dotenvx, without a value): ${
          presentButEmpty.length ? presentButEmpty.join(", ") : "(none)"
        }\n` +
        `Check that .env.local exists at the repo root, contains a line like ` +
        `"MONGODB_URI=mongodb+srv://..." with no surrounding quotes, and that no other ` +
        `dotenv-loading tool (e.g. dotenvx) is overriding it with a different file.`
    );
  }

  await mongoose.connect(uri);
  console.log("Connected to MongoDB");

  const adminEmail = (process.env.ADMIN_SEED_EMAIL || "admin@gamescreator.com").toLowerCase();
  const adminPassword = process.env.ADMIN_SEED_PASSWORD || "ChangeMe123!";

  const existingAdmin = await AdminUser.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await AdminUser.create({ name: "Studio Admin", email: adminEmail, passwordHash, role: "admin" });
    console.log(`Created admin user: ${adminEmail}`);
  } else {
    console.log("Admin user already exists, skipping");
  }

  if ((await TeamMember.countDocuments()) === 0) {
    await TeamMember.insertMany(TEAM);
    console.log(`Seeded ${TEAM.length} team members`);
  } else {
    console.log("Team members already exist, skipping");
  }

  if ((await Game.countDocuments()) === 0) {
    await Game.insertMany(GAMES);
    console.log(`Seeded ${GAMES.length} games`);
  } else {
    console.log("Games already exist, skipping");
  }

  if ((await CareerPosting.countDocuments()) === 0) {
    await CareerPosting.insertMany(CAREERS.map((c) => ({ ...c, active: true })));
    console.log(`Seeded ${CAREERS.length} career postings`);
  } else {
    console.log("Career postings already exist, skipping");
  }

  if ((await BlogPost.countDocuments()) === 0) {
    await BlogPost.insertMany(BLOGS.map((b) => ({ ...b, publishedAt: new Date() })));
    console.log(`Seeded ${BLOGS.length} blog posts`);
  } else {
    console.log("Blog posts already exist, skipping");
  }

  await mongoose.disconnect();
  console.log("Seed complete.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
