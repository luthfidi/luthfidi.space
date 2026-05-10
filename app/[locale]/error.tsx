"use client";

import { useEffect } from "react";

import Container from "@/common/components/elements/Container";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex h-full flex-col items-center justify-center gap-y-4 text-center">
      <h1 className="text-4xl font-semibold text-neutral-700 dark:text-neutral-300">
        Something went wrong
      </h1>
      <p className="max-w-md text-sm text-neutral-600 dark:text-neutral-400">
        An unexpected error occurred. Try again, or head back to the home page.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-full border border-neutral-700 px-4 py-2 text-sm transition-colors hover:bg-neutral-700 hover:text-neutral-300 dark:border-neutral-300 hover:dark:bg-neutral-300 hover:dark:text-neutral-700"
      >
        Try again
      </button>
    </Container>
  );
};

export default ErrorPage;
