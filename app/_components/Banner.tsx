'use client';
import ArrowAnimation from '@/components/ArrowAnimation';
import Button from '@/components/Button';
import { GENERAL_INFO } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useState } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Banner = () => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // move the content a little up on scroll
    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'bottom 70%',
                    end: 'bottom 10%',
                    scrub: 1,
                },
            });

            tl.fromTo(
                '.slide-up-and-fade',
                { y: 0 },
                { y: -150, opacity: 0, stagger: 0.02 },
            );
        },
        { scope: containerRef },
    );

    return (
        <section className="relative overflow-hidden" id="banner">
            <ArrowAnimation />
            <div
                className="container h-[100svh] min-h-[530px] max-md:pb-10 flex justify-between items-center max-md:flex-col"
                ref={containerRef}
            >
                <div className="max-md:grow max-md:flex flex-col justify-center items-start max-w-[544px]">
                    <h1 className="banner-title slide-up-and-fade leading-[.95] text-6xl sm:text-[80px] font-anton">
                        <span className="text-primary">BACKEND</span>
                        <br /> <span className="ml-4">DEVELOPER</span>
                    </h1>
                    <p className="banner-description slide-up-and-fade mt-6 text-lg text-muted-foreground">
                        Hi! I&apos;m{' '}
                        <span className="font-medium text-foreground">
                            Darshit
                        </span>
                        . A creative Backend Developer with 2.5+ years of
                        experience in building high-performance, scalable, and
                        responsive web solutions.
                    </p>
                    <div className="flex gap-4 mt-9">
                        <Button
                            as="link"
                            target="_blank"
                            rel="noopener noreferrer"
                            href={GENERAL_INFO.upworkProfile}
                            variant="primary"
                            className="banner-button slide-up-and-fade"
                        >
                            Hire Me
                        </Button>

                        <div className="relative">
                            <Button
                                as="button"
                                variant="secondary"
                                className="banner-button slide-up-and-fade"
                                onClick={() =>
                                    setIsDropdownOpen(!isDropdownOpen)
                                }
                            >
                                Schedule a Meeting
                                <svg
                                    className={`w-4 h-4 ml-2 transition-transform inline ${
                                        isDropdownOpen ? 'rotate-180' : ''
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </Button>

                            {isDropdownOpen && (
                                <div
                                    className="absolute top-full left-0 w-full bg-background border border-border rounded-md shadow-lg z-10"
                                    onMouseEnter={() => setIsDropdownOpen(true)}
                                    onMouseLeave={() =>
                                        setIsDropdownOpen(false)
                                    }
                                >
                                    <a
                                        href={
                                            GENERAL_INFO.meetingLinks['15min']
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block px-4 py-3 text-sm hover:bg-background-active transition-colors border-b border-border"
                                    >
                                        15 Minutes
                                    </a>
                                    <a
                                        href={
                                            GENERAL_INFO.meetingLinks['30min']
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block px-4 py-3 text-sm hover:bg-background-active transition-colors"
                                    >
                                        30 Minutes
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="md:absolute bottom-[10%] right-[4%] flex md:flex-col gap-4 md:gap-8 text-center md:text-right">
                    <div className="slide-up-and-fade">
                        <h5 className="text-3xl sm:text-4xl font-anton text-primary mb-1.5">
                            2.5+
                        </h5>
                        <p className="text-muted-foreground">
                            Years of Experience
                        </p>
                    </div>
                    <div className="slide-up-and-fade">
                        <h5 className="text-3xl sm:text-4xl font-anton text-primary mb-1.5">
                            10+
                        </h5>
                        <p className="text-muted-foreground">
                            Completed Projects
                        </p>
                    </div>
                    <div className="slide-up-and-fade">
                        <h5 className="text-3xl sm:text-4xl font-anton text-primary mb-1.5">
                            10K+
                        </h5>
                        <p className="text-muted-foreground">Hours Worked</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
