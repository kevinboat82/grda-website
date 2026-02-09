import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, auth } from '../../firebase';
import { Upload, X, ImageIcon, ArrowLeft } from 'lucide-react';

const MediaUpload = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [caption, setCaption] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!image) return;

        if (!auth.currentUser) {
            alert("You must be logged in to upload images. Please go to the Login page.");
            navigate('/admin/login');
            return;
        }

        setUploading(true);
        try {
            // 1. Upload to Firebase Storage
            const storageRef = ref(storage, `media/${Date.now()}_${image.name}`);
            await uploadBytes(storageRef, image);
            const downloadURL = await getDownloadURL(storageRef);

            // 2. Save metadata to Firestore
            await addDoc(collection(db, "media_gallery"), {
                imageUrl: downloadURL,
                storagePath: storageRef.fullPath, // Save path for easier deletion later
                caption: caption,
                createdAt: serverTimestamp()
            });

            alert("Image uploaded successfully!");
            navigate('/admin/media');
        } catch (error) {
            console.error("Error uploading image:", error);
            alert(`Upload Failed: ${error.message} (Code: ${error.code})`);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <button onClick={() => navigate('/admin/media')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '1.5rem', color: '#6b7280' }}>
                <ArrowLeft size={20} /> Back to Gallery
            </button>

            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
                <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Upload New Media</h2>

                <form onSubmit={handleUpload}>
                    {/* Image Upload Area */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Photo</label>
                        {!preview ? (
                            <div
                                onClick={() => document.getElementById('media-upload').click()}
                                style={{
                                    border: '2px dashed #d1d5db',
                                    borderRadius: 'var(--radius-md)',
                                    padding: '3rem',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    backgroundColor: '#f9fafb',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <Upload size={32} color="#9ca3af" style={{ marginBottom: '0.5rem' }} />
                                <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>Click to select an image</p>
                                <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>JPG, PNG, GIF up to 5MB</span>
                            </div>
                        ) : (
                            <div style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                                <img src={preview} alt="Preview" style={{ width: '100%', maxHeight: '400px', objectFit: 'contain', backgroundColor: '#f3f4f6' }} />
                                <button
                                    type="button"
                                    onClick={() => { setImage(null); setPreview(null); }}
                                    style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', padding: '0.25rem', cursor: 'pointer' }}
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        )}
                        <input
                            id="media-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />
                    </div>

                    {/* Caption Input */}
                    <div className="form-group">
                        <label className="form-label">Caption (Optional)</label>
                        <input
                            type="text"
                            className="form-input"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="e.g., Construction at Tema Station"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', marginTop: '1rem' }}
                        disabled={uploading || !image}
                    >
                        {uploading ? 'Uploading...' : 'Upload to Gallery'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MediaUpload;
