'use client';
import parse from 'html-react-parser';
import ArrowAnimation from '@/components/ArrowAnimation';
import TransitionLink from '@/components/TransitionLink';
import { IBlog } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { useRef } from 'react';

// Simple markdown to HTML converter
const convertMarkdownToHtml = (markdown: string): string => {
    return (
        markdown
            // Headers
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            // Bold
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            // Italic
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            // Code blocks
            .replace(
                /```(\w+)?\n([\s\S]*?)```/gim,
                '<pre><code>$2</code></pre>',
            )
            // Inline code
            .replace(/`([^`]+)`/gim, '<code>$1</code>')
            // Links
            .replace(
                /\[([^\]]+)\]\(([^)]+)\)/gim,
                '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
            )
            // Lists
            .replace(/^\* (.*$)/gim, '<li>$1</li>')
            .replace(/(<li>.*<\/li>)/gims, '<ul>$1</ul>')
            // Line breaks
            .replace(/\n\n/gim, '</p><p>')
            .replace(/\n/gim, '<br/>')
            // Wrap in paragraphs
            .replace(/^(?!<[hul])/gim, '<p>')
            .replace(/(?<!>)$/gim, '</p>')
            // Clean up
            .replace(/<p><\/p>/gim, '')
            .replace(/<p>(<[hul])/gim, '$1')
            .replace(/(<\/[hul]>)<\/p>/gim, '$1')
    );
};

interface Props {
    blog: IBlog;
}

gsap.registerPlugin(useGSAP, ScrollTrigger);

const BlogDetails = ({ blog }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!containerRef.current) return;

            gsap.set('.fade-in-later', {
                autoAlpha: 0,
                y: 30,
            });
            const tl = gsap.timeline({
                delay: 0.5,
            });

            tl.to('.fade-in-later', {
                autoAlpha: 1,
                y: 0,
                stagger: 0.1,
            });
        },
        { scope: containerRef },
    );

    // blur info div and make it smaller on scroll
    useGSAP(
        () => {
            if (window.innerWidth < 992) return;

            gsap.to('#info', {
                filter: 'blur(3px)',
                autoAlpha: 0,
                scale: 0.9,
                scrollTrigger: {
                    trigger: '#info',
                    start: 'bottom bottom',
                    end: 'bottom top',
                    pin: true,
                    pinSpacing: false,
                    scrub: 0.5,
                },
            });
        },
        { scope: containerRef },
    );

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <section className="pt-5 pb-14">
            <div className="container" ref={containerRef}>
                <TransitionLink
                    back
                    href="/blogs"
                    className="mb-16 inline-flex gap-2 items-center group h-12"
                >
                    <ArrowLeft className="group-hover:-translate-x-1 group-hover:text-primary transition-all duration-300" />
                    Back to Blogs
                </TransitionLink>

                <div
                    className="top-0 min-h-[calc(100svh-100px)] flex"
                    id="info"
                >
                    <div className="relative w-full">
                        <div className="flex items-start gap-6 mx-auto mb-10 max-w-[800px]">
                            <h1 className="fade-in-later opacity-0 text-4xl md:text-[60px] leading-none font-anton overflow-hidden">
                                <span className="inline-block">
                                    {blog.title}
                                </span>
                            </h1>
                        </div>

                        <div className="max-w-[800px] space-y-7 pb-20 mx-auto">
                            <div className="fade-in-later flex flex-wrap gap-6 text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Calendar size={18} />
                                    <span>{formatDate(blog.publishedAt)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={18} />
                                    <span>{blog.readTime}</span>
                                </div>
                            </div>

                            <div className="fade-in-later">
                                <p className="text-muted-foreground font-anton mb-3">
                                    Tags
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {blog.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="inline-flex items-center gap-1 px-3 py-1 bg-background-light text-sm rounded-full"
                                        >
                                            <Tag size={14} />
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="fade-in-later">
                                <p className="text-muted-foreground font-anton mb-3">
                                    Summary
                                </p>
                                <div className="text-lg text-muted-foreground">
                                    {blog.excerpt}
                                </div>
                            </div>
                        </div>

                        <ArrowAnimation />
                    </div>
                </div>

                <div className="fade-in-later relative max-w-[800px] mx-auto">
                    {/* Blog thumbnail */}
                    <div
                        className="w-full aspect-[16/9] bg-background-light mb-12 rounded-lg overflow-hidden"
                        style={{
                            backgroundImage: `url(${blog.thumbnail})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    />

                    {/* Blog content */}
                    <div className="max-w-none">
                        {blog.content ? (
                            <div className="markdown-content">
                                {parse(convertMarkdownToHtml(blog.content))}
                            </div>
                        ) : (
                            <div className="text-center py-20 text-muted-foreground">
                                <h3 className="text-2xl font-anton mb-4">
                                    Content Coming Soon
                                </h3>
                                <p>
                                    This blog post is currently being written.
                                    Check back soon for the full content!
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogDetails;
