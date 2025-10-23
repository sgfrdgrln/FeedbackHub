export default function FeedbackSkeleton() {
  return (
    <div className="rounded-xl p-6 shadow-md border-2 animate-pulse" style={{ background: 'var(--background)', borderColor: 'var(--gray-light)' }}>
      <div className="flex items-start justify-between gap-4">
        {/* Upvote Button Skeleton */}
        <div className="min-w-[60px] h-[70px] rounded-lg" style={{ background: 'linear-gradient(to bottom right, var(--mint-light), var(--mint-light))' }}></div>

        {/* Content Skeleton */}
        <div className="flex-1 space-y-4">
          <div className="flex items-start justify-between gap-4">
            {/* Title Skeleton */}
            <div className="flex-1 space-y-2">
              <div className="h-6 rounded w-3/4" style={{ background: 'linear-gradient(to bottom right, var(--gray-light), var(--gray-light))' }}></div>
            </div>
            {/* Status Badge Skeleton */}
            <div className="h-6 w-24 rounded-full" style={{ background: 'linear-gradient(to bottom right, var(--mint-light), var(--mint-light))' }}></div>
          </div>

          {/* Description Skeleton */}
          <div className="space-y-2">
            <div className="h-4 rounded w-full" style={{ background: 'linear-gradient(to bottom right, var(--gray-light), var(--gray-light))' }}></div>
            <div className="h-4 rounded w-5/6" style={{ background: 'linear-gradient(to bottom right, var(--gray-light), var(--gray-light))' }}></div>
          </div>

          {/* Footer Skeleton */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-6 w-20 rounded-lg" style={{ background: 'linear-gradient(to bottom right, var(--mint-light), var(--mint-light))' }}></div>
              <div className="h-4 w-32 rounded" style={{ background: 'linear-gradient(to bottom right, var(--gray-light), var(--gray-light))' }}></div>
            </div>
            <div className="h-4 w-20 rounded" style={{ background: 'linear-gradient(to bottom right, var(--gray-light), var(--gray-light))' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeedbackSkeletonList({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <FeedbackSkeleton key={index} />
      ))}
    </div>
  );
}
