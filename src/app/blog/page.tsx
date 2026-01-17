import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BlogPostCard } from '@/components/blog-post-card';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getPosts } from '@/app/actions/posts';

export default async function BlogPage() {
  const posts = await getPosts();

  const featuredPosts = posts.slice(0, 3);
  const otherArticles = posts.slice(3);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h1 className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                From the Hub
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Insights, stories, and updates from the heart of African tech innovation.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>

        <section className="border-t py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="font-headline text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Other Articles
              </h2>
              <p className="mt-3 text-lg text-muted-foreground">
                Explore more topics and insights from our team of experts.
              </p>
            </div>
            <div className="mx-auto max-w-2xl">
              <div className="space-y-4">
                {otherArticles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={`/blog/${article.slug}`} className="group block">
                      <Card className="transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/10">
                        <CardContent className="flex items-center justify-between p-6">
                          <h3 className="font-semibold text-foreground">{article.title}</h3>
                          <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
