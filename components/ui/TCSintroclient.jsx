"use client";

export default function TCSintroclient() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gray-900 text-white py-6">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-2xl font-bold">TCS Interview Intro</h1>
          <p className="text-sm text-gray-300">
            Welcome to your preparation dashboard
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Get Started</h2>
          <p className="text-gray-700">
            Explore curated resources, practice questions, and tips tailored for
            TCS interviews.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Aptitude</h3>
            <p className="text-gray-600 text-sm">
              Practice quantitative and logical reasoning.
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Coding</h3>
            <p className="text-gray-600 text-sm">
              Sharpen your problem-solving and coding skills.
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Technical</h3>
            <p className="text-gray-600 text-sm">
              Review core CS topics and system design.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
