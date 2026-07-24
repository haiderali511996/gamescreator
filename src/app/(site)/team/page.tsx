import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Avatar from "@/components/Avatar";
import dbConnect from "@/lib/mongodb";
import TeamMember, { ITeamMember } from "@/models/TeamMember";

export const metadata: Metadata = { title: "Team" };
export const dynamic = "force-dynamic";

async function getTeam() {
  try {
    await dbConnect();
    return await TeamMember.find().sort({ order: 1 }).lean<ITeamMember[]>();
  } catch {
    return [];
  }
}

export default async function TeamPage() {
  const team = await getTeam();

  return (
    <div>
      <PageHero eyebrow="The People" title="Meet Our Team" subtitle="The designers, engineers, and artists building Games Creator's worlds." />
      <section className="mx-auto max-w-6xl px-4 py-16 lg:px-8">
        {team.length === 0 ? (
          <p className="text-center text-white/60">Team roster coming soon.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <div key={member._id.toString()} className="gc-card flex flex-col items-center rounded-xl p-6 text-center">
                <Avatar name={member.name} />
                <h3 className="gc-heading mt-4 text-lg font-bold text-white">{member.name}</h3>
                <p className="text-sm font-medium text-amber">{member.role}</p>
                <p className="mt-2 text-sm text-white/60">{member.bio}</p>
                {(member.socialLinks?.linkedin || member.socialLinks?.twitter || member.socialLinks?.github) && (
                  <div className="mt-4 flex gap-3 text-xs text-white/40">
                    {member.socialLinks?.linkedin && (
                      <a href={member.socialLinks.linkedin} target="_blank" rel="noreferrer" className="hover:text-amber">
                        LinkedIn
                      </a>
                    )}
                    {member.socialLinks?.twitter && (
                      <a href={member.socialLinks.twitter} target="_blank" rel="noreferrer" className="hover:text-amber">
                        Twitter
                      </a>
                    )}
                    {member.socialLinks?.github && (
                      <a href={member.socialLinks.github} target="_blank" rel="noreferrer" className="hover:text-amber">
                        GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
