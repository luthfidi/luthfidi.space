import Skeleton from "react-loading-skeleton";

const CreationSkeleton = () => (
  <div className="flex h-full flex-col gap-3 rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
    <Skeleton height={14} width={100} />
    <Skeleton height={20} count={2} />
    <Skeleton height={32} />
    <Skeleton height={12} width={120} />
  </div>
);

export default CreationSkeleton;
