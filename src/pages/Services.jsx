import TrainScheduleCard from '../components/TrainScheduleCard';
import { routeSchedules } from '../data/schedules';
import { FileText, Shield, PenTool, BookOpen, ArrowRight } from 'lucide-react';
import './Services.css';

const Services = () => {


    const servicesData = [
        {
            icon: <FileText size={32} />,
            title: "Licensing & Permits",
            description: "Issuance of licenses for railway operations, construction, and infrastructure maintenance within Ghana."
        },
        {
            icon: <Shield size={32} />,
            title: "Safety Regulations",
            description: "Enforcement of safety standards and protocols to ensure the security of passengers, cargo, and railway assets."
        },
        {
            icon: <PenTool size={32} />,
            title: "Technical Compliance",
            description: "Inspection and certification of railway rolling stock and infrastructure to meet national and international standards."
        },
        {
            icon: <BookOpen size={32} />,
            title: "Training & Development",
            description: "Capacity building programs for railway professionals to enhance skills and operational efficiency."
        }
    ];

    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1>Our Services</h1>
                    <p>Facilitating a safe, efficient, and compliant railway sector and providing world-class passenger services.</p>
                </div>
            </div>

            {/* Train Services Section */}
            <section className="section container">
                <div className="section-header">
                    <h2>Passenger Services</h2>
                    <p>Train Schedules and Routes</p>
                </div>

                <div className="schedule-cards-container">
                    {routeSchedules.map(route => (
                        <TrainScheduleCard key={route.id} route={route} />
                    ))}
                </div>
            </section>

            <section className="section container" style={{ paddingTop: '0' }}>
                <div className="section-header">
                    <h2>Regulatory & Technical Services</h2>
                    <p>Ensuring compliance and safety across the network.</p>
                </div>
                <div className="services-grid">
                    {servicesData.map((service, index) => (
                        <div key={index} className="service-card">
                            <div className="service-icon">{service.icon}</div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            <a href="#" className="service-link">Learn More <ArrowRight size={16} /></a>
                        </div>
                    ))}
                </div>
            </section>

            {/* Resources Section */}
            <section className="section" style={{ backgroundColor: '#F9FAFB' }}>
                <div className="container">
                    <div className="section-header">
                        <h2>Resources & Downloads</h2>
                    </div>
                    <div className="resources-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        <div className="resource-card" style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <BookOpen size={24} color="var(--color-primary)" />
                            <div>
                                <h4 style={{ marginBottom: '0.25rem' }}>Railway Master Plan</h4>
                                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-light)' }}>PDF - 2.5MB</span>
                            </div>
                            <a href="#" style={{ marginLeft: 'auto', color: 'var(--color-secondary)' }}>Download</a>
                        </div>
                        <div className="resource-card" style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Shield size={24} color="var(--color-primary)" />
                            <div>
                                <h4 style={{ marginBottom: '0.25rem' }}>Safety Guidelines</h4>
                                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-light)' }}>PDF - 1.2MB</span>
                            </div>
                            <a href="#" style={{ marginLeft: 'auto', color: 'var(--color-secondary)' }}>Download</a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '16px' }}>Need assistance with a specific service?</h2>
                    <p style={{ marginBottom: '32px', color: '#4B5563' }}>Our dedicated team is ready to help you navigate our regulatory content.</p>
                    <a href="/contact" className="btn btn-primary">Contact Support</a>
                </div>
            </section>
        </>
    );
};

export default Services;
