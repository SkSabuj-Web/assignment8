import React from "react";
import Link from "next/link";

const HomePage = () => {
  const sessions = [
    {
      id: 1,
      title: "Project Overview",
      description:
        "Understand Assignment 8 requirements, project structure, features, and the overall workflow.",
      tag: "Getting Started",
      color: "bg-indigo-100 text-indigo-700",
    },
    {
      id: 2,
      title: "Frontend Development",
      description:
        "Explore the UI structure, reusable components, data fetching, and frontend implementation.",
      tag: "Frontend",
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: 3,
      title: "Backend & API Integration",
      description:
        "Understand API integration, CRUD operations, authentication, and common backend challenges.",
      tag: "Backend",
      color: "bg-purple-100 text-purple-700",
    },
    {
      id: 4,
      title: "Debugging & Q&A",
      description:
        "Identify common mistakes, solve project blockers, and get answers to your assignment-related questions.",
      tag: "Problem Solving",
      color: "bg-emerald-100 text-emerald-700",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Assignment 8 Incubator
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
              Get Unstuck,
              <span className="text-indigo-600"> Build with Confidence.</span>
            </h1>

            <p className="text-slate-600 text-lg mt-6 leading-relaxed">
              A focused short session designed to boost your Assignment 8
              progress. Understand the project, overcome technical challenges,
              and move closer to successful completion.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="#sessions"
                className="bg-indigo-600 text-white px-7 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Explore Session →
              </Link>

              <Link
                href="#about"
                className="border border-slate-300 text-slate-700 px-7 py-3 rounded-lg font-semibold hover:bg-slate-100 transition"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Highlight Card */}
          <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 rounded-3xl p-8 md:p-10 text-white shadow-xl">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <span className="text-indigo-200 font-semibold text-sm uppercase tracking-wider">
                Your Assignment 8 Journey
              </span>

              <h2 className="text-4xl font-bold mt-5 leading-tight">
                Build.
                <br />
                Debug.
                <br />
                Complete.
              </h2>

              <p className="text-indigo-100 mt-5 leading-relaxed">
                Don&apos;t let technical challenges slow you down. Learn the
                concepts, solve the blockers, and keep moving forward.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-6 border-t border-white/20 pt-6">
                <div>
                  <h3 className="text-3xl font-bold">04</h3>
                  <p className="text-sm text-indigo-200 mt-1">Focus Areas</p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold">100%</h3>
                  <p className="text-sm text-indigo-200 mt-1">
                    Focus on Progress
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sessions Section */}
      <section id="sessions" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-indigo-600 font-semibold uppercase tracking-wider text-sm">
              What We&apos;ll Cover
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">
              Inside the Incubator Session
            </h2>

            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
              A practical learning experience focused on the key areas you need
              to understand and complete Assignment 8.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="group border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-2 transition duration-300 bg-white"
              >
                <div className="flex justify-between items-center">
                  <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center text-xl font-bold">
                    {String(session.id).padStart(2, "0")}
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${session.color}`}
                  >
                    {session.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-800 mt-6">
                  {session.title}
                </h3>

                <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                  {session.description}
                </p>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <span className="text-indigo-600 text-sm font-semibold group-hover:translate-x-1 inline-block transition">
                    Learning Focus →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Gain */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-indigo-600 font-semibold uppercase tracking-wider text-sm">
              Why Join This Session?
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 leading-tight">
              Turn Your Confusion into
              <span className="text-indigo-600"> Progress.</span>
            </h2>

            <p className="text-slate-600 mt-5 leading-relaxed">
              The goal is not just to watch another session. It&apos;s about
              understanding what you&apos;re building, identifying where
              you&apos;re stuck, and getting the direction you need to move
              forward.
            </p>
          </div>

          <div className="space-y-5">
            {[
              {
                title: "Clear Project Understanding",
                description:
                  "Get a better understanding of Assignment 8 requirements and implementation.",
              },
              {
                title: "Solve Technical Blockers",
                description:
                  "Find solutions to common frontend, backend, and integration issues.",
              },
              {
                title: "Improve Your Confidence",
                description:
                  "Get the guidance you need to continue working independently.",
              },
              {
                title: "Move Towards Completion",
                description:
                  "Build a clear direction for completing and submitting your assignment.",
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="w-9 h-9 shrink-0 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                  ✓
                </div>

                <div>
                  <h3 className="font-bold text-slate-800">{item.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / CTA Section */}
      <section id="about" className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-10 md:p-16 text-center">
          <span className="text-indigo-600 font-semibold uppercase tracking-wider text-sm">
            Your Next Step Starts Here
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4">
            Stuck on Assignment 8?
            <br />
            Let&apos;s Move Forward Together.
          </h2>

          <p className="text-slate-600 max-w-2xl mx-auto mt-5 leading-relaxed">
            Bring your questions, share your challenges, and make the most of
            this focused incubator session. Every small step counts towards
            completing your assignment.
          </p>

          <Link
            href="#sessions"
            className="inline-block mt-8 bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Explore Learning Topics →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-xl font-bold text-white">
            Assignment 8 Incubator
          </h2>

          <p className="mt-3 text-sm">
            Learn Together. Solve Together. Grow Together.
          </p>

          <p className="mt-4 text-xs text-slate-500">
            © 2026 Assignment 8 Incubator. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
};

export default HomePage;
