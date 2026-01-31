import { notFound } from 'next/navigation';
import BlogDetails from './_components/BlogDetails';
import { BLOGS } from '@/lib/blogs';
import { Metadata } from 'next';

export const generateStaticParams = async () => {
    return BLOGS.map((blog) => ({ slug: blog.slug }));
};

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}) => {
    const { slug } = await params;
    const blog = BLOGS.find((blog) => blog.slug === slug);

    return {
        title: `${blog?.title} - ${blog?.readTime}`,
        description: blog?.excerpt,
    } as Metadata;
};

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    const blog = BLOGS.find((blog) => blog.slug === slug);

    if (!blog) {
        return notFound();
    }

    return <BlogDetails blog={blog} />;
};

export default Page;
