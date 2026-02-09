import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Play, Pause } from 'lucide-react';
import './HeroSlider.css';

// Default stories if no data is passed
export const defaultStories = [
    {
        id: 'archive-western-line',
        title: "Inspection & Stakeholder Meeting on the Western Line – Takoradi",
        subtitle: "November 2025",
        description: "A joint technical team from GRDA, Amandi Holdings, and TEAM Engineering conducted a comprehensive inspection of the standard gauge railway line from Manso through Amantin to Esuaso, designed to transport manganese from Nsuta Mines to Takoradi Port by 2027.",
        image: "/images/archives/arch-29.jpg",
        linkText: "Read Full Story",
        stats: { value: "2027", label: "Target Year" }
    },
    {
        id: 'archive-13',
        title: "Ghana Railway Development Authority Board Inauguration",
        subtitle: "July 2025",
        description: "The Ministry of Transport hosted the official inauguration of the newly constituted Board of the GRDA, led by Chairman Mr. R.A.Y. Anamoo and CEO Dr. Frederick Appoh, marking a landmark event in railway governance.",
        image: "/images/archives/arch-19.jpeg",
        linkText: "Read Full Story",
        stats: { value: "9", label: "Board Members" }
    },
    {
        id: 'archive-15',
        title: "GRDA & Siemens Mobility Partner to Upgrade SGR Signalling",
        subtitle: "November 2025",
        description: "The Ghana Railway Development Authority and Siemens Mobility have agreed on a technical upgrade of the Signalling and Telecommunication systems on the Tema-Mpakadan Standard Gauge Railway, transitioning to the European Train Control System (ETCS).",
        image: "/images/archives/arch-24.jpg",
        linkText: "Read Full Story",
        stats: { value: "ETCS", label: "New System" }
    },
    {
        id: 'archive-16',
        title: "Ghana Transport and Logistics Fair 2025",
        subtitle: "November 2025",
        description: "GRDA proudly took part in the 2025 Ghana Transport and Logistics Fair, showcasing the Tema–Mpakadan Railway Line and Western Line projects to visitors and prospective partners.",
        image: "/images/archives/arch-34.jpeg",
        linkText: "Read Full Story",
        stats: { value: "3 Days", label: "Exhibition" }
    },
    {
        id: 'archive-17',
        title: "GRDA Holds Mega Staff Durbar",
        subtitle: "December 2025",
        description: "The GRDA held a MEGA staff durbar at our Roman Ridge office, where the CEO highlighted the key achievements of 2025 and shared the Authority's vision for the coming year.",
        image: "/images/archives/arch-35.jpg",
        linkText: "Read Full Story",
        stats: { value: "2025", label: "Year in Review" }
    },
    {
        id: 1,
        title: "Leading Railway Development",
        subtitle: "Building Tomorrow's Infrastructure",
        description: "The Ghana Railway Development Authority is dedicated to building a world-class, sustainable, and efficient railway network for the nation's future.",
        image: "https://firebasestorage.googleapis.com/v0/b/grda-website.firebasestorage.app/o/IMG_1783.JPG?alt=media&token=31c97e99-5618-4bb7-b0bf-901637316d46",
        link: "/projects",
        linkText: "Explore Projects",
        stats: { value: "160km", label: "Track Completed" }
    },
    {
        id: 2,
        title: "Tema - Mpakadan Service",
        subtitle: "Your Journey Starts Here",
        description: "Experience safe, reliable, and comfortable passenger service on the new standard gauge line connecting communities.",
        image: "https://firebasestorage.googleapis.com/v0/b/grda-website.firebasestorage.app/o/5.jpg?alt=media&token=c92fb5a6-5bad-47cc-a26a-2033ba65d8df",
        link: "/services",
        linkText: "View Schedule",
        stats: { value: "1,500+", label: "Monthly Passengers" }
    },
    {
        id: 3,
        title: "Modernizing Infrastructure",
        subtitle: "Transforming Transportation",
        description: "Connecting Ghana through strategic railway infrastructure development, driving economic growth and sustainable mobility.",
        image: "/images/archives/-7.png",
        link: "/about",
        linkText: "Learn More",
        stats: { value: "12", label: "Active Projects" }
    }
];

