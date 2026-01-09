import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { posts } from '@/lib/data';
import { BlogPostCard } from '@/components/blog-post-card';

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h1 className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                From the Hub
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Insights, stories, and updates from the heart of African tech innovation.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
