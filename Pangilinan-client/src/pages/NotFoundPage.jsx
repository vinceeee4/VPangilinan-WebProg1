import React from 'react';

function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 text-center">
      <div className="mb-6 text-8xl font-black text-zinc-200 select-none">404</div>
      <h1 className="text-3xl font-bold text-zinc-900 sm:text-4xl">Page Not Found</h1>
      <p className="mt-4 max-w-md text-sm leading-7 text-zinc-500 sm:text-base">
        The page you're looking for doesn't exist, or there might be an issue with the code.
        This could happen when routes are removed or components are missing.
      </p>
      <div className="mt-8 flex gap-4">
        <a href="/" className="inline-flex items-center justify-center rounded-full border-2 border-zinc-900 bg-zinc-900 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-50 transition hover:bg-red-500">
          Go Home
        </a>
        <a href="/articles" className="inline-flex items-center justify-center rounded-full border-2 border-zinc-900 bg-zinc-50 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-900 transition hover:bg-red-700">
          Browse Articles
        </a>
      </div>
    </div>
  );
}

export default NotFoundPage;