import { useEffect } from 'react';

function PrivacyPolicy() {
    useEffect(() => {
        document.title = 'Privacy Policy | Ghana Railway Development Authority';
    }, []);

    return (
        <>
            {/* Page Header */}
            <section className="page-header">
                <div className="container">
                    <h1>Privacy Policy</h1>
                    <p>How we collect, use, and protect your information</p>
                </div>
            </section>

            <section style={{ padding: '4rem 0' }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '2rem' }}>
                        <strong>Effective Date:</strong> January 1, 2026 &nbsp;|&nbsp; <strong>Last Updated:</strong> February 9, 2026
                    </div>

                    <div className="legal-content" style={{ lineHeight: '1.8', color: '#374151' }}>
                        <h2 style={{ color: 'var(--color-primary-dark)', marginBottom: '1rem', fontSize: '1.5rem' }}>1. Introduction</h2>
                        <p style={{ marginBottom: '1.5rem' }}>
                            The Ghana Railway Development Authority (GRDA) is committed to protecting the privacy and security of your personal information.
                            This Privacy Policy describes how we collect, use, disclose, and safeguard information when you visit our website
                            (<strong>grda-website.vercel.app</strong>) or interact with our services.
                        </p>
                        <p style={{ marginBottom: '2rem' }}>
                            By accessing or using our website, you consent to the practices described in this Privacy Policy. If you do not agree with our policies,
                            please do not access the site.
                        </p>

                        <h2 style={{ color: 'var(--color-primary-dark)', marginBottom: '1rem', fontSize: '1.5rem' }}>2. Information We Collect</h2>
                        <h3 style={{ color: 'var(--color-primary)', marginBottom: '0.5rem', fontSize: '1.15rem' }}>2.1 Personal Information</h3>
                        <p style={{ marginBottom: '1rem' }}>We may collect personal information that you voluntarily provide, including:</p>
                        <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}>Full name</li>
                            <li style={{ marginBottom: '0.5rem' }}>Email address</li>
                            <li style={{ marginBottom: '0.5rem' }}>Phone number</li>
                            <li style={{ marginBottom: '0.5rem' }}>Organization or company name</li>
                            <li style={{ marginBottom: '0.5rem' }}>Message content submitted through our Contact form</li>
                        </ul>

                        <h3 style={{ color: 'var(--color-primary)', marginBottom: '0.5rem', fontSize: '1.15rem' }}>2.2 Automatically Collected Information</h3>
                        <p style={{ marginBottom: '1rem' }}>When you visit our website, we may automatically collect:</p>
                        <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}>Browser type and version</li>
                            <li style={{ marginBottom: '0.5rem' }}>Operating system</li>
                            <li style={{ marginBottom: '0.5rem' }}>IP address</li>
                            <li style={{ marginBottom: '0.5rem' }}>Pages visited and time spent on each page</li>
                            <li style={{ marginBottom: '0.5rem' }}>Referring website or source</li>
                        </ul>

                        <h2 style={{ color: 'var(--color-primary-dark)', marginBottom: '1rem', fontSize: '1.5rem' }}>3. How We Use Your Information</h2>
                        <p style={{ marginBottom: '1rem' }}>We use the information we collect to:</p>
                        <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}>Respond to your inquiries and provide customer support</li>
                            <li style={{ marginBottom: '0.5rem' }}>Improve and optimize our website and services</li>
                            <li style={{ marginBottom: '0.5rem' }}>Send administrative information, including updates about our projects and services</li>
                            <li style={{ marginBottom: '0.5rem' }}>Comply with legal obligations and enforce our terms</li>
                            <li style={{ marginBottom: '0.5rem' }}>Monitor and analyze usage and trends to improve user experience</li>
                        </ul>

                        <h2 style={{ color: 'var(--color-primary-dark)', marginBottom: '1rem', fontSize: '1.5rem' }}>4. Information Sharing and Disclosure</h2>
                        <p style={{ marginBottom: '1rem' }}>We do not sell, trade, or rent your personal information to third parties. We may share information with:</p>
                        <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Government agencies:</strong> When required by law, regulation, or legal process</li>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Service providers:</strong> Third-party vendors who assist us in operating our website and conducting our activities, bound by confidentiality agreements</li>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Law enforcement:</strong> When necessary to protect public safety or comply with legal obligations</li>
                        </ul>

                        <h2 style={{ color: 'var(--color-primary-dark)', marginBottom: '1rem', fontSize: '1.5rem' }}>5. Data Security</h2>
                        <p style={{ marginBottom: '2rem' }}>
                            We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access,
                            alteration, disclosure, or destruction. These measures include encryption, secure server infrastructure, and access controls.
                            However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                        </p>

                        <h2 style={{ color: 'var(--color-primary-dark)', marginBottom: '1rem', fontSize: '1.5rem' }}>6. Cookies and Tracking Technologies</h2>
                        <p style={{ marginBottom: '2rem' }}>
                            Our website may use cookies and similar tracking technologies to enhance your browsing experience. Cookies are small data files
                            stored on your device. You may set your browser to refuse cookies, but some features of the site may not function properly without them.
                        </p>

                        <h2 style={{ color: 'var(--color-primary-dark)', marginBottom: '1rem', fontSize: '1.5rem' }}>7. Third-Party Links</h2>
                        <p style={{ marginBottom: '2rem' }}>
                            Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites.
                            We encourage you to review the privacy policies of any third-party site you visit.
                        </p>

                        <h2 style={{ color: 'var(--color-primary-dark)', marginBottom: '1rem', fontSize: '1.5rem' }}>8. Your Rights</h2>
                        <p style={{ marginBottom: '1rem' }}>Under the Data Protection Act, 2012 (Act 843) of Ghana, you have the right to:</p>
                        <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}>Access the personal data we hold about you</li>
                            <li style={{ marginBottom: '0.5rem' }}>Request correction of inaccurate or incomplete data</li>
                            <li style={{ marginBottom: '0.5rem' }}>Request deletion of your personal data, subject to legal requirements</li>
                            <li style={{ marginBottom: '0.5rem' }}>Object to processing of your personal data in certain circumstances</li>
                        </ul>

                        <h2 style={{ color: 'var(--color-primary-dark)', marginBottom: '1rem', fontSize: '1.5rem' }}>9. Children's Privacy</h2>
                        <p style={{ marginBottom: '2rem' }}>
                            Our website is not intended for children under 13. We do not knowingly collect personal information from children.
                            If we become aware that we have inadvertently collected data from a child, we will take steps to delete it promptly.
                        </p>

                        <h2 style={{ color: 'var(--color-primary-dark)', marginBottom: '1rem', fontSize: '1.5rem' }}>10. Changes to This Policy</h2>
                        <p style={{ marginBottom: '2rem' }}>
                            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.
                            We encourage you to review this policy periodically.
                        </p>

                        <h2 style={{ color: 'var(--color-primary-dark)', marginBottom: '1rem', fontSize: '1.5rem' }}>11. Contact Us</h2>
                        <p style={{ marginBottom: '1rem' }}>
                            If you have questions or concerns about this Privacy Policy, please contact us:
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

export default PrivacyPolicy;
