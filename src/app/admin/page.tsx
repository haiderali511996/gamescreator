import dbConnect from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import TeamMember from "@/models/TeamMember";
import Game from "@/models/Game";
import CareerPosting from "@/models/CareerPosting";
import NewsletterSubscriber from "@/models/NewsletterSubscriber";
import SubmitGame from "@/models/SubmitGame";
import ContactSubmission from "@/models/ContactSubmission";

export const dynamic = "force-dynamic";

async function getCounts() {
  try {
    await dbConnect();
    const [blogs, team, games, careers, subscribers, submissions, contacts] = await Promise.all([
      BlogPost.countDocuments(),
      TeamMember.countDocuments(),
      Game.countDocuments(),
      CareerPosting.countDocuments(),
      NewsletterSubscriber.countDocuments(),
      SubmitGame.countDocuments(),
      ContactSubmission.countDocuments(),
    ]);
    return { blogs, team, games, careers, subscribers, submissions, contacts };
  } catch {
    return { blogs: 0, team: 0, games: 0, careers: 0, subscribers: 0, submissions: 0, contacts: 0 };
  }
}

export default async function AdminDashboard() {
  const counts = await getCounts();

  const cards = [
    { label: "Blog Posts", value: counts.blogs },
    { label: "Team Members", value: counts.team },
    { label: "Games", value: counts.games },
    { label: "Career Postings", value: counts.careers },
    { label: "Newsletter Subscribers", value: counts.subscribers },
    { label: "Game Submissions", value: counts.submissions },
    { label: "Contact Messages", value: counts.contacts },
  ];

  return (
    <div>
      <h1 className="gc-heading text-2xl font-bold text-white">Dashboard</h1>
      <p className="mt-1 text-sm text-white/50">Overview of Games Creator content.</p>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="gc-card rounded-xl p-6">
            <p className="gc-heading text-3xl font-bold text-amber">{c.value}</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-white/50">{c.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
