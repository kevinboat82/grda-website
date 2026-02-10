import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, auth } from '../../firebase';
import { Upload, X, ArrowLeft, Plus } from 'lucide-react';
import './Editor.css'; // Importing shared styles for gallery grid and drag-and-drop

const CATEGORIES = [
    'General',
    'Railway Construction',
    'Station Development',
    'Infrastructure',
    'Events & Ceremonies',
    'Aerial Views',
    'Equipment & Machinery',
    'Community Engagement',
    'Press & Media'
];

const MediaUpload = () => {
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [caption, setCaption] = useState('');
    const [category, setCategory] = useState('General');
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    // Initial file selection via input
    const handleFileSelect = (e) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            const newFileObjects = newFiles.map(file => ({
                id: `new-${Date.now()}-${Math.random()}`,
                url: URL.createObjectURL(file),
                file: file
            }));
            setFiles(prev => [...prev, ...newFileObjects]);
        }
    };

    // Remove file from list
    const removeFile = (id) => {
        setFiles(prev => prev.filter(file => file.id !== id));
    };

    // Drag and Drop handlers
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files) {
            const droppedFiles = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
            const newFileObjects = droppedFiles.map(file => ({
                id: `new-${Date.now()}-${Math.random()}`,
                url: URL.createObjectURL(file), // Create preview URL
                file: file
            }));
            setFiles(prev => [...prev, ...newFileObjects]);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (files.length === 0) return;

        if (!auth.currentUser) {
            alert("You must be logged in to upload images. Please go to the Login page.");
            navigate('/admin/login');
            return;
        }

        setUploading(true);
        try {
            let successCount = 0;
            const total = files.length;

            for (let i = 0; i < total; i++) {
                const fileObj = files[i];
                setProgress(`Uploading ${i + 1} of ${total}...`);

                // 1. Upload to Firebase Storage
                const storageRef = ref(storage, `media/${Date.now()}_${fileObj.file.name}`);
                await uploadBytes(storageRef, fileObj.file);
                const downloadURL = await getDownloadURL(storageRef);

                // 2. Save metadata to Firestore
                await addDoc(collection(db, "media_gallery"), {
                    imageUrl: downloadURL,
                    storagePath: storageRef.fullPath,
                    caption: caption,
                    category: category,
                    fileName: fileObj.file.name,
                    fileSize: fileObj.file.size,
                    createdAt: serverTimestamp()
                });

                successCount++;
            }

            alert(`Successfully uploaded ${successCount} images!`);
            navigate('/admin/media');
        } catch (error) {
            console.error("Error uploading images:", error);
            alert(`Upload Failed: ${error.message}`);
        } finally {
            setUploading(false);
            setProgress('');
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
            <button
                onClick={() => navigate('/admin/media')}
                className="back-btn"
                style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}
            >
                <ArrowLeft size={20} /> Back to Gallery
            </button>

            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid rgba(0, 107, 63, 0.08)' }}>
                <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary-dark)' }}>Upload Media</h2>

                <form onSubmit={handleUpload}>
                    {/* Category Selection */}
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--color-primary-dark)' }}>Category</label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setCategory(cat)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: '8px',
                                        border: category === cat ? '2px solid var(--color-primary)' : '1px solid rgba(0, 107, 63, 0.15)',
                                        background: category === cat ? 'var(--color-primary)' : 'white',
                                        color: category === cat ? '#FFD700' : '#374151',
                                        cursor: 'pointer',
                                        fontWeight: category === cat ? '600' : '400',
                                        fontSize: '0.85rem',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Bulk Upload Area */}
                    <div className="form-group full-width">
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--color-primary-dark)' }}>Select Photos</label>

                        <div
                            className={`gallery-drop-zone ${isDragging ? 'active' : ''}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            style={{ minHeight: '300px' }}
                        >
                            {isDragging && (
                                <div className="drop-message">
                                    <Upload size={48} />
                                    <span>Drop images here to add them</span>
                                </div>
                            )}

                            <div className="gallery-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))' }}>
                                {files.map((item) => (
                                    <div key={item.id} className="gallery-item">
                                        <img src={item.url} alt="Preview" />
                                        <button
                                            type="button"
                                            onClick={() => removeFile(item.id)}
                                            className="gallery-remove-btn"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}

                                <label className="add-gallery-btn">
                                    <Plus size={24} />
                                    <span>Add Photos</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleFileSelect}
                                        style={{ display: 'none' }}
                                    />
                                </label>
                            </div>

                            {!isDragging && files.length === 0 && (
                                <div style={{ textAlign: 'center', padding: '2rem 0', color: '#9ca3af' }}>
                                    <p>Drag & drop images here</p>
                                    <p style={{ fontSize: '0.875rem' }}>or click "Add Photos"</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Shared Caption */}
                    <div className="form-group" style={{ marginTop: '1.5rem' }}>
                        <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--color-primary-dark)' }}>Caption (Applied to all selected images)</label>
                        <input
                            type="text"
                            className="form-input"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="e.g., Construction site update - Feb 2026"
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(0, 107, 63, 0.15)' }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            marginTop: '2rem',
                            padding: '0.875rem',
                            background: files.length > 0 ? 'linear-gradient(135deg, #FFD700, #FDB913)' : '#d1d5db',
                            color: files.length > 0 ? '#003d23' : '#9ca3af',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: files.length > 0 ? 'pointer' : 'not-allowed',
                            fontWeight: '700',
                            fontSize: '1rem',
                            boxShadow: files.length > 0 ? '0 4px 15px rgba(255, 215, 0, 0.3)' : 'none'
                        }}
                        disabled={uploading || files.length === 0}
                    >
                        {uploading ? (progress || 'Uploading...') : `Upload ${files.length > 0 ? files.length : ''} Images`}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MediaUpload;
