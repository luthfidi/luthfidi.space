import Skeleton from "react-loading-skeleton";

const CreationSkeleton = () => (
  <div className="flex h-full flex-col gap-3 rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
    <div className="relative aspect-square w-full overflow-hidden rounded-md leading-none">
      <Skeleton
        style={{ display: "block", height: "100%", width: "100%" }}
      />
    </div>

    <Skeleton height={14} count={2} />

    <div className="grid grid-cols-5 gap-2">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="flex flex-col items-center gap-1 leading-none"
        >
          <Skeleton circle width={14} height={14} />
          <Skeleton height={10} width={24} />
        </div>
      ))}
    </div>

    <div className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-2 dark:border-neutral-800">
      <Skeleton height={10} width={70} />
      <Skeleton height={12} width={45} />
    </div>
  </div>
);

export default CreationSkeleton;
