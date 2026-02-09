import React, { useEffect, useState, useRef } from 'react';
import { Users, TrendingUp, Train, Map } from 'lucide-react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import './StatisticsSection.css';

const StatItem = ({ icon: Icon, value, label, suffix = '+' }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.5 }
        );

        if (elementRef.current) observer.observe(elementRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let start = 0;
        const end = parseInt(value.replace(/,/g, ''));
        const duration = 2000;
        const incrementTime = 20;
        const step = Math.ceil(end / (duration / incrementTime));

        const timer = setInterval(() => {
            start += step;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, incrementTime);

        return () => clearInterval(timer);
    }, [isVisible, value]);

    return (
        <div ref={elementRef} className="stat-card animate-on-scroll fade-up">
            <div className="stat-icon">
                <Icon size={24} />
            </div>
            <div className="stat-content">
                <div className="stat-value">
                    {count.toLocaleString()}{suffix}
                </div>
                <div className="stat-label">{label}</div>
            </div>
        </div>
    );
};

const StatisticsSection = () => {
    useScrollAnimation();

    return (
        <section className="stats-section">
            <div className="stats-bg-pattern"></div>
            <div className="container">
                <div className="stats-grid">
                    <StatItem icon={Train} value="970" label="Kilometers Track" suffix=" km" />
                    <StatItem icon={Users} value="1500" label="Daily Passengers" />
                    <StatItem icon={Map} value="12" label="Major Stations" suffix="" />
                    <StatItem icon={TrendingUp} value="20" label="Completion" suffix="%" />
                </div>
            </div>
        </section>
    );
};

export default StatisticsSection;
