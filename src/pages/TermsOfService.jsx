import { useEffect } from 'react';

function TermsOfService() {
    useEffect(() => {
        document.title = 'Terms of Service | Ghana Railway Development Authority';
    }, []);

    return (
        <>
            {/* Page Header */}
            <section className="page-header">
                <div className="container">
                    <h1>Terms of Service</h1>
                    <p>Terms and conditions governing the use of our website</p>
                </div>
            </section>

            <section style={{ padding: '4rem 0' }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '2rem' }}>
                        <strong>Effective Date:</strong> January 1, 2026 &nbsp;|&nbsp; <strong>Last Updated:</strong> February 9, 2026
                    </div>

                    <div className="legal-content" style={{ lineHeight: '1.8', color: '#374151' }}>
                        <h2 style={{ color: 'var(--color-primary-dark)', marginBottom: '1rem', fontSize: '1.5rem' }}>1. Acceptance of Terms</h2>
                        <p style={{ marginBottom: '2rem' }}>
                            By accessing and using the Ghana Railway Development Authority (GRDA) website (<strong>grda-website.vercel.app</strong>),
                            you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, you should not
                            use this website. GRDA reserves the right to modify these terms at any time, and your continued use of the website
                            constitutes acceptance of any changes.
                        </p>

                        <h2 style={{ color: 'var(--color-primary-dark)', marginBottom: '1rem', fontSize: '1.5rem' }}>2. Description of Service</h2>
                        <p style={{ marginBottom: '2rem' }}>
                            The GRDA website provides information about Ghana's railway development initiatives, projects, services,
                            news and updates, media resources, and organizational information. The website serves as a public information
                            platform for the Ghana Railway Development Authority, a statutory body established under the Ghana Railway
                            Development Authority Act, 2017 (Act 952).
                        </p>

                        <h2 style={{ color: 'var(--color-primary-dark)', marginBottom: '1rem', fontSize: '1.5rem' }}>3. Use of Website</h2>
                        <p style={{ marginBottom: '1rem' }}>You agree to use this website only for lawful purposes and in a manner that does not:</p>
                        <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}>Infringe the rights of, or restrict the use by, any other person</li>
                            <li style={{ marginBottom: '0.5rem' }}>Violate any applicable local, national, or international law or regulation</li>
                            <li style={{ marginBottom: '0.5rem' }}>Attempt to gain unauthorized access to any part of the website, server, or connected systems</li>
                            <li style={{ marginBottom: '0.5rem' }}>Transmit any harmful, threatening, abusive, or otherwise objectionable material</li>
                            <li style={{ marginBottom: '0.5rem' }}>Collect or harvest any personally identifiable information from the website</li>
                            <li style={{ marginBottom: '0.5rem' }}>Use the website in any manner that could disable, overburden, or impair the site</li>
                        </ul>

                        <h2 style={{ color: 'var(--color-primary-dark)', marginBottom: '1rem', fontSize: '1.5rem' }}>4. Intellectual Property</h2>
                        <p style={{ marginBottom: '2rem' }}>
                            All content on this website, including but not limited to text, graphics, logos, images, audio clips,
                            digital downloads, and data compilations, is the property of the Ghana Railway Development Authority or its
                            content suppliers and is protected by Ghanaian and international copyright laws. The GRDA logo and name are
                            registered trademarks. Unauthorized use, reproduction, or distribution of any content is strictly prohibited
                            without prior written consent from GRDA.
                        </p>

                        <h2 style={{ color: 'var(--color-primary-dark)', marginBottom: '1rem', fontSize: '1.5rem' }}>5. Information Accuracy</h2>
                        <p style={{ marginBottom: '2rem' }}>
                            GRDA makes every effort to ensure the accuracy and completeness of information published on this website.
                            However, we do not guarantee that the content is error-free, complete, or current. Project timelines, statistics,
                            and other data are subject to change. GRDA reserves the right to correct any errors, inaccuracies, or omissions
                            and to update information at any time without prior notice.
                        </p>

                        <h2 style={{ color: 'var(--color-primary-dark)', marginBottom: '1rem', fontSize: '1.5rem' }}>6. Contact Form Submissions</h2>
                        <p style={{ marginBottom: '2rem' }}>
                            By submitting information through our contact forms, you represent that the information provided is accurate
                            and that you have the authority to submit such information. GRDA will handle your submission in accordance
                            with our Privacy Policy. We will endeavor to respond to inquiries in a timely manner but do not guarantee
                            response times.
                        </p>

                        <h2 style={{ color: 'var(--color-primary-dark)', marginBottom: '1rem', fontSize: '1.5rem' }}>7. Third-Party Links</h2>
                        <p style={{ marginBottom: '2rem' }}>
                            This website may contain links to external websites operated by third parties. These links are provided for
                            convenience and informational purposes only. GRDA does not endorse, control, or assume responsibility for the
                            content, privacy policies, or practices of any third-party websites. Access to linked sites is at your own risk.
                        </p>

                        <h2 style={{ color: 'var(--color-primary-dark)', marginBottom: '1rem', fontSize: '1.5rem' }}>8. Limitation of Liability</h2>
                        <p style={{ marginBottom: '2rem' }}>
                            To the fullest extent permitted by law, GRDA shall not be liable for any direct, indirect, incidental,
                            consequential, or punitive damages arising from your access to or use of this website. This includes,
                            but is not limited to, damages for loss of data, revenue, or business opportunities, even if GRDA has been
                            advised of the possibility of such damages. The website and its content are provided on an "as is" and
                            "as available" basis.
                        </p>

                        <h2 style={{ color: 'var(--color-primary-dark)', marginBottom: '1rem', fontSize: '1.5rem' }}>9. Indemnification</h2>
                        <p style={{ marginBottom: '2rem' }}>
                            You agree to indemnify and hold harmless GRDA, its officers, employees, and agents from any claims, damages,
                            losses, or expenses (including reasonable legal fees) arising from your use of the website or your violation
                            of these Terms of Service.
                        </p>

                        <h2 style={{ color: 'var(--color-primary-dark)', marginBottom: '1rem', fontSize: '1.5rem' }}>10. Website Availability</h2>
                        <p style={{ marginBottom: '2rem' }}>
                            GRDA does not guarantee uninterrupted access to this website. We may suspend, restrict, or terminate access
                            to the website at any time for maintenance, updates, or other operational reasons without prior notice.
                            GRDA shall not be liable for any loss or inconvenience caused by website downtime.
                        </p>

                        <h2 style={{ color: 'var(--color-primary-dark)', marginBottom: '1rem', fontSize: '1.5rem' }}>11. Governing Law</h2>
                        <p style={{ marginBottom: '2rem' }}>
                            These Terms of Service shall be governed by and construed in accordance with the laws of the Republic of Ghana.
                            Any disputes arising out of or related to these terms shall be subject to the exclusive jurisdiction of the
                            courts of the Republic of Ghana.
                        </p>

                        <h2 style={{ color: 'var(--color-primary-dark)', marginBottom: '1rem', fontSize: '1.5rem' }}>12. Severability</h2>
                        <p style={{ marginBottom: '2rem' }}>
                            If any provision of these Terms of Service is found to be invalid or unenforceable by a court of competent
                            jurisdiction, the remaining provisions shall remain in full force and effect.
                        </p>

                        <h2 style={{ color: 'var(--color-primary-dark)', marginBottom: '1rem', fontSize: '1.5rem' }}>13. Contact Information</h2>
                        <p style={{ marginBottom: '1rem' }}>
                            For questions regarding these Terms of Service, please contact us:
                        </p>
                        <div style={{
                            background: 'rgba(0, 107, 63, 0.05)',
                            borderLeft: '4px solid var(--color-primary)',
                            padding: '1.5rem',
                            borderRadius: '0 8px 8px 0',
                            marginBottom: '2rem'
                        }}>
                            <p style={{ margin: '0 0 0.5rem', fontWeight: '600' }}>Ghana Railway Development Authority</p>
                            <p style={{ margin: '0 0 0.25rem' }}>P.O. Box MB 251, Accra, Ghana</p>
                            <p style={{ margin: '0 0 0.25rem' }}>Email: info@grda.gov.gh</p>
                            <p style={{ margin: '0' }}>Phone: +233 (0) 302 228 011</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default TermsOfService;
