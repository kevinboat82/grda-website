import React from 'react';
import { Train, Banknote } from 'lucide-react';
import './TrainScheduleCard.css';

const TrainScheduleCard = ({ route }) => {
    // Get stops for header display
    const firstSchedule = route.schedules[0];
    const stops = firstSchedule.stops;
    const originStation = stops[0];
    const destinationStation = stops[stops.length - 1];
    const intermediateStops = stops.slice(1, -1);

    return (
        <div className="schedule-flip-card">
            <div className="schedule-flip-inner">
                {/* Front Side - Timetable */}
                <div className="schedule-flip-front">
                    {/* Background Image Overlay */}
                    <div className="timetable-bg-overlay"></div>

                    {/* Header */}
                    <div className="timetable-card-header">
                        <span className="timetable-title">TRAIN TIMETABLE</span>
                        <div className="train-icon-circle">
                            <Train size={20} />
                        </div>
                    </div>

                    {/* Timetable Grid */}
                    <div className="timetable-grid">
                        {/* Station Headers Row */}
                        <div className="timetable-header-row">
                            <div className="timetable-cell header origin">
                                <span className="station-name">{originStation.station.toUpperCase()}</span>
                                <span className="station-label">DEPARTURE TIME</span>
                            </div>
                            {intermediateStops.map((stop, idx) => (
                                <div key={idx} className="timetable-cell header intermediate">
                                    <span className="station-name">{stop.station.toUpperCase()}</span>
                                </div>
                            ))}
                            <div className="timetable-cell header destination">
                                <span className="station-name">{destinationStation.station.toUpperCase()}</span>
                                <span className="station-label">ARRIVAL TIME</span>
                            </div>
                        </div>

                        {/* Schedule Data Rows */}
                        {route.schedules.map((timeSlot, index) => (
                            <div key={index} className="timetable-data-row">
                                <div className="timetable-cell data departure">
                                    <span className="time-value">{timeSlot.stops[0].departure}</span>
                                </div>
                                {intermediateStops.map((_, idx) => (
                                    <div key={idx} className="timetable-cell data stop">
                                        <span className="stop-badge">STOP</span>
                                    </div>
                                ))}
                                <div className="timetable-cell data arrival">
                                    <span className="time-value">{timeSlot.stops[timeSlot.stops.length - 1].arrival}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="timetable-card-footer">
                        <span className="route-name">{route.origin.toUpperCase()} - {route.destination.toUpperCase()}</span>
                        <span className="flip-hint">Hover for fares →</span>
                    </div>
                </div>

                {/* Back Side - Fares */}
                <div className="schedule-flip-back">
                    <div className="fare-header">
                        <Banknote size={28} />
                        <h3>Ticket Fares</h3>
                    </div>

                    <div className="fare-route-title">
                        {route.origin} ↔ {route.destination}
                    </div>

                    <div className="fare-list">
                        <div className="fare-item">
                            <div className="fare-zone">
                                <span className="zone-label">Zone 1</span>
                                <span className="zone-route">Tema Harbour - Afienya</span>
                            </div>
                            <span className="fare-price">{route.fares.temaToAfienya}</span>
                        </div>

                        <div className="fare-item">
                            <div className="fare-zone">
                                <span className="zone-label">Zone 2</span>
                                <span className="zone-route">Afienya - Adomi</span>
                            </div>
                            <span className="fare-price">{route.fares.afienyaToAdomi}</span>
                        </div>

                        <div className="fare-item featured">
                            <div className="fare-zone">
                                <span className="zone-label">Full Journey</span>
                                <span className="zone-route">Tema Harbour - Adomi</span>
                            </div>
                            <span className="fare-price">{route.fares.temaToAdomi}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainScheduleCard;
