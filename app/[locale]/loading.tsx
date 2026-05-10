import Container from "@/common/components/elements/Container";

const Loading = () => {
  return (
    <Container className="flex h-full flex-col items-center justify-center gap-y-3 text-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-neutral-300 border-t-primary dark:border-neutral-700 dark:border-t-primary" />
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        Loading...
      </p>
    </Container>
  );
};

export default Loading;
