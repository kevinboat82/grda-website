import React, { useState } from 'react';
import { X, ChevronRight } from 'lucide-react';
import './BoardMembers.css';

const boardMembers = [
    {
        id: 1,
        name: "Mr. R.A.Y. Anamoo",
        role: "Board Chairperson",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=RAYAnamoo&backgroundColor=b6e3f4",
        bio: "Mr. R.A.Y. Anamoo is a seasoned executive with extensive experience in the maritime and transport sectors. He brings a wealth of knowledge in strategic planning and infrastructure development to the GRDA Board."
    },
    {
        id: 2,
        name: "Dr. Frederick Appoh",
        role: "Chief Executive Officer",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=FrederickAppoh&backgroundColor=c0aede",
        bio: "Dr. Frederick Appoh is the Chief Executive Officer of the Ghana Railway Development Authority. With a background in engineering and project management, he leads the Authority's mission to revitalize Ghana's railway network."
    },
    {
        id: 3,
        name: "Mr. George Debrah",
        role: "Member",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=NafisatuIddrisu&backgroundColor=ffd5dc",
        bio: "Mr. George Debrah is a respected member of the board, contributing his expertise in legal and regulatory affairs to ensure the Authority operates within the highest standards of governance."
    },
    {
        id: 4,
        name: "Mr. Tanko Mohammed",
        role: "Member",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=TankoMohammed&backgroundColor=d1f4d1",
        bio: "Mr. Tanko Mohammed brings valuable insights from the private sector, focusing on public-private partnerships and investment strategies for railway development."
    },
    {
        id: 5,
        name: "Mr. Kwame Kwakye",
        role: "Member",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=KwameKwakye&backgroundColor=ffdfba",
        bio: "Mr. Kwame Kwakye is a dedicated board member with a strong background in finance and budgeting, ensuring the fiscal responsibility of the Authority's projects."
    },
    {
        id: 6,
        name: "Ing. Komla W. Ofori",
        role: "Member",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=KomlaOfori&backgroundColor=bae1ff",
        bio: "Ing. Komla W. Ofori is a distinguished engineer with decades of experience in civil and railway engineering. His technical expertise is crucial for the oversight of infrastructure projects."
    },
    {
        id: 7,
        name: "Ms. Nafisatu Iddrisu",
        role: "Member",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=GeorgeDebrah&backgroundColor=e2f0cb",
        bio: "Ms. Nafisatu Iddrisu brings a focus on social impact and community engagement, ensuring that railway developments benefit the communities they serve."
    },
    {
        id: 8,
        name: "Mr. George Lomotey",
        role: "Member",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=GeorgeLomotey&backgroundColor=ffefd5",
        bio: "Mr. George Lomotey is an experienced administrator who plays a key role in the organizational development and human resource strategies of the Authority."
    },
    {
        id: 9,
        name: "Dr. James Kutsuati",
        role: "Member",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=JamesKutsuati&backgroundColor=ffefd5",
        bio: "Dr. James Kutsuati adds academic and research depth to the board, championing innovation and modern technologies in railway systems."
    },
    {
        id: 10,
        name: "Mrs. Audrey Smock Amoah",
        role: "Member",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=AudreySmockAmoah&backgroundColor=ffefd5",
        bio: "Mrs. Audrey Smock Amoah advocates for sustainable development and environmental compliance in all railway projects undertaken by the Authority."
    },

];

const BoardMembers = () => {
    const [selectedMember, setSelectedMember] = useState(null);

    const openProfile = (member) => setSelectedMember(member);
    const closeProfile = () => setSelectedMember(null);
    return (
        <div className="page-wrapper">
            <div className="page-header">
                <div className="container">
                    <h1>Board of Directors</h1>
                    <p>Guiding the strategic direction of the Ghana Railway Development Authority.</p>
                </div>
            </div>

            <section className="section container">
                <div className="grid-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    {boardMembers.map(member => (
                        <div key={member.id} className="team-card" style={{ background: 'white', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
                            <div style={{ height: '300px', overflow: 'hidden' }}>
                                <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} />
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>{member.name}</h3>
                                <p style={{ color: '#666', fontWeight: '500', marginBottom: '1rem' }}>{member.role}</p>
                                <button className="view-profile-btn" onClick={() => openProfile(member)}>
                                    View Profile <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Profile Modal */}
            {selectedMember && (
                <div className="profile-modal-overlay" onClick={closeProfile}>
                    <div className="profile-modal-content" onClick={e => e.stopPropagation()}>
                        <button className="profile-modal-close" onClick={closeProfile}>
                            <X size={24} />
                        </button>
                        <div className="profile-modal-grid">
                            <div className="profile-modal-image">
                                <img src={selectedMember.image} alt={selectedMember.name} />
                            </div>
                            <div className="profile-modal-info">
                                <h2 className="profile-name">{selectedMember.name}</h2>
                                <p className="profile-role">{selectedMember.role}</p>
                                <div className="profile-bio">
                                    <p>{selectedMember.bio}</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BoardMembers;
