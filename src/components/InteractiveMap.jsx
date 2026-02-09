import React, { useState } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

// City coordinates (aligned with accurate Ghana map outline)
// Ghana: roughly 4.5°N-11.2°N latitude, 3.3°W-1.2°E longitude
// Mapped to viewBox 0 0 400 520 for proper aspect ratio
const cities = {
    // Southern Coast - Gulf of Guinea
    takoradi: { x: 105, y: 478, name: 'Takoradi' },
    sekondi: { x: 95, y: 480, name: 'Sekondi' },
    capeCost: { x: 155, y: 472, name: 'Cape Coast' },
    accra: { x: 240, y: 465, name: 'Accra' },
    tema: { x: 265, y: 460, name: 'Tema' },

    // Central/Ashanti Belt
    tarkwa: { x: 115, y: 435, name: 'Tarkwa' },
    dunkwa: { x: 140, y: 395, name: 'Dunkwa' },
    awaso: { x: 95, y: 365, name: 'Awaso' },
    obuasi: { x: 165, y: 355, name: 'Obuasi' },
    kumasi: { x: 175, y: 315, name: 'Kumasi' },
    nyinahin: { x: 135, y: 335, name: 'Nyinahin' },
    koforidua: { x: 260, y: 410, name: 'Koforidua' },
    mpakadan: { x: 295, y: 375, name: 'Mpakadan' },

    // Brong-Ahafo/Savannah 
    techiman: { x: 165, y: 260, name: 'Techiman' },

    // Northern Region
    tamale: { x: 200, y: 160, name: 'Tamale' },
    yendi: { x: 270, y: 155, name: 'Yendi' },

    // Upper Regions
    bolgatanga: { x: 225, y: 85, name: 'Bolgatanga' },
    paga: { x: 230, y: 50, name: 'Paga' },

    // Trans-national (Burkina Faso - outside map)
    ouagadougou: { x: 290, y: 15, name: 'Ouagadougou (BF)', isForeign: true },
};

// Railway routes configuration
const existingRoutes = [
    {
        id: 'western-narrow',
        name: 'Western Line (Narrow Gauge)',
        distance: '340 km',
        status: 'Operational',
        path: 'M 105 478 L 115 435 L 140 395 L 165 355 L 175 315',
        cities: ['Takoradi', 'Tarkwa', 'Dunkwa', 'Obuasi', 'Kumasi'],
    },
    {
        id: 'awaso-branch',
        name: 'Dunkwa-Awaso Branch',
        distance: '58 km',
        status: 'Operational',
        path: 'M 140 395 L 95 365',
        cities: ['Dunkwa', 'Awaso'],
    },
    {
        id: 'tema-mpakadan',
        name: 'Tema-Mpakadan Line',
        distance: '97 km',
        status: 'Operational',
        path: 'M 265 460 L 295 375',
        cities: ['Tema', 'Mpakadan'],
    },
];

const masterPlanRoutes = [
    // Phase 1 - Green
    {
        id: 'western-std',
        name: 'Western Line (Standard Gauge)',
        distance: '340 km',
        phase: 1,
        path: 'M 95 480 L 105 478 L 115 435 L 140 395 L 165 355 L 175 315',
        cities: ['Sekondi', 'Takoradi', 'Tarkwa', 'Dunkwa', 'Obuasi', 'Kumasi'],
    },
    {
        id: 'eastern-std',
        name: 'Eastern Line (Standard Gauge)',
        distance: '300 km',
        phase: 1,
        path: 'M 240 465 L 260 410 L 275 360 L 215 340 L 175 315',
        cities: ['Accra', 'Koforidua', 'Kumasi'],
    },
    {
        id: 'nyinahin-branch',
        name: 'Kumasi-Nyinahin Branch',
        distance: '58 km',
        phase: 1,
        path: 'M 175 315 L 135 335',
        cities: ['Kumasi', 'Nyinahin'],
    },
    // Phase 2 - Blue
    {
        id: 'central-spine',
        name: 'Central Spine',
        distance: '595 km',
        phase: 2,
        path: 'M 175 315 L 165 260 L 200 160 L 225 85 L 230 50',
        cities: ['Kumasi', 'Techiman', 'Tamale', 'Bolgatanga', 'Paga'],
    },
    {
        id: 'tema-burkina',
        name: 'Ghana-Burkina Link',
        distance: '1,000 km',
        phase: 2,
        path: 'M 265 460 L 295 375 L 305 280 L 290 180 L 290 15',
        cities: ['Tema', 'Mpakadan', 'Ouagadougou'],
        isTransNational: true,
    },
    // Phase 3 - Yellow
    {
        id: 'tamale-yendi',
        name: 'Tamale-Yendi Branch',
        distance: '102 km',
        phase: 3,
        path: 'M 200 160 L 270 155',
        cities: ['Tamale', 'Yendi'],
    },
    {
        id: 'coastal-west',
        name: 'Coastal Line (West)',
        distance: 'TBD',
        phase: 3,
        path: 'M 105 478 L 155 472',
        cities: ['Takoradi', 'Cape Coast'],
    },
    {
        id: 'coastal-east',
        name: 'Coastal Line (East)',
        distance: 'TBD',
        phase: 3,
        path: 'M 155 472 L 240 465 L 265 460',
        cities: ['Cape Coast', 'Accra', 'Tema'],
    },
];

