import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { ArrowRight, MapPin, Calendar, Download, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroSlider, { defaultStories } from '../components/HeroSlider';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import TrainScheduleCard from '../components/TrainScheduleCard';
import StatisticsSection from '../components/StatisticsSection';
import PartnersCarousel from '../components/PartnersCarousel';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { routeSchedules } from '../data/schedules';
import { archiveStories } from '../data/archiveStories';
import './Home.css';

// Format date for display (archive stories)
const formatArchiveDate = (dateStr) => {
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

// Format date for display (Firebase stories)
const formatFirebaseDate = (timestamp) => {
    if (!timestamp) return 'Recent';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

const Home = () => {
    const [stories, setStories] = useState(defaultStories);
    const [projects, setProjects] = useState([]);
    const [latestNews, setLatestNews] = useState([]);
    useScrollAnimation();

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const storiesRef = collection(db, "stories");
                const q = query(storiesRef, orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                const storiesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                if (storiesData.length > 0) {
                    // Prepare Firebase stories for the HeroSlider
                    const sliderStories = storiesData
                        .filter(s => s.image) // Only include stories that have an image
                        .map(s => ({
                            ...s,
                            subtitle: s.category || 'Latest Update',
                            linkText: 'Read Full Story',
                            stats: s.stats || null
                        }));

                    // Put newest Firebase stories FIRST, then defaults
                    setStories([...sliderStories, ...defaultStories]);

                    // Set latest news: Firebase stories first (newest), then archive stories
                    const firebaseNewsCards = storiesData.slice(0, 3).map(s => ({
                        id: s.id,
                        title: s.title,
                        description: s.description,
                        image: s.image,
                        category: s.category || 'news',
                        date: s.createdAt,
                        isFirebase: true
                    }));

                    // Get archive stories as fallback
                    const archiveNewsCards = [...archiveStories]
                        .sort((a, b) => new Date(b.date + '-01') - new Date(a.date + '-01'))
                        .slice(0, 3)
                        .map(s => ({
                            ...s,
                            isFirebase: false
                        }));

                    // Combine: Firebase stories first, fill remaining spots with archive
                    const combined = [...firebaseNewsCards];
                    const remaining = 3 - combined.length;
                    if (remaining > 0) {
                        combined.push(...archiveNewsCards.slice(0, remaining));
                    }
                    setLatestNews(combined);
                } else {
                    // No Firebase stories — use archive stories only
                    const archiveNewsCards = [...archiveStories]
                        .sort((a, b) => new Date(b.date + '-01') - new Date(a.date + '-01'))
                        .slice(0, 3)
                        .map(s => ({ ...s, isFirebase: false }));
                    setLatestNews(archiveNewsCards);
                }
            } catch (error) {
                console.log("Error fetching stories (using defaults):", error);
                // Fallback to archive stories
                const archiveNewsCards = [...archiveStories]
                    .sort((a, b) => new Date(b.date + '-01') - new Date(a.date + '-01'))
                    .slice(0, 3)
                    .map(s => ({ ...s, isFirebase: false }));
                setLatestNews(archiveNewsCards);
            }
        };

        const fetchProjects = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "projects"));
                const projectsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProjects(projectsData.slice(0, 3)); // Get first 3 projects
            } catch (error) {
                console.log("Error fetching projects:", error);
            }
        };

        fetchStories();
        fetchProjects();
    }, []);

    return (
        <>
            {/* Hero Section with Slider */}
            <HeroSlider stories={stories} />

            {/* Train Services CTA */}
            <section className="section cta-section" style={{ backgroundColor: '#F3F4F6' }}>
                <div className="container">
                    <div className="animate-on-scroll fade-up" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ color: 'var(--color-primary-dark)', marginBottom: '1rem' }}>Passenger Train Services</h2>
                        <p style={{ color: '#4b5563', maxWidth: '600px', margin: '0 auto' }}>Experience safe and reliable transport across our Accra-Tema and Western Region rail networks. Check the latest passenger schedules below.</p>
                    </div>

                    <div className="schedule-cards-container animate-on-scroll fade-up">
                        {routeSchedules.map(route => (
                            <TrainScheduleCard key={route.id} route={route} />
                        ))}
                    </div>

                    <div style={{ textAlign: 'center' }} className="animate-on-scroll fade-in">
                        <Link to="/services" className="btn btn-primary">View Full Details</Link>
                    </div>
                </div>
            </section>



            {/* Stats Section */}
            <StatisticsSection />

            {/* Latest News Section */}
            <section className="section latest-news-section">
                <div className="container">
                    <div className="section-header animate-on-scroll fade-up">
                        <h2>Latest News</h2>
                        <p>Updates from the Ghana Railway Development Authority.</p>
                    </div>
                    <div className="premium-news-grid">
                        {latestNews.map((story, index) => (
                            <Link
                                to={`/stories/${story.id}`}
                                key={story.id}
                                className="premium-news-card animate-on-scroll fade-up"
                                style={{ animationDelay: `${index * 0.15}s` }}
                            >
                                <div className="premium-card-image">
                                    <img src={story.image} alt={story.title} />
                                    <div className="premium-card-overlay"></div>
                                    <span className="premium-card-category">
                                        {story.category === 'news' ? 'News' :
                                            story.category === 'press' ? 'Press Release' :
                                                story.category === 'events' ? 'Event' : 'Article'}
                                    </span>
                                </div>
                                <div className="premium-card-content">
                                    <div className="premium-card-meta">
                                        <Calendar size={14} />
                                        <span>
                                            {story.isFirebase
                                                ? formatFirebaseDate(story.date)
                                                : formatArchiveDate(story.date)
                                            }
                                        </span>
                                    </div>
                                    <h3 className="premium-card-title">{story.title}</h3>
                                    <p className="premium-card-excerpt">{story.description}</p>
                                    <div className="premium-card-footer">
                                        <span className="premium-read-more">
                                            Read Story <ArrowRight size={16} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="news-section-cta animate-on-scroll fade-up">
                        <Link to="/media" className="btn btn-outline">
                            View All Stories <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Projects */}
            <section className="section featured-projects-section">
                <div className="container">
                    <div className="section-header animate-on-scroll fade-up">
                        <h2>Featured Projects</h2>
                        <p>Transforming transportation infrastructure across the country.</p>
                    </div>

                    <div className="projects-grid">
                        {projects.length > 0 ? (
                            projects.map((project, index) => (
                                <Link
                                    to={`/projects/${project.id}`}
                                    key={project.id}
                                    className={`project-card animate-on-scroll ${index === 0 ? 'slide-left' : index === 2 ? 'slide-right' : 'fade-up'}`}
                                >
                                    <div className="project-image" style={{ backgroundImage: `url('${project.coverImage || project.image || project.images?.[0] || ''}')` }}></div>
                                    <div className="project-content">
                                        <span className={`project-status ${project.status === 'Completed' ? 'status-completed' : 'status-ongoing'}`}>
                                            {project.status || 'Ongoing'}
                                        </span>
                                        <h3>{project.title}</h3>
                                        <p>{project.description?.substring(0, 100)}{project.description?.length > 100 ? '...' : ''}</p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            // Fallback placeholder projects
                            <>
                                <div className="project-card animate-on-scroll slide-left">
                                    <div className="project-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}></div>
                                    <div className="project-content">
                                        <span className="project-status status-ongoing">Ongoing</span>
                                        <h3>Tema - Mpakadan Standard Gauge</h3>
                                        <p>A 97km strategic railway line connecting the Tema Port to the Lake Transport network.</p>
                                    </div>
                                </div>
                                <div className="project-card animate-on-scroll fade-up">
                                    <div className="project-image" style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1661908853676-e9e4407b4618?q=80&w=2970&auto=format&fit=crop')" }}></div>
                                    <div className="project-content">
                                        <span className="project-status status-ongoing">Ongoing</span>
                                        <h3>Western Railway Line</h3>
                                        <p>Rehabilitation and construction of the standard gauge line to boost mineral transport.</p>
                                    </div>
                                </div>
                                <div className="project-card animate-on-scroll slide-right">
                                    <div className="project-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}></div>
                                    <div className="project-content">
                                        <span className="project-status status-completed">Phase 1 Complete</span>
                                        <h3>Accra - Nsawam Line</h3>
                                        <p>Revitalization of the commuter line to ease traffic congestion in the capital.</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="projects-section-cta animate-on-scroll fade-up">
                        <Link to="/projects" className="btn btn-outline">
                            View All Projects <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Premium Lease Application CTA - Green Theme */}
            <section className="section lease-cta-section" style={{ padding: '4rem 0' }}>
                <div className="container">
                    <div className="lease-cta-card animate-on-scroll fade-up" style={{ 
                        background: 'linear-gradient(135deg, #065F46 0%, #022C22 100%)',
                        borderRadius: 'var(--radius-xl)',
                        padding: '4rem 2rem',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: '0 20px 40px -10px rgba(2, 44, 34, 0.5)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        color: 'white'
                    }}>
                        {/* Decorative Gradient Orbs */}
                        <div style={{ position: 'absolute', top: '-15%', right: '-5%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
                        <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
                        
                        <div style={{ position: 'relative', zIndex: 1, maxWidth: '750px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '72px', height: '72px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', marginBottom: '1.5rem', border: '1px solid rgba(52, 211, 153, 0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
                                <FileText size={36} color="#34D399" />
                            </div>
                            <h2 style={{ color: 'white', marginBottom: '1.25rem', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: '800', letterSpacing: '-0.02em', lineHeight: '1.2' }}>Ready to Apply for a Lease?</h2>
                            <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.15rem', marginBottom: '2.5rem', lineHeight: '1.7', maxWidth: '600px' }}>
                                Secure strategic railway lands or properties for your commercial and private needs. Download the official application form, fill it out, and submit it directly to our office or email it to <a href="mailto:lease@grda.gov.gh" style={{ color: '#34D399', fontWeight: '600', textDecoration: 'none', borderBottom: '1px solid rgba(52, 211, 153, 0.4)', paddingBottom: '2px', transition: 'all 0.2s' }} onMouseEnter={(e) => {e.target.style.color = 'white'; e.target.style.borderColor = 'white';}} onMouseLeave={(e) => {e.target.style.color = '#34D399'; e.target.style.borderColor = 'rgba(52, 211, 153, 0.4)';}}>lease@grda.gov.gh</a>.
                            </p>
                            <a href="/GRDA-LEASE-APP-FORM.pdf" download style={{ 
                                backgroundColor: '#10B981', 
                                color: 'white', 
                                display: 'inline-flex', 
                                alignItems: 'center', 
                                gap: '0.75rem', 
                                padding: '1.125rem 2.5rem', 
                                fontSize: '1.125rem', 
                                fontWeight: '700',
                                borderRadius: '50px',
                                textDecoration: 'none',
                                transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                                boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.4)',
                                border: '2px solid transparent'
                            }}
                            onMouseEnter={(e) => { 
                                e.currentTarget.style.transform = 'translateY(-4px)'; 
                                e.currentTarget.style.boxShadow = '0 15px 30px -5px rgba(16, 185, 129, 0.6)'; 
                            }}
                            onMouseLeave={(e) => { 
                                e.currentTarget.style.transform = 'translateY(0)'; 
                                e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(16, 185, 129, 0.4)'; 
                            }}
                            >
                                Download Lease Form <Download size={22} strokeWidth={2.5} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partners Section */}
            <PartnersCarousel />
        </>
    );
};

export default Home;
