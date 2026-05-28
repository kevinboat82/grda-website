import React from 'react';
import { Train, Banknote, CreditCard } from 'lucide-react';
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
                            <Train size={18} />
                        </div>
                    </div>

                    {route.roundTrip ? (
                        /* =================== */
                        /* Round-Trip Layout   */
                        /* =================== */
                        <div className="timetable-roundtrip">
                            {/* Stops chain */}
                            <div className="roundtrip-stops-chain">
                                {stops.map((stop, idx) => (
                                    <React.Fragment key={idx}>
                                        <span className={`rt-chain-station ${idx === 0 ? 'origin' : idx === stops.length - 1 ? 'destination' : 'intermediate'}`}>
                                            {stop.station}
                                        </span>
                                        {idx < stops.length - 1 && <span className="rt-chain-dot">•</span>}
                                    </React.Fragment>
                                ))}
                            </div>

                            {/* Trip rows */}
                            <div className="roundtrip-trips">
                                {route.schedules.map((schedule, index) => (
                                    <div key={index} className={`roundtrip-row ${index > 0 ? 'return' : 'outbound'}`}>
                                        <div className="rt-period-badge">
                                            <span className="rt-direction-icon">{index === 0 ? '▶' : '◀'}</span>
                                            <span className="rt-period-text">{schedule.period}</span>
                                        </div>
                                        <div className="rt-trip-times">
                                            <div className="rt-endpoint">
                                                <span className="rt-station-name">{schedule.stops[0].station}</span>
                                                <span className="rt-time dep">{schedule.stops[0].departure}</span>
                                            </div>
                                            <div className="rt-connector">
                                                <span className="rt-line"></span>
                                                <span className="rt-arrow-icon">→</span>
                                                <span className="rt-line"></span>
                                            </div>
                                            <div className="rt-endpoint arrival">
                                                <span className="rt-station-name">{schedule.stops[schedule.stops.length - 1].station}</span>
                                                <span className="rt-time arr">{schedule.stops[schedule.stops.length - 1].arrival}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        /* =================== */
                        /* Standard Grid Layout */
                        /* =================== */
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
                    )}

                    {/* Footer */}
                    <div className="timetable-card-footer">
                        <span className="route-name">
                            {route.roundTrip
                                ? `${route.origin.toUpperCase()} ↔ ${route.destination.toUpperCase()}`
                                : `${route.origin.toUpperCase()} - ${route.destination.toUpperCase()}`
                            }
                        </span>
                        <span className="flip-hint">Hover for fares →</span>
                    </div>
                </div>

                {/* Back Side - Fares */}
                <div className="schedule-flip-back">
                    <div className="fare-header">
                        <Banknote size={22} />
                        <h3>Ticket Fares</h3>
                    </div>

                    <div className="fare-route-title">
                        {route.origin} ↔ {route.destination}
                    </div>

                    {/* Card Access Section */}
                    <div className="card-access-section">
                        <div className="card-access-heading">
                            <CreditCard size={14} />
                            <span>Train Card Access</span>
                        </div>
                        <div className="card-access-grid">
                            <div className="card-access-item">
                                <span className="card-access-label">Adults</span>
                                <span className="card-access-price">GHS 10</span>
                            </div>
                            <div className="card-access-item">
                                <span className="card-access-label">Children <small>(5-13 yrs)</small></span>
                                <span className="card-access-price">GHS 5</span>
                            </div>
                        </div>
                    </div>

                    {/* Route Fares Table */}
                    <div className="fare-table-section">
                        <div className="fare-table-heading">Ticket Price</div>
                        <div className="fare-table">
                            <div className="fare-table-header-row">
                                <span className="fare-col route">Route</span>
                                <span className="fare-col adult">Adult</span>
                                <span className="fare-col child">Child</span>
                            </div>
                            {route.fares.map((fare, idx) => (
                                <div key={idx} className="fare-table-data-row">
                                    <span className="fare-col route">{fare.route}</span>
                                    <span className="fare-col adult fare-amount">GHS {fare.adult}</span>
                                    <span className="fare-col child fare-amount">GHS {fare.children}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainScheduleCard;
