import React from 'react';
import { Clock, Calendar, MoveRight, Banknote } from 'lucide-react';
import './FlipCard.css';

const FlipCard = ({ schedule }) => {
    return (
        <div className="flip-card">
            <div className="flip-card-inner">
                {/* Front Side */}
                <div className="flip-card-front">
                    <div className="card-header">
                        <div className="icon-wrapper">
                            <Clock size={28} color="white" />
                        </div>
                        <h3>{schedule.serviceName}</h3>
                    </div>

                    <div className="card-body">
                        <div className="route-display">
                            <span className="station">{schedule.origin}</span>
                            <MoveRight className="arrow-icon" size={20} />
                            <span className="station">{schedule.destination}</span>
                        </div>

                        <div className="time-display">
                            <span className="label">Departure</span>
                            <span className="time">{schedule.departureTime}</span>
                        </div>

                        <div className="days-display">
                            <Calendar size={16} />
                            <span>{schedule.days}</span>
                        </div>

                        <div className="hover-hint">Hover to see fares</div>
                    </div>
                </div>

                {/* Back Side */}
                <div className="flip-card-back">
                    <div className="card-header-back">
                        <Banknote size={24} />
                        <h3>Fares & Pricing</h3>
                    </div>

                    <div className="fares-list">
                        <div className="fare-item">
                            <span className="class-name">First Class</span>
                            <span className="price">{schedule.fares.firstClass}</span>
                        </div>
                        <div className="fare-item">
                            <span className="class-name">Standard</span>
                            <span className="price">{schedule.fares.standard}</span>
                        </div>
                    </div>

                    <button className="book-btn">Book Ticket (Soon)</button>
                </div>
            </div>
        </div>
    );
};

export default FlipCard;