const HeroSlider = ({ stories = defaultStories }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const SLIDE_DURATION = 7000; // 7 seconds per slide
    const PROGRESS_INTERVAL = 50;

    const goToSlide = useCallback((index) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex(index);
        setProgress(0);
        setTimeout(() => setIsTransitioning(false), 800);
    }, [isTransitioning]);

    const nextSlide = useCallback(() => {
        goToSlide((currentIndex + 1) % stories.length);
    }, [currentIndex, stories.length, goToSlide]);

    const prevSlide = useCallback(() => {
        goToSlide(currentIndex === 0 ? stories.length - 1 : currentIndex - 1);
    }, [currentIndex, stories.length, goToSlide]);

    // Auto-play with progress bar
    useEffect(() => {
        if (!isPlaying) return;

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    nextSlide();
                    return 0;
                }
                return prev + (100 / (SLIDE_DURATION / PROGRESS_INTERVAL));
            });
        }, PROGRESS_INTERVAL);

        return () => clearInterval(progressInterval);
    }, [isPlaying, nextSlide]);

    // Reset progress when slide changes manually
    useEffect(() => {
        setProgress(0);
    }, [currentIndex]);

    if (!stories || stories.length === 0) return null;

    const currentStory = stories[currentIndex];

    return (
        <div className="hero-slider-premium">
            {/* Background Slides with Ken Burns effect */}
            {stories.map((story, index) => (
                <div
                    key={story.id || index}
                    className={`hero-slide ${index === currentIndex ? 'active' : ''} ${index === (currentIndex - 1 + stories.length) % stories.length ? 'prev' : ''
                        }`}
                >
                    <div
                        className="hero-slide-bg"
                        style={{ backgroundImage: `url(${story.image})` }}
                    />
                    <div className="hero-slide-overlay" />
                </div>
            ))}

            {/* Content Layer */}
            <div className="hero-content-layer">
                <div className="container">
                    <div className="hero-content-grid">
                        {/* Main Content */}
                        <div className="hero-main-content">
                            <span className={`hero-subtitle ${currentIndex === stories.indexOf(currentStory) ? 'animate' : ''}`}>
                                {currentStory.subtitle || 'Ghana Railway Development Authority'}
                            </span>
                            <h1 className={`hero-title ${currentIndex === stories.indexOf(currentStory) ? 'animate' : ''}`}>
                                {currentStory.title}
                            </h1>
                            <p className={`hero-description ${currentIndex === stories.indexOf(currentStory) ? 'animate' : ''}`}>
                                {currentStory.description}
                            </p>
                            <div className={`hero-actions ${currentIndex === stories.indexOf(currentStory) ? 'animate' : ''}`}>
                                {currentStory.id ? (
                                    <Link to={`/stories/${currentStory.id}`} className="hero-btn primary">
                                        <span>{currentStory.linkText || "Read More"}</span>
                                        <ArrowRight size={18} />
                                    </Link>
                                ) : currentStory.link ? (
                                    <Link to={currentStory.link} className="hero-btn primary">
                                        <span>{currentStory.linkText || "Learn More"}</span>
                                        <ArrowRight size={18} />
                                    </Link>
                                ) : null}
                                <Link to="/contact" className="hero-btn secondary">
                                    Contact Us
                                </Link>
                            </div>
                        </div>

                        {/* Stats Card */}
                        {currentStory.stats && (
                            <div className={`hero-stats-card ${currentIndex === stories.indexOf(currentStory) ? 'animate' : ''}`}>
                                <div className="stats-value">{currentStory.stats.value}</div>
                                <div className="stats-label">{currentStory.stats.label}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Navigation Arrows */}
            <button className="hero-nav-btn prev" onClick={prevSlide} aria-label="Previous slide">
                <ArrowLeft size={24} />
            </button>
            <button className="hero-nav-btn next" onClick={nextSlide} aria-label="Next slide">
                <ArrowRight size={24} />
            </button>

            {/* Bottom Controls */}
            <div className="hero-bottom-controls">
                <div className="container">
                    <div className="hero-controls-inner">
                        {/* Play/Pause Button */}
                        <button
                            className="hero-play-btn"
                            onClick={() => setIsPlaying(!isPlaying)}
                            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
                        >
                            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                        </button>

                        {/* Progress Indicators */}
                        <div className="hero-progress-indicators">
                            {stories.map((story, index) => (
                                <button
                                    key={index}
                                    className={`hero-progress-item ${index === currentIndex ? 'active' : ''}`}
                                    onClick={() => goToSlide(index)}
                                >
                                    <span className="progress-number">{String(index + 1).padStart(2, '0')}</span>
                                    <div className="progress-bar-wrapper">
                                        <div
                                            className="progress-bar-fill"
                                            style={{
                                                width: index === currentIndex ? `${progress}%` :
                                                    index < currentIndex ? '100%' : '0%'
                                            }}
                                        />
                                    </div>
                                    <span className="progress-title">{story.title?.substring(0, 20)}...</span>
                                </button>
                            ))}
                        </div>

                        {/* Slide Counter */}
                        <div className="hero-slide-counter">
                            <span className="current">{String(currentIndex + 1).padStart(2, '0')}</span>
                            <span className="separator">/</span>
                            <span className="total">{String(stories.length).padStart(2, '0')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSlider;
