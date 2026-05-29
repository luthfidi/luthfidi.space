import SkeletonLoader from "@/common/components/elements/SkeletonLoader";
import Skeleton from "react-loading-skeleton";

const AchievementSkeleton = () => {
  return (
    <SkeletonLoader>
      <div className="relative overflow-hidden rounded-2xl border-[1.5px] border-neutral-300 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
        <Skeleton
          className="h-44 !rounded-b-none !rounded-t-lg"
          containerClassName="block leading-none"
        />
        <div className="flex flex-col gap-2 p-4">
          <Skeleton className="h-6" containerClassName="block leading-none" />
          <div className="mt-1 space-y-2">
            <Skeleton className="h-4" containerClassName="block leading-none" />
            <Skeleton className="h-4" containerClassName="block leading-none" />
            <Skeleton className="h-4" containerClassName="block leading-none" />
          </div>
        </div>
      </div>
    </SkeletonLoader>
  );
};

export default AchievementSkeleton;
