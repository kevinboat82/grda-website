import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, addDoc, doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { ArrowLeft, Upload, X, Plus, Image as ImageIcon } from 'lucide-react';
import './Editor.css';

const ProjectEditor = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState({
        title: '',
        category: 'Ongoing Projects',
        status: 'Ongoing',
        completionPercentage: 0,
        description: '',
        location: '',
        startDate: '',
        completionDate: '',
        contractor: '',
        budget: '',
        scope: ''
    });

    const [coverImage, setCoverImage] = useState(null);
    const [coverImagePreview, setCoverImagePreview] = useState('');
    const [existingCoverImage, setExistingCoverImage] = useState('');

    const [galleryImages, setGalleryImages] = useState([]);
    const [galleryPreviews, setGalleryPreviews] = useState([]);
    const [existingGalleryImages, setExistingGalleryImages] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEditMode) {
            fetchProject();
        }
    }, [id]);

    const fetchProject = async () => {
        try {
            const docRef = doc(db, 'projects', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setFormData({
                    title: data.title || '',
                    category: data.category || 'Ongoing Projects',
                    status: data.status || 'Ongoing',
                    completionPercentage: data.completionPercentage || 0,
                    description: data.description || '',
                    location: data.location || '',
                    startDate: data.startDate || '',
                    completionDate: data.completionDate || '',
                    contractor: data.contractor || '',
                    budget: data.budget || '',
                    scope: data.scope || ''
                });
                setExistingCoverImage(data.coverImage || '');
                setCoverImagePreview(data.coverImage || '');
                setExistingGalleryImages(data.galleryImages || []);
            }
        } catch (err) {
            console.error('Error fetching project:', err);
            setError('Failed to load project');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePercentageChange = (e) => {
        const value = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
        setFormData(prev => ({ ...prev, completionPercentage: value }));
    };

    const handleCoverImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoverImage(file);
            setCoverImagePreview(URL.createObjectURL(file));
        }
    };

    const handleGalleryImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setGalleryImages(prev => [...prev, ...files]);
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setGalleryPreviews(prev => [...prev, ...newPreviews]);
    };

    const removeGalleryImage = (index, isExisting = false) => {
        if (isExisting) {
            setExistingGalleryImages(prev => prev.filter((_, i) => i !== index));
        } else {
            setGalleryImages(prev => prev.filter((_, i) => i !== index));
            setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
        }
    };

    const uploadImage = async (file, path) => {
        const storageRef = ref(storage, path);
        await uploadBytes(storageRef, file);
        return getDownloadURL(storageRef);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            let coverImageUrl = existingCoverImage;

            // Upload new cover image if selected
            if (coverImage) {
                const timestamp = Date.now();
                coverImageUrl = await uploadImage(
                    coverImage,
                    `projects/covers/${timestamp}_${coverImage.name}`
                );
            }

            // Upload new gallery images
            const newGalleryUrls = await Promise.all(
                galleryImages.map(async (file, index) => {
                    const timestamp = Date.now();
                    return uploadImage(
                        file,
                        `projects/gallery/${timestamp}_${index}_${file.name}`
                    );
                })
            );

            const allGalleryImages = [...existingGalleryImages, ...newGalleryUrls];

            const projectData = {
                ...formData,
                coverImage: coverImageUrl,
                galleryImages: allGalleryImages,
                updatedAt: serverTimestamp()
            };

            if (isEditMode) {
                await updateDoc(doc(db, 'projects', id), projectData);
            } else {
                projectData.createdAt = serverTimestamp();
                await addDoc(collection(db, 'projects'), projectData);
            }

            navigate('/admin/dashboard');
        } catch (err) {
            console.error('Error saving project:', err);
            setError('Failed to save project. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-editor">
            <button className="back-btn" onClick={() => navigate('/admin/dashboard')}>
                <ArrowLeft size={20} />
                Back to Dashboard
            </button>
            <div className="editor-header">
                <h1>{isEditMode ? 'Edit Project' : 'Create New Project'}</h1>
            </div>

            {error && (
                <div style={{ background: '#fee2e2', color: '#dc2626', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="editor-form">
                <div className="form-group full-width">
                    <label>Project Title *</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g., Tema - Mpakadan Standard Gauge"
                        required
                    />
                </div>

                <div className="form-grid">
                    <div className="form-group">
                        <label>Category *</label>
                        <select name="category" value={formData.category} onChange={handleChange}>
                            <option value="Ongoing Projects">Ongoing Projects</option>
                            <option value="Completed Projects">Completed Projects</option>
                            <option value="Upcoming Projects">Upcoming Projects</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Status</label>
                        <input
                            type="text"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            placeholder="e.g., Ongoing, Phase 1 Complete"
                        />
                    </div>
                </div>

                <div className="form-grid">
                    <div className="form-group">
                        <label>Completion Percentage</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input
                                type="number"
                                name="completionPercentage"
                                value={formData.completionPercentage}
                                onChange={handlePercentageChange}
                                min="0"
                                max="100"
                                style={{ width: '80px', textAlign: 'center' }}
                            />
                            <span style={{ fontWeight: '600', color: '#6b7280' }}>%</span>
                        </div>
                        <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden', marginTop: '0.5rem' }}>
                            <div
                                style={{
                                    width: `${formData.completionPercentage}%`,
                                    height: '100%',
                                    background: 'var(--color-primary)',
                                    transition: 'width 0.3s ease'
                                }}
                            ></div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="e.g., Tema - Mpakadan"
                        />
                    </div>
                </div>

                <div className="form-grid">
                    <div className="form-group">
                        <label>Start Date</label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Expected / Actual Completion Date</label>
                        <input
                            type="date"
                            name="completionDate"
                            value={formData.completionDate}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-grid">
                    <div className="form-group">
                        <label>Contractor / Partner</label>
                        <input
                            type="text"
                            name="contractor"
                            value={formData.contractor}
                            onChange={handleChange}
                            placeholder="e.g., Amandi Holdings, AFCONS Infrastructure"
                        />
                    </div>

                    <div className="form-group">
                        <label>Estimated Budget</label>
                        <input
                            type="text"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            placeholder="e.g., $398 Million, GHS 2.5 Billion"
                        />
                    </div>
                </div>

                <div className="form-group full-width">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Brief project description for the card view..."
                        rows={3}
                    />
                </div>

                <div className="form-group full-width">
                    <label>Scope & Highlights</label>
                    <textarea
                        name="scope"
                        value={formData.scope}
                        onChange={handleChange}
                        placeholder="Detailed project scope, key milestones, technical details...&#10;&#10;This will appear on the full case study page."
                        rows={6}
                    />
                </div>

                {/* Cover Image */}
                <div className="form-group full-width">
                    <label>Cover Image</label>
                    <div className="image-upload-area">
                        {coverImagePreview ? (
                            <div className="image-preview-container">
                                <img src={coverImagePreview} alt="Cover preview" className="image-preview" />
                                <button
                                    type="button"
                                    className="remove-image-btn"
                                    onClick={() => {
                                        setCoverImage(null);
                                        setCoverImagePreview('');
                                        setExistingCoverImage('');
                                    }}
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <label className="upload-placeholder">
                                <Upload size={32} />
                                <span>Click to upload cover image</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleCoverImageChange}
                                    style={{ display: 'none' }}
                                />
                            </label>
                        )}
                    </div>
                </div>

                {/* Gallery Images */}
                <div className="form-group full-width">
                    <label>Gallery Images</label>
                    <div className="gallery-grid">
                        {/* Existing Gallery Images */}
                        {existingGalleryImages.map((url, index) => (
                            <div key={`existing-${index}`} className="gallery-item">
                                <img src={url} alt={`Gallery ${index + 1}`} />
                                <button
                                    type="button"
                                    className="gallery-remove-btn"
                                    onClick={() => removeGalleryImage(index, true)}
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))}

                        {/* New Gallery Previews */}
                        {galleryPreviews.map((url, index) => (
                            <div key={`new-${index}`} className="gallery-item">
                                <img src={url} alt={`New gallery ${index + 1}`} />
                                <button
                                    type="button"
                                    className="gallery-remove-btn"
                                    onClick={() => removeGalleryImage(index, false)}
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))}

                        {/* Add More Button */}
                        <label className="add-gallery-btn">
                            <Plus size={24} />
                            <span>Add</span>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleGalleryImagesChange}
                                style={{ display: 'none' }}
                            />
                        </label>
                    </div>
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate('/admin/dashboard')}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : (isEditMode ? 'Update Project' : 'Create Project')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProjectEditor;
