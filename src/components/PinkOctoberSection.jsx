import React from 'react';
import { HeartHandshake, Stethoscope, Search } from 'lucide-react';
import PinkRibbon from './PinkRibbon';
import './PinkOctober.css';

const pillars = [
    {
        icon: Search,
        title: 'Know your body',
        text: 'Get familiar with how your breasts normally look and feel, and report any change early.',
    },
    {
        icon: Stethoscope,
        title: 'Get screened',
        text: 'Talk to a health professional about regular breast examinations and screening.',
    },
    {
        icon: HeartHandshake,
        title: 'Support survivors',
        text: 'Stand with colleagues, families and communities affected by breast cancer.',
    },
];

const PinkOctoberSection = () => (
    <section className="pink-october-section">
        <div className="container pink-october-inner">
            <div className="pink-october-intro animate-on-scroll fade-up">
                <div className="pink-october-ribbon-wrap">
                    <PinkRibbon size={120} />
                </div>
                <div>
                    <span className="pink-october-eyebrow">Pink October · Breast Cancer Awareness</span>
                    <h2>On track for early detection</h2>
                    <p>
                        This October, the Ghana Railway Development Authority proudly stands with
                        everyone fighting breast cancer. Early detection saves lives &mdash; let&apos;s
                        keep the conversation moving.
                    </p>
                </div>
            </div>

            <div className="pink-october-pillars">
                {pillars.map(({ icon: Icon, title, text }, index) => (
                    <div
                        key={title}
                        className="pink-october-pillar animate-on-scroll fade-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div className="pink-october-pillar-icon">
                            <Icon size={22} />
                        </div>
                        <h3>{title}</h3>
                        <p>{text}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default PinkOctoberSection;
