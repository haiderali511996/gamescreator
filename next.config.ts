import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Shared hosts like cPanel enforce strict per-user OS process limits.
  // Next.js's default build workers spawn child processes (jest-worker),
  // which can hit that limit and fail with "spawn ... EAGAIN". Cap it to a
  // single worker and use worker_threads (in-process) instead of spawning
  // separate OS processes.
  experimental: {
    cpus: 1,
    workerThreads: true,
  },
};

export default nextConfig;
