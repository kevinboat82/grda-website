import React, { useState, useEffect } from 'react';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroSlider, { defaultStories } from '../components/HeroSlider';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import TrainScheduleCard from '../components/TrainScheduleCard';
import StatisticsSection from '../components/StatisticsSection';
import PartnersCarousel from '../components/PartnersCarousel';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { routeSchedules } from '../data/schedules';
import { archiveStories } from '../data/archiveStories';
import './Home.css';

// Get the 3 most recent archive stories sorted by date
const getRecentStories = () => {
    return [...archiveStories]
        .sort((a, b) => {
            const dateA = new Date(a.date + '-01');
            const dateB = new Date(b.date + '-01');
            return dateB - dateA;
        })
        .slice(0, 3);
};

// Format date for display
const formatDate = (dateStr) => {
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

const Home = () => {
    const [stories, setStories] = useState(defaultStories);
    const [projects, setProjects] = useState([]);
    useScrollAnimation();

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "stories"));
                const storiesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                if (storiesData.length > 0) {
                    setStories([...defaultStories, ...storiesData]);
                }
            } catch (error) {
                console.log("Error fetching stories (using defaults):", error);
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
                        <h2 style={{ color: 'var(--color-primary-dark)', marginBottom: '1rem' }}>Tema - Mpakadan Train Service</h2>
                        <p style={{ color: '#4b5563', maxWidth: '600px', margin: '0 auto' }}>Experience safe and reliable transport on our newly commissioned standard gauge line. Check the latest passenger schedules below.</p>
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
                        {getRecentStories().map((story, index) => (
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
                                        <span>{formatDate(story.date)}</span>
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
                                    <div className="project-image" style={{ backgroundImage: `url('${project.image || project.images?.[0] || 'https://images.unsplash.com/photo-1474487548417-781cb71495f3'}')` }}></div>
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

            {/* Partners Section */}
            <PartnersCarousel />
        </>
    );
};

export default Home;