const phaseColors = {
    1: '#16a34a', // Green - Phase 1
    2: '#2563eb', // Blue - Phase 2
    3: '#eab308', // Yellow - Phase 3
};

const InteractiveMap = () => {
    const [activeTab, setActiveTab] = useState('existing');
    const [hoveredRoute, setHoveredRoute] = useState(null);
    const [hoveredCity, setHoveredCity] = useState(null);
    useScrollAnimation();

    const getPhaseLabel = (phase) => {
        switch (phase) {
            case 1: return 'Phase 1 (2020-2025)';
            case 2: return 'Phase 2 (2025-2030)';
            case 3: return 'Phase 3 (2030-2035)';
            default: return '';
        }
    };

    const renderCityMarker = (city, key, isActive = false) => (
        <g
            key={key}
            onMouseEnter={() => setHoveredCity(city)}
            onMouseLeave={() => setHoveredCity(null)}
            style={{ cursor: 'pointer' }}
        >
            <circle
                cx={city.x}
                cy={city.y}
                r={hoveredCity?.name === city.name ? 7 : 5}
                fill={city.isForeign ? '#9333ea' : (isActive ? '#115E3D' : '#64748b')}
                stroke="white"
                strokeWidth="2"
                style={{ transition: 'all 0.2s' }}
            />
            {hoveredCity?.name === city.name && (
                <g>
                    <rect
                        x={city.x + 10}
                        y={city.y - 12}
                        width={city.name.length * 7 + 10}
                        height={20}
                        rx="4"
                        fill="rgba(0,0,0,0.8)"
                    />
                    <text
                        x={city.x + 15}
                        y={city.y + 2}
                        fontSize="11"
                        fill="white"
                        fontWeight="500"
                    >
                        {city.name}
                    </text>
                </g>
            )}
        </g>
    );

    return (
        <div className="animate-on-scroll fade-in" style={{
            backgroundColor: '#f8fafc',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            boxShadow: 'var(--shadow-md)',
        }}>
            <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--color-primary-dark)' }}>
                    Ghana Railway Network Master Plan
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem' }}>
                    Revised Railway Master Plan 2020-2035 • Total: 3,884 km
                </p>
                <div style={{ display: 'inline-flex', backgroundColor: '#e2e8f0', borderRadius: 'var(--radius-lg)', padding: '0.25rem' }}>
                    <button
                        onClick={() => setActiveTab('existing')}
                        style={{
                            padding: '0.6rem 1.5rem',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            backgroundColor: activeTab === 'existing' ? 'white' : 'transparent',
                            color: activeTab === 'existing' ? 'var(--color-primary)' : '#64748b',
                            fontWeight: '600',
                            boxShadow: activeTab === 'existing' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            fontSize: '0.9rem',
                        }}
                    >
                        Existing Network
                    </button>
                    <button
                        onClick={() => setActiveTab('planned')}
                        style={{
                            padding: '0.6rem 1.5rem',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            backgroundColor: activeTab === 'planned' ? 'white' : 'transparent',
                            color: activeTab === 'planned' ? 'var(--color-primary)' : '#64748b',
                            fontWeight: '600',
                            boxShadow: activeTab === 'planned' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            fontSize: '0.9rem',
                        }}
                    >
                        Master Plan 2035
                    </button>
                </div>
            </div>

            <div style={{
                position: 'relative',
                width: '100%',
                backgroundColor: '#e8f4f0',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid #d1e7dd'
            }}>
                <svg
                    viewBox="0 0 400 520"
                    style={{
                        width: '100%',
                        height: 'auto',
                        maxHeight: '600px',
                    }}
                >
                    {/* Accurate Ghana outline - based on geographic boundaries */}
                    {/* Ghana: Western border with Ivory Coast, Northern border with Burkina Faso, Eastern border with Togo, Southern Atlantic coast */}
                    <path
                        d="M 55 490 
                           L 70 488 L 90 485 L 105 482 L 125 478 L 145 475 L 165 471 
                           L 185 467 L 205 464 L 225 462 L 245 460 L 265 458 L 285 456 
                           L 305 454 L 320 450 L 332 445 L 340 438 L 345 428 L 348 415 
                           L 350 400 L 352 380 L 354 360 L 356 340 L 358 320 L 360 300 
                           L 362 280 L 364 260 L 365 240 L 366 220 L 367 200 L 368 180 
                           L 369 160 L 370 140 L 371 120 L 372 100 L 373 80 L 374 60 
                           L 373 45 L 368 35 L 358 28 L 345 22 L 328 18 L 308 15 
                           L 285 13 L 260 12 L 235 11 L 210 10 L 185 11 L 160 13 
                           L 138 16 L 118 20 L 100 26 L 85 34 L 72 44 L 62 56 
                           L 54 70 L 48 88 L 44 108 L 42 130 L 40 155 L 39 180 
                           L 38 205 L 37 230 L 36 255 L 35 280 L 35 305 L 36 330 
                           L 38 355 L 40 380 L 43 405 L 47 428 L 51 448 L 54 468 
                           L 55 490 Z"
                        fill="rgba(255,255,255,0.7)"
                        stroke="#2d5a47"
                        strokeWidth="2"
                    />

                    {/* Lake Volta (simplified) */}
                    <path
                        d="M 280 380 
                           C 285 360, 295 340, 300 320 
                           C 305 300, 310 280, 305 260
                           C 300 240, 290 225, 280 215
                           C 275 225, 285 260, 280 290
                           C 275 320, 265 350, 270 380
                           Z"
                        fill="rgba(59, 130, 246, 0.3)"
                        stroke="rgba(59, 130, 246, 0.5)"
                        strokeWidth="1"
                    />

                    {/* Country label */}
                    <text x="200" y="508" fontSize="13" fill="#64748b" fontWeight="600" textAnchor="middle" letterSpacing="2">
                        GHANA
                    </text>

                    {activeTab === 'existing' ? (
                        <>
                            {/* Existing railway lines */}
                            {existingRoutes.map(route => (
                                <g key={route.id}>
                                    <path
                                        d={route.path}
                                        stroke={hoveredRoute === route.id ? '#0f4d31' : '#115E3D'}
                                        strokeWidth={hoveredRoute === route.id ? 5 : 4}
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                                        onMouseEnter={() => setHoveredRoute(route.id)}
                                        onMouseLeave={() => setHoveredRoute(null)}
                                    />
                                </g>
                            ))}

                            {/* City markers for existing routes */}
                            {renderCityMarker(cities.takoradi, 'takoradi', true)}
                            {renderCityMarker(cities.tarkwa, 'tarkwa', true)}
                            {renderCityMarker(cities.dunkwa, 'dunkwa', true)}
                            {renderCityMarker(cities.awaso, 'awaso', true)}
                            {renderCityMarker(cities.obuasi, 'obuasi', true)}
                            {renderCityMarker(cities.kumasi, 'kumasi', true)}
                            {renderCityMarker(cities.tema, 'tema', true)}
                            {renderCityMarker(cities.mpakadan, 'mpakadan', true)}

                            {/* Static labels for key cities */}
                            <text x={cities.takoradi.x - 15} y={cities.takoradi.y + 18} fontSize="10" fill="#333" fontWeight="500" textAnchor="middle">Takoradi</text>
                            <text x={cities.kumasi.x} y={cities.kumasi.y - 12} fontSize="11" fill="#115E3D" fontWeight="600" textAnchor="middle">KUMASI</text>
                            <text x={cities.tema.x + 25} y={cities.tema.y} fontSize="10" fill="#333" fontWeight="500">Tema</text>
                            <text x={cities.mpakadan.x + 5} y={cities.mpakadan.y + 18} fontSize="10" fill="#333" fontWeight="500">Mpakadan</text>
                        </>
                    ) : (
                        <>
                            {/* Master Plan railway lines by phase */}
                            {masterPlanRoutes.map(route => (
                                <g key={route.id}>
                                    <path
                                        d={route.path}
                                        stroke={hoveredRoute === route.id ? phaseColors[route.phase] : phaseColors[route.phase]}
                                        strokeWidth={hoveredRoute === route.id ? 5 : 3.5}
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeDasharray={route.phase > 1 ? "8 4" : "none"}
                                        opacity={hoveredRoute === route.id ? 1 : 0.85}
                                        style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                                        onMouseEnter={() => setHoveredRoute(route.id)}
                                        onMouseLeave={() => setHoveredRoute(null)}
                                    />
                                </g>
                            ))}

                            {/* All city markers */}
                            {Object.entries(cities).map(([key, city]) =>
                                renderCityMarker(city, key)
                            )}

                            {/* Key city labels */}
                            <text x={cities.accra.x} y={cities.accra.y + 18} fontSize="10" fill="#333" fontWeight="500" textAnchor="middle">Accra</text>
                            <text x={cities.kumasi.x} y={cities.kumasi.y - 12} fontSize="11" fill="#16a34a" fontWeight="600" textAnchor="middle">KUMASI</text>
                            <text x={cities.tamale.x} y={cities.tamale.y - 12} fontSize="10" fill="#2563eb" fontWeight="500" textAnchor="middle">Tamale</text>
                            <text x={cities.paga.x - 25} y={cities.paga.y + 5} fontSize="10" fill="#2563eb" fontWeight="500">Paga</text>
                            <text x={cities.takoradi.x - 15} y={cities.takoradi.y + 18} fontSize="10" fill="#333" fontWeight="500" textAnchor="middle">Takoradi</text>
                            <text x={cities.ouagadougou.x + 5} y={cities.ouagadougou.y + 15} fontSize="9" fill="#9333ea" fontWeight="500">Ouagadougou</text>
                        </>
                    )}
                </svg>

                {/* Route info tooltip */}
                {hoveredRoute && (
                    <div style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        backgroundColor: 'white',
                        padding: '1rem',
                        borderRadius: 'var(--radius-md)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        maxWidth: '250px',
                        zIndex: 10,
                    }}>
                        {activeTab === 'existing' ? (
                            (() => {
                                const route = existingRoutes.find(r => r.id === hoveredRoute);
                                return route ? (
                                    <>
                                        <h4 style={{ margin: '0 0 0.5rem 0', color: '#115E3D', fontSize: '0.95rem' }}>{route.name}</h4>
                                        <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.85rem', color: '#64748b' }}>Distance: {route.distance}</p>
                                        <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.85rem', color: '#16a34a', fontWeight: '500' }}>Status: {route.status}</p>
                                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>{route.cities.join(' → ')}</p>
                                    </>
                                ) : null;
                            })()
                        ) : (
                            (() => {
                                const route = masterPlanRoutes.find(r => r.id === hoveredRoute);
                                return route ? (
                                    <>
                                        <h4 style={{ margin: '0 0 0.5rem 0', color: phaseColors[route.phase], fontSize: '0.95rem' }}>{route.name}</h4>
                                        <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.85rem', color: '#64748b' }}>Distance: {route.distance}</p>
                                        <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.85rem', color: phaseColors[route.phase], fontWeight: '500' }}>{getPhaseLabel(route.phase)}</p>
                                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>{route.cities.join(' → ')}</p>
                                    </>
                                ) : null;
                            })()
                        )}
                    </div>
                )}

                {/* Legend */}
                <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    backgroundColor: 'white',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-sm)',
                    textAlign: 'left',
                    fontSize: '0.8rem',
                }}>
                    {activeTab === 'existing' ? (
                        <>
                            <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#333' }}>Existing Network</div>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.4rem' }}>
                                <div style={{ width: '24px', height: '4px', backgroundColor: '#115E3D', marginRight: '0.5rem', borderRadius: '2px' }}></div>
                                <span style={{ color: '#64748b' }}>Operational (Narrow Gauge)</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#333' }}>Master Plan Phases</div>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.4rem' }}>
                                <div style={{ width: '24px', height: '4px', backgroundColor: phaseColors[1], marginRight: '0.5rem', borderRadius: '2px' }}></div>
                                <span style={{ color: '#64748b' }}>Phase 1 (2020-2025)</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.4rem' }}>
                                <div style={{ width: '24px', height: '4px', backgroundColor: phaseColors[2], marginRight: '0.5rem', borderRadius: '2px', borderBottom: '2px dashed ' + phaseColors[2] }}></div>
                                <span style={{ color: '#64748b' }}>Phase 2 (2025-2030)</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.4rem' }}>
                                <div style={{ width: '24px', height: '4px', backgroundColor: phaseColors[3], marginRight: '0.5rem', borderRadius: '2px', borderBottom: '2px dashed ' + phaseColors[3] }}></div>
                                <span style={{ color: '#64748b' }}>Phase 3 (2030-2035)</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ width: '10px', height: '10px', backgroundColor: '#9333ea', marginRight: '0.5rem', borderRadius: '50%' }}></div>
                                <span style={{ color: '#64748b' }}>International</span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div >
    );
};

export default InteractiveMap;
