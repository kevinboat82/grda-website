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
        image: "/images/ceo.jpeg",
        bio: "Dr. Frederick Appoh is the Chief Executive Officer of the Ghana Railway Development Authority. With a background in engineering and project management, he leads the Authority's mission to revitalize Ghana's railway network."
    },
    {
        id: 3,
        name: "Ing. George Debrah",
        role: "Member",
        image: "/images/George Debrah.png",
        bio: `Ing. George Debrah is a Civil Engineer with over 20 years of professional experience in the roads and highways sector. Since 2024, he has served as Director of the Research, Statistics and Information Management (RSIM) Directorate at the Ministry of Roads and Highways, where he leads strategic work in data collection, analysis and dissemination to support policy formulation, infrastructure planning and evidence-based decision-making.

Before assuming his current role, Ing. Debrah was the Coordinator of the Ghana Road Fund Secretariat. In that capacity, he acted as the principal liaison between the Secretariat and the Ministry’s leadership, overseeing the day-to-day administration of the Fund and supervising staff to ensure efficient, transparent and accountable management of road-sector financing.

He joined the then Ministry of Transportation in 2004 as an Assistant Engineer and progressed steadily through the professional ranks, culminating in his appointment as Chief Engineer in 2022. Throughout his career, he has developed strong expertise in engineering management, public infrastructure systems and financing, institutional development, performance monitoring and sector reforms.

Ing. Debrah is widely regarded for his strong analytical and computational abilities, keen attention to detail and proven capacity to lead multidisciplinary teams.

He holds a Bachelor’s degree in Civil Engineering from the Kwame Nkrumah University of Science and Technology (KNUST), and two Master’s degrees from the University of Florida, USA, in Civil Engineering and Management. He is a Senior Professional Member of the Ghana Institution of Engineering (GhIE).`
    },
    {
        id: 4,
        name: "Mr. Tanko Mohammed",
        role: "Member",
        image: "/images/Tank Mohammed.jpg",
        bio: `Tanko Mohammed is a senior technology, infrastructure, and digital transformation professional with over 30 years of experience supporting large-scale public and private sector programs across Africa, the Middle East, Europe, and North America. He currently serves as a Board Member of the Ghana Railways Development Authority (GRDA), where he provides strategic oversight and advisory support in the areas of digital modernization, governance, program delivery, and institutional strengthening.

Mr. Mohammed is a Senior Digital Consultant and Advisor to the World Bank, where he has worked on complex development programs involving digital infrastructure, systems modernization, and public-sector reform. His professional background includes leadership and advisory roles with global organizations such as Ernst & Young (EY), DHL, and other multinational institutions, supporting initiatives at the intersection of technology, operations, and policy.

He holds a Bachelor of Arts in Mathematics, a Master of Science in Computer Engineering, and an MBA from the MIT Sloan School of Management. His expertise spans program and project management, IT strategy, enterprise systems, digital governance, and organizational transformation, with particular relevance to infrastructure-intensive sectors including transport, energy, utilities, and logistics.

Mr. Mohammed has led and overseen several high-impact national programs. Notably, from 2015 to 2022, he served in a senior leadership role on a USD 50 million Millennium Challenge Corporation (MCC)-funded IT modernization program at the Millennium Development Authority (MiDA), supporting the transformation of Ghana’s electricity sector through enterprise resource planning (ERP), geographic information systems (GIS), outage management, and related digital platforms.

In addition to his role at GRDA, Mr. Mohammed serves as a Director at Academic City University, contributing to academic governance, industry partnerships, and innovation-led education. He also sits on the boards of Vanguard Life Assurance, Buck Press, and Spectrum Internet.

Mr. Mohammed brings to the GRDA Board a strong combination of global exposure, technical depth, governance experience, and strategic insight, supporting the Authority’s mandate to develop, modernize, and sustainably manage Ghana’s railway infrastructure.`
    },
    {
        id: 5,
        name: "Mr. Kwame Kwakye",
        role: "Member",
        image: "/images/Kwame Kwakye.jpeg",
        bio: `Kwame Kwakye is an accomplished mining industry professional, bringing over twenty years of rich experience to the field. Since beginning his career in 1998, Kwame has demonstrated expertise across a spectrum of roles including Finance, Controlling, Service Administration, Project Management, Procurement, and Logistics. His career is marked by a solid reputation for operational excellence, strategic vision, and effective leadership in demanding and high-performance settings.

Kwame’s professional journey showcases his comprehensive understanding of end-to-end mining supply chain operations. He adeptly combines his technical knowledge of supply chains with a strong foundation in financial discipline and strategic management. This blend of cross-functional expertise enables him to enhance efficiency, improve governance standards, and bolster organisational performance within complex mining environments.

Kwame holds a Master of Science in Operations and Supply Chain Management from the University of Liverpool, reflecting his commitment to academic and professional development. He is also an active member of the Institute of Directors (IoD) Ghana. His areas of expertise include Supply Chain Optimisation, Strategic Planning, and Business Improvement.

In addition to his professional roles, Kwame serves on the Executive Council of the Ghana Chamber of Mines and holds the position of Chairman of the Affiliate Committee within the same organisation.`
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
        image: "/images/George Lomotey.jpg",
        bio: `Mr. George Lomotey is an accomplished procurement and contract management professional with over 20 years of senior-level experience in Ghana and internationally. He has a strong record of delivering value for money through effective sourcing strategies, regulatory compliance, and robust contract management. Among his many professional achievements, in 2014, he supported the successful procurement and award of a £600 million construction framework in line with UK Regulations, with no legal challenges from unsuccessful bidders. The framework achieved verified annual savings of between 4% and 9% across all construction spend categories.

He currently serves as Director of Procurement for the Civil Service, providing technical and policy leadership across all phases of the procurement and contract lifecycle. His role includes oversight of procurement activities across all ministries, including the Ministry of Transport, as well as leading initiatives in talent development, succession planning, and career progression.

Renowned for his technical, administrative, and leadership capabilities, he specialises in capacity building, strategic procurement programmes, and contract performance monitoring. He provides commercial leadership and practical expertise while maintaining strong professional relationships with internal and external stakeholders.`
    },
    {
        id: 9,
        name: "Dr. James Kofi Kutsoati",
        role: "Member",
        image: "/images/James Kutsoati.jpg",
        bio: `Dr. James Kofi Kutsoati is a highly accomplished expert in cocoa marketing, procurement, supply chain management and logistics, with extensive leadership experience in Ghana’s cocoa sector. As Deputy Chief Executive Officer (Operations) of the Ghana Cocoa Board, he plays a pivotal role in overseeing national cocoa operations and strategic initiatives to strengthen the cocoa value chain. His career trajectory reflects exceptional leadership having risen from the position of Research Officer to his current senior role. In addition to his professional achievements, Dr. Kutsoati is a cocoa farmer, further enriching his practical understanding of the industry.

Alongside his responsibilities at the Ghana Cocoa Board, Dr. Kutsoati oversees the operations of Cocoa Marketing Company in both Ghana and the UK. He collaborates closely with key stakeholders across the cocoa industry, including farmers, government bodies, international buyers and the industry organizations. He previously served as a member of the Consultative Board of the International Cocoa Organization (ICCO) and is currently the Chairman of its working group on Supply Management and Prices.

Dr. Kutsoati holds a PhD in Logistics and Supply Chain Management, an MBA, a Postgraduate Diploma in Rural Policy and Project Planning, and a Bachelors degree in Geography and Economics. He is a member of the Chartered Institute of Logistics and Transport (UK). This unique blend of academic distinction and hands-on experience enables him to deliver impactful and sustainable solutions in global logistics and supply chain management.`
    },
    {
        id: 10,
        name: "Dr. Mrs. Audrey Smock Amoah",
        role: "Member",
        image: "/images/Audrey .jpeg",
        bio: `Dr Mrs Audrey Smock Amoah, (FGIP) is a highly accomplished practitioner-scholar in development planning, local economic development, local governance and decentralisation and gender and development with over 25 years of experience in the field.

Audrey has a Bachelor of Science Degree in Planning and a Master of Science Degree in Development Policy and Planning from the Kwame Nkrumah University of Science and Technology (KNUST). She holds a certificate in Gender and Development from the Ghana Institute of Management and Public Administration (GIMPA), a Certificate in Human Rights-Based Approach to Planning and Programming from Danida Fellowship Centre in Copenhagen, Denmark and Women in Management from GIMPA & Danida Fellowship Centre. She also has certificates in Investment Appraisal and Risk Analysis from the University of Ghana Business School. Dr Audrey Smock Amoah obtained her Doctor of Philosophy Degree in Planning from KNUST, Kumasi in March 2021. She is a fellow of the Ghana Institute of Planning, and she strives for excellence and professionalism.

Dr Amoah is a Chief Development Planning Officer with vast experience having worked in the districts, region and the national level of the Local Government Service. She started her career in the then Mpohor Wassa East District Assembly from November 2000 as a National Service Person and a staff of the Assembly from 2001 till 2012 when she was posted to the Tarkwa-Nsuaem Municipal Assembly also in the Western Region. She was posted to the La Dade-kotopon Municipal Assembly in Greater Accra in 2017. In May 2021, she was appointed as the Regional Development Planning Officer for the Eastern Regional Co-ordinating Council, Koforidua. She later became the Director of Management and Technical Services Directorate at the Office of the Head of the Local Government Service in Accra, a position she held from July 2023 until her appointment as Director General of the National Development Planning Commission in February, 2025. Her current role includes providing strategic technical direction and administrative leadership for planning, implementation coordination, monitoring and evaluation and reporting for the attainment of defined objectives, aligned with international commitments, across all sectors and at both national and sub-national levels.`
    },

    {
        id: 70,
        name: "Mr. Nicholas Gyabaah",
        role: "Member",
        image: "/images/Nicholas Gyabaah.jpeg",
        bio: `Nicholas Gyabaah serves as Chief Economic Officer and Head of Mining and Industry Unit of the Real Sector Division at the Ministry of Finance. His extensive career includes previous roles, such as Head of the Bank and Non-Bank Financial Institutions Unit within the Financial Sector Division at the Ministry of Finance and Head of the External Resource Mobilisation Unit at the Ministry of Health. He played a pivotal role in the launch of Financial Literacy Week in 2008, an initiative that garnered international recognition at the UN Headquarters, New York, USA, during the Third Annual Child and Youth International Meeting.

Mr. Gyabaah has represented both the Ministry of Finance and the Ministry of Health in various committees and technical working groups, contributing to significant national strategies and policies. He was instrumental in the development of modules to enhance financial literacy in Senior High School syllabuses, contributed to drafting the National Financial Inclusion Strategy, and played key role in producing a roadmap for transitioning Ghana’s economy from cash-based to electronic payment systems. Additionally, he supported the Presidential Task Force in the development of a roadmap for the establishment of the Ghana Export-Import Bank and contributed to the Mutual Evaluation Questionnaire for Ghana’s Anti-Money Laundering and Counter Financing of Terrorism (AML/CFT) regime. Furthermore, he was instrumental in launching Ghana’s National AML/CFT Strategy and Action Plan, and he has been involved in discussions leading to the passage of financial sector regulatory policies into law. Again, he has coordinated the Ministry of Health's oversight of Global Fund grants and played leading role in the development of a transitional roadmap for self-financed immunisation services.

Mr. Gyabaah holds a Master of Laws in Dispute Resolution Law and Practice from the Ghana Institute of Management & Public Administration School of Law, Accra, a Master of Arts in International and Development Economics from the University of Applied Sciences in Berlin, Germany, a Bachelor of Laws from the Ghana Institute of Management & Public Administration, Accra and a Bachelor of Education in Social Sciences from the University of Cape Coast. His professional development includes executive programmes at prestigious institutions, such as Harvard Kennedy School (Massachusetts, USA), Management Development International (Illinois State University, USA), Ghana Stock Exchange Training School (Accra), and the World Bank & International Financial Corporation, South Africa.

He has served on the governing boards of the Mental Health Authority, National Population Council, and Ghana Psychology Council, where he has actively influenced strategic directions of these institutions. He is also a member of the Institute of Chartered Economists in Ghana, emphasizing his commitment to economic development and policy formulation in the country.

Mr Gyabaah is a member of Entity Tender Committee of the GoldBod, a member of the Joint Committee on the Aluminum Downstream & Scrap Metals Regulatory Framework, a member of the Ministerial Advisory Board of the Ministry of Trade, Agribusiness & Industry and a member of the Board of the Ghana Railway Development Authority.`
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
                                    {selectedMember.bio.split('\n\n').map((paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                    ))}
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
