
import React from 'react';
import './Avatar.css';

const Avatar = ({ name, size = 'md', className = '' }) => {
    const getInitials = (name) => {
        if (!name) return '';
        const parts = name.split(' ').filter(part => part.length > 0 && !part.includes('.')); // Filter out titles like Mr. Dr. if distinct, or just split
        // Better strategy: split by space, take first letter of first and last part
        const nameParts = name.trim().split(/\s+/);

        // Remove titles if they are the first part (optional, but "Mr." "Dr." etc might be in name)
        // For simplicity, let's just take the first letter of the first word and first letter of the last word.
        // If titles are included in the name string (e.g. "Mr. John Doe"), we might get "MD" or "MJ". 
        // Let's try to ignore common titles if possible, or just look at the length.

        let filteredParts = nameParts.filter(p => !['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Ing.', 'Prof.'].includes(p));
        if (filteredParts.length === 0) filteredParts = nameParts; // Fallback if only title

        if (filteredParts.length === 1) {
            return filteredParts[0].charAt(0).toUpperCase();
        }

        return (filteredParts[0].charAt(0) + filteredParts[filteredParts.length - 1].charAt(0)).toUpperCase();
    };

    const getColor = (name) => {
        const colors = [
            '#115E3D', // Primary Green
            '#0d5a3c', // Darker Green
            '#2d5a47', // Muted Green
            '#1a7251', // Tealish Green
            '#d4a528', // Gold/Yellow (Accent)
            '#c4941d', // Darker Gold
            '#8b5a2b', // Brown/Bronze
            '#2C3E50', // Slate Blue
            '#4A5568', // Gray
        ];

        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }

        const index = Math.abs(hash % colors.length);
        return colors[index];
    };

    const initials = getInitials(name);
    const backgroundColor = getColor(name);

    // Size classes: sm, md, lg, xl
    const sizeMap = {
        sm: { width: '40px', height: '40px', fontSize: '14px' },
        md: { width: '64px', height: '64px', fontSize: '24px' },
        lg: { width: '96px', height: '96px', fontSize: '36px' },
        xl: { width: '128px', height: '128px', fontSize: '48px' },
        full: { width: '100%', height: '100%', fontSize: 'calc(100% / 2.5)' } // Responsive based on container
    };

    const style = {
        backgroundColor,
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        fontWeight: '600',
        letterSpacing: '1px',
        ...sizeMap[size]
    };

    // If size is full, we might rely on parent container sizing
    if (size === 'full') {
        style.width = '100%';
        style.height = '100%';
        // For full size, font size needs to be handled carefully or via CSS
        // Let's use CSS for the full size responsive behavior if needed, or inline style
        delete style.fontSize; // Let CSS handle or use the calc
    }

    return (
        <div className={`avatar ${className} avatar-${size}`} style={style} title={name}>
            <span className="avatar-initials" style={size === 'full' ? { fontSize: '2.5rem' } : {}}>{initials}</span>
        </div>
    );
};

export default Avatar;
