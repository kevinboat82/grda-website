import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, Map } from 'lucide-react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import './InteractiveMap.css';

const maps = [
    {
        id: 'interconnectivity',
        name: 'Interconnectivity Plan 2026',
        shortName: 'Interconnectivity',
        src: '/images/interconnectivity-plan.jpg',
        description: 'Ghana Railway Interconnectivity Plan 2026 — an integrated national rail network linking all major corridors.',
    },
    {
        id: 'western',
        name: 'Western Railway Corridor',
        shortName: 'Western',
        src: '/images/western-corridor.jpg',
        description: 'The Western Railway Corridor connecting Takoradi through Kumasi to northern Ghana.',
    },
    {
        id: 'eastern',
        name: 'Eastern Railway Corridor',
        shortName: 'Eastern',
        src: '/images/eastern-corridor.jpg',
        description: 'The Eastern Railway Corridor from Accra/Tema northward through the Volta region.',
    },
    {
        id: 'central',
        name: 'Central Railway Corridor',
        shortName: 'Central',
        src: '/images/central-corridor.jpg',
        description: 'The Central Railway Corridor linking Accra to Kumasi via the inland route.',
    },
];

const MIN_ZOOM = 1;
const MAX_ZOOM = 5;
const ZOOM_STEP = 0.4;

const InteractiveMap = () => {
    useScrollAnimation();

    const [activeMap, setActiveMap] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [isFullscreen, setIsFullscreen] = useState(false);

    const containerRef = useRef(null);
    const imageRef = useRef(null);

    // Reset zoom/pan when switching tabs
    useEffect(() => {
        setZoom(1);
        setPosition({ x: 0, y: 0 });
    }, [activeMap]);

    const handleZoomIn = useCallback(() => {
        setZoom(prev => Math.min(prev + ZOOM_STEP, MAX_ZOOM));
    }, []);

    const handleZoomOut = useCallback(() => {
        setZoom(prev => {
            const next = Math.max(prev - ZOOM_STEP, MIN_ZOOM);
            if (next <= 1) setPosition({ x: 0, y: 0 });
            return next;
        });
    }, []);

    const handleReset = useCallback(() => {
        setZoom(1);
        setPosition({ x: 0, y: 0 });
    }, []);

    const handleWheel = useCallback((e) => {
        e.preventDefault();
        if (e.deltaY < 0) {
            setZoom(prev => Math.min(prev + ZOOM_STEP * 0.5, MAX_ZOOM));
        } else {
            setZoom(prev => {
                const next = Math.max(prev - ZOOM_STEP * 0.5, MIN_ZOOM);
                if (next <= 1) setPosition({ x: 0, y: 0 });
                return next;
            });
        }
    }, []);

    const handleMouseDown = useCallback((e) => {
        if (zoom <= 1) return;
        e.preventDefault();
        setIsDragging(true);
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }, [zoom, position]);

    const handleMouseMove = useCallback((e) => {
        if (!isDragging) return;
        setPosition({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y,
        });
    }, [isDragging, dragStart]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    // Touch support for mobile
    const handleTouchStart = useCallback((e) => {
        if (zoom <= 1) return;
        const touch = e.touches[0];
        setIsDragging(true);
        setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
    }, [zoom, position]);

    const handleTouchMove = useCallback((e) => {
        if (!isDragging) return;
        e.preventDefault();
        const touch = e.touches[0];
        setPosition({
            x: touch.clientX - dragStart.x,
            y: touch.clientY - dragStart.y,
        });
    }, [isDragging, dragStart]);

    const handleTouchEnd = useCallback(() => {
        setIsDragging(false);
    }, []);

    const toggleFullscreen = useCallback(() => {
        if (!containerRef.current) return;
        if (!isFullscreen) {
            if (containerRef.current.requestFullscreen) {
                containerRef.current.requestFullscreen();
            } else if (containerRef.current.webkitRequestFullscreen) {
                containerRef.current.webkitRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
        setIsFullscreen(!isFullscreen);
    }, [isFullscreen]);

    // Listen for fullscreen changes
    useEffect(() => {
        const handler = () => {
            const fs = !!(document.fullscreenElement || document.webkitFullscreenElement);
            setIsFullscreen(fs);
        };
        document.addEventListener('fullscreenchange', handler);
        document.addEventListener('webkitfullscreenchange', handler);
        return () => {
            document.removeEventListener('fullscreenchange', handler);
            document.removeEventListener('webkitfullscreenchange', handler);
        };
    }, []);

    // Attach wheel listener with passive: false
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        el.addEventListener('wheel', handleWheel, { passive: false });
        return () => el.removeEventListener('wheel', handleWheel);
    }, [handleWheel]);

    const current = maps[activeMap];

    return (
        <section className="map-viewer-section animate-on-scroll fade-up">
            <div className="container">
                <div className="section-header">
                    <h2>Railway Master Plans</h2>
                    <p>Explore Ghana's railway development corridors and interconnectivity plans.</p>
                </div>

                {/* Tab Selector */}
                <div className="map-tabs">
                    {maps.map((m, i) => (
                        <button
                            key={m.id}
                            className={`map-tab ${activeMap === i ? 'active' : ''}`}
                            onClick={() => setActiveMap(i)}
                        >
                            <Map size={16} />
                            <span className="tab-full">{m.name}</span>
                            <span className="tab-short">{m.shortName}</span>
                        </button>
                    ))}
                </div>

                {/* Map description */}
                <p className="map-description">{current.description}</p>

                {/* Map Viewer */}
                <div
                    ref={containerRef}
                    className={`map-viewer-container ${isDragging ? 'dragging' : ''} ${zoom > 1 ? 'zoomed' : ''}`}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <img
                        ref={imageRef}
                        src={current.src}
                        alt={current.name}
                        className="map-image"
                        draggable={false}
                        style={{
                            transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                        }}
                    />

                    {/* Zoom Controls */}
                    <div className="map-controls">
                        <button className="map-ctrl-btn" onClick={handleZoomIn} title="Zoom In">
                            <ZoomIn size={18} />
                        </button>
                        <span className="zoom-level">{Math.round(zoom * 100)}%</span>
                        <button className="map-ctrl-btn" onClick={handleZoomOut} title="Zoom Out">
                            <ZoomOut size={18} />
                        </button>
                        <button className="map-ctrl-btn" onClick={handleReset} title="Reset View">
                            <RotateCcw size={18} />
                        </button>
                        <button className="map-ctrl-btn" onClick={toggleFullscreen} title="Fullscreen">
                            <Maximize2 size={18} />
                        </button>
                    </div>

                    {/* Zoom hint */}
                    {zoom <= 1 && (
                        <div className="zoom-hint">
                            <ZoomIn size={14} />
                            Scroll to zoom · Drag to pan
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default InteractiveMap;
