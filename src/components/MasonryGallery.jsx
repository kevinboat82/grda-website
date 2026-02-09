
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './MasonryGallery.css';

/** Hook to handle media queries for responsive columns */
const useMedia = (queries, values, defaultValue) => {
    const get = () => {
        if (typeof window === 'undefined') return defaultValue;
        const match = queries.findIndex(q => window.matchMedia(q).matches);
        return values[match] !== undefined ? values[match] : defaultValue;
    };

    const [value, setValue] = useState(get);

    useEffect(() => {
        const handler = () => setValue(get);
        queries.forEach(q => window.matchMedia(q).addEventListener('change', handler));
        return () => queries.forEach(q => window.matchMedia(q).removeEventListener('change', handler));
    }, [queries]);

    return value;
};

/** Hook to measure element size via ResizeObserver */
const useMeasure = () => {
    const ref = useRef(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        if (!ref.current) return;
        const ro = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            setSize({ width, height });
        });
        ro.observe(ref.current);
        return () => ro.disconnect();
    }, []);

    return [ref, size];
};

/** Utility to ensure images are loaded before layout/animation */
const preloadImages = async (urls) => {
    await Promise.all(
        urls.map(
            src =>
                new Promise(resolve => {
                    const img = new Image();
                    img.src = src;
                    img.onload = img.onerror = () => resolve();
                })
        )
    );
};

const MasonryGallery = ({
    items,
    ease = 'power3.out',
    duration = 0.6,
    stagger = 0.05,
    animateFrom = 'bottom',
    scaleOnHover = true,
    hoverScale = 0.95,
    blurToFocus = true,
    colorShiftOnHover = false,
    className = '',
    itemClassName = '',
    onImageClick
}) => {
    const columns = useMedia(
        ['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)', '(min-width: 400px)'],
        [4, 3, 2, 2], // Adjusted columns for better view
        2 // Mobile default
    );

    const [containerRef, { width }] = useMeasure();
    const [imagesReady, setImagesReady] = useState(false);
    const hasMounted = useRef(false);

    // Initial animation calculations
    const getInitialPosition = (item) => {
        const containerRect = containerRef.current?.getBoundingClientRect();
        if (!containerRect) return { x: item.x, y: item.y };

        let direction = animateFrom;
        if (animateFrom === 'random') {
            const dirs = ['top', 'bottom', 'left', 'right'];
            direction = dirs[Math.floor(Math.random() * dirs.length)];
        }

        switch (direction) {
            case 'top': return { x: item.x, y: -200 };
            case 'bottom': return { x: item.x, y: window.innerHeight + 200 };
            case 'left': return { x: -200, y: item.y };
            case 'right': return { x: window.innerWidth + 200, y: item.y };
            case 'center': return {
                x: containerRect.width / 2 - item.w / 2,
                y: containerRect.height / 2 - item.h / 2
            };
            default: return { x: item.x, y: item.y + 100 };
        }
    };

    // Preload logic
    useEffect(() => {
        if (!items || items.length === 0) return;
        setImagesReady(false);
        preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));
    }, [items]);

    // Layout calculation
    const { grid, containerHeight } = useMemo(() => {
        if (!width || !items?.length) return { grid: [], containerHeight: 0 };

        const colHeights = new Array(columns).fill(0);
        const gap = 16;
        const totalGaps = (columns - 1) * gap;
        const columnWidth = (width - totalGaps) / columns;

        const gridItems = items.map(child => {
            const col = colHeights.indexOf(Math.min(...colHeights));
            const x = col * (columnWidth + gap);
            // Default to square if height not provided, otherwise scale
            const refHeight = child.height || 400;
            const height = (refHeight / 400) * columnWidth;
            const y = colHeights[col];
            colHeights[col] += height + gap;
            return { ...child, x, y, w: columnWidth, h: height };
        });

        return { grid: gridItems, containerHeight: Math.max(...colHeights) };
    }, [columns, items, width]);

    // Animation logic
    useLayoutEffect(() => {
        if (!imagesReady || !grid.length) return;

        grid.forEach((item, index) => {
            const element = document.querySelector(`[data-key="${item.id}"]`);
            if (!element) return;

            const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };

            if (!hasMounted.current) {
                const start = getInitialPosition(item);
                gsap.fromTo(
                    element,
                    {
                        opacity: 0,
                        x: start.x,
                        y: start.y,
                        width: item.w,
                        height: item.h,
                        ...(blurToFocus && { filter: 'blur(20px)' })
                    },
                    {
                        opacity: 1,
                        ...animProps,
                        ...(blurToFocus && { filter: 'blur(0px)' }),
                        duration: 1.2,
                        ease: 'power3.out',
                        delay: index * stagger
                    }
                );
            } else {
                gsap.to(element, {
                    ...animProps,
                    duration,
                    ease,
                    overwrite: 'auto'
                });
            }
        });

        if (grid.length > 0) hasMounted.current = true;
    }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

    const handleMouseEnter = (id, element) => {
        if (scaleOnHover) {
            gsap.to(element, {
                scale: hoverScale,
                duration: 0.4,
                ease: 'power2.out'
            });
        }
        if (colorShiftOnHover) {
            const overlay = element.querySelector('.color-overlay');
            if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.4 });
        }
    };

    const handleMouseLeave = (id, element) => {
        if (scaleOnHover) {
            gsap.to(element, {
                scale: 1,
                duration: 0.4,
                ease: 'power2.out'
            });
        }
        if (colorShiftOnHover) {
            const overlay = element.querySelector('.color-overlay');
            if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.4 });
        }
    };

    return (
        <div
            ref={containerRef}
            className={`masonry-gallery ${className}`}
            style={{ height: containerHeight, minHeight: '200px' }}
        >
            {grid.map(item => (
                <div
                    key={item.id}
                    data-key={item.id}
                    className={`masonry-item ${itemClassName}`}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        willChange: 'transform, width, height, opacity, filter',
                        boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)'
                    }}
                    onClick={() => onImageClick ? onImageClick(item.img) : (item.url && window.open(item.url, '_blank', 'noopener'))}
                    onMouseEnter={e => handleMouseEnter(item.id, e.currentTarget)}
                    onMouseLeave={e => handleMouseLeave(item.id, e.currentTarget)}
                >
                    <div
                        className="masonry-image-bg"
                        style={{ backgroundImage: `url(${item.img})` }}
                    >
                        {colorShiftOnHover && (
                            <div className="color-overlay" />
                        )}
                        <div className="gallery-hover-overlay">
                            <span>View</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MasonryGallery;
