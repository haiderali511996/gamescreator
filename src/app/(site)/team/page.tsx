import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Avatar from "@/components/Avatar";
import Reveal from "@/components/Reveal";
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

function SocialLinks({ member }: { member: ITeamMember }) {
  if (!member.socialLinks?.linkedin && !member.socialLinks?.twitter && !member.socialLinks?.github) {
    return null;
  }
  return (
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
  );
}

export default async function TeamPage() {
  const team = await getTeam();
  const founders = team.filter((m) => /founder/i.test(m.role)).slice(0, 2);

  return (
    <div>
      <PageHero eyebrow="The People" title="Meet Our Team" subtitle="The designers, engineers, and artists building Games Creator's worlds." />
      <section className="mx-auto max-w-6xl px-4 py-16 lg:px-8">
        {team.length === 0 ? (
          <p className="text-center text-white/60">Team roster coming soon.</p>
        ) : (
          <>
            {founders.length > 0 && (
              <>
                <div className={`grid gap-8 ${founders.length > 1 ? "sm:grid-cols-2" : "sm:grid-cols-1 sm:max-w-xl sm:mx-auto"}`}>
                  {founders.map((member, i) => (
                    <Reveal
                      key={member._id.toString()}
                      delay={i * 0.1}
                      className="gc-card flex flex-col items-center rounded-2xl p-10 text-center transition hover:-translate-y-1 hover:border-amber/50"
                    >
                      <Avatar name={member.name} photo={member.photo} size={144} />
                      <h3 className="gc-heading mt-6 text-2xl font-bold text-white">{member.name}</h3>
                      <p className="mt-1 text-base font-medium text-amber">{member.role}</p>
                      <p className="mt-3 text-sm text-white/60">{member.bio}</p>
                      <SocialLinks member={member} />
                    </Reveal>
                  ))}
                </div>

                <div className="my-14 flex items-center gap-4">
                  <span className="h-px flex-1 bg-white/10" />
                  <span className="gc-heading text-xs font-bold uppercase tracking-[0.3em] text-amber">Team</span>
                  <span className="h-px flex-1 bg-white/10" />
                </div>
              </>
            )}

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member, i) => (
                <Reveal
                  key={member._id.toString()}
                  delay={(i % 6) * 0.06}
                  className="gc-card flex flex-col items-center rounded-xl p-6 text-center transition hover:-translate-y-1 hover:border-amber/40"
                >
                  <Avatar name={member.name} photo={member.photo} />
                  <h3 className="gc-heading mt-4 text-lg font-bold text-white">{member.name}</h3>
                  <p className="text-sm font-medium text-amber">{member.role}</p>
                  <p className="mt-2 text-sm text-white/60">{member.bio}</p>
                  <SocialLinks member={member} />
                </Reveal>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
