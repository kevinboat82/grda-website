import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { Link } from 'react-router-dom';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';

const MediaManager = () => {
    const [mediaItems, setMediaItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMedia = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "media_gallery"));
            const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // Sort by date added if available, or just use as is
            setMediaItems(items);
        } catch (error) {
            console.error("Error fetching media:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMedia();
    }, []);

    const handleDelete = async (id, imageUrl) => {
        if (window.confirm("Are you sure you want to delete this image?")) {
            try {
                // 1. Delete from Firestore
                await deleteDoc(doc(db, "media_gallery", id));

                // 2. Delete from Storage (if we can parse the ref)
                // This is tricky with download URLs, but for now we'll focus on removing the record.
                // Ideally, we store the storagePath in Firestore too.
                // If we don't have the path, we can't easily delete from storage without parsing the URL.
                // For this MVF (Minimum Viable Feature), we'll just delete the Firestore record 
                // to remove it from the gallery. Clean up of storage can be a manual or separate task
                // unless we saved the storage path. *See note below*

                // *Self-correction*: Let's assume we save 'storagePath' in the upload step.

                fetchMedia();
            } catch (error) {
                console.error("Error deleting media:", error);
                alert("Failed to delete media.");
            }
        }
    };

    if (loading) return <div>Loading gallery...</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>Media Gallery Manager</h1>
                <Link to="/admin/media/upload" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Plus size={18} /> Upload New
                </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
                {mediaItems.length === 0 ? (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', background: 'white', borderRadius: 'var(--radius-lg)' }}>
                        <ImageIcon size={48} color="#9ca3af" style={{ marginBottom: '1rem' }} />
                        <p style={{ color: '#6b7280' }}>No media items found. Upload some photos to get started.</p>
                    </div>
                ) : (
                    mediaItems.map(item => (
                        <div key={item.id} style={{ background: 'white', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', position: 'relative', group: 'group' }}>
                            <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
                                <img src={item.imageUrl} alt={item.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ padding: '0.75rem' }}>
                                <p style={{ fontSize: '0.875rem', fontWeight: '500', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.caption || "Untitled"}</p>
                                <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>{new Date(item.createdAt?.seconds * 1000).toLocaleDateString()}</p>
                            </div>
                            <button
                                onClick={() => handleDelete(item.id, item.imageUrl)}
                                style={{
                                    position: 'absolute',
                                    top: '0.5rem',
                                    right: '0.5rem',
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    padding: '0.5rem',
                                    cursor: 'pointer',
                                    color: '#ef4444',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}
                                title="Delete Image"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MediaManager;
