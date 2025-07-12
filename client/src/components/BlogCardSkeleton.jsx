function BlogCardSkeleton() {
  return (
    <div className="w-full rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
      {/* Image skeleton */}
      <div className="relative overflow-hidden">
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 aspect-video w-full" />
      </div>

      <div className="p-5 space-y-3">
        {/* Category badge skeleton */}
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-6 w-20 rounded-full" />

        {/* Title skeleton */}
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-6 w-3/4 rounded" />

        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-4 rounded" />
          <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-4 rounded" />
          <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-4 w-5/6 rounded" />
        </div>

        {/* Author skeleton */}
        <div className="flex items-center gap-3 pt-3">
          <div className="animate-pulse bg-gray-200 dark:bg-gray-700 w-8 h-8 rounded-full" />
          <div className="flex-1 space-y-1">
            <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-4 w-1/2 rounded" />
            <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-3 w-1/4 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCardSkeleton;
