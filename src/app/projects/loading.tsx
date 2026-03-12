import { Skeleton } from '@/components/ui/skeleton';

export default function ProjectsLoading() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <Skeleton className="mx-auto h-12 w-3/4 sm:h-16" />
          <Skeleton className="mx-auto mt-6 h-6 w-5/6" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-96 rounded-2xl" />
          <Skeleton className="h-96 rounded-2xl" />
          <Skeleton className="h-96 rounded-2xl" />
          <Skeleton className="h-96 rounded-2xl" />
          <Skeleton className="h-96 rounded-2xl" />
          <Skeleton className="h-96 rounded-2xl" />
        </div>
      </div>
    </section>
  );
}
