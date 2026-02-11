import React from 'react';

const boardMembers = [
    {
        id: 1,
        name: "Mr. R.A.Y. Anamoo",
        role: "Board Chairperson",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=RAYAnamoo&backgroundColor=b6e3f4"
    },
    {
        id: 2,
        name: "Dr. Frederick Appoh",
        role: "Chief Executive Officer",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=FrederickAppoh&backgroundColor=c0aede"
    },
    {
        id: 3,
        name: "Mr. George Debrah",
        role: "Member",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=NafisatuIddrisu&backgroundColor=ffd5dc"
    },
    {
        id: 4,
        name: "Mr. Tanko Mohammed",
        role: "Member",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=TankoMohammed&backgroundColor=d1f4d1"
    },
    {
        id: 5,
        name: "Mr. Kwame Kwakye",
        role: "Member",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=KwameKwakye&backgroundColor=ffdfba"
    },
    {
        id: 6,
        name: "Ing. Komla W. Ofori",
        role: "Member",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=KomlaOfori&backgroundColor=bae1ff"
    },
    {
        id: 7,
        name: "Ms. Nafisatu Iddrisu",
        role: "Member",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=GeorgeDebrah&backgroundColor=e2f0cb"
    },
    {
        id: 8,
        name: "Mr. George Lomotey",
        role: "Member",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=GeorgeLomotey&backgroundColor=ffefd5"
    },
    {
        id: 9,
        name: "Dr. James Kutsuati",
        role: "Member",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=JamesKutsuati&backgroundColor=ffefd5"
    },
    {
        id: 10,
        name: "Mrs. Audrey Smock Amoah",
        role: "Member",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=GeorgeLomotey&backgroundColor=ffefd5"
    },

];

const BoardMembers = () => {
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
                                <p style={{ color: '#666', fontWeight: '500' }}>{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default BoardMembers;
