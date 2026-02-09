import React, { useState, useEffect } from 'react';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { Upload, X, ArrowLeft, Tag, Plus } from 'lucide-react';
import './Editor.css';

// Available categories
const CATEGORIES = [
    { value: 'news', label: 'News & Updates' },
    { value: 'press', label: 'Press Releases' },
    { value: 'articles', label: 'Articles' },
    { value: 'events', label: 'Events' }
];

const StoryEditor = () => {
    const { id } = useParams(); // If id exists, we're editing
    const isEditMode = Boolean(id);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState(''); // Full story content
    const [category, setCategory] = useState('news'); // Default category
    const [link, setLink] = useState('');
    const [linkText, setLinkText] = useState('');
    const [statValue, setStatValue] = useState('');
    const [statLabel, setStatLabel] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [existingImageUrl, setExistingImageUrl] = useState('');
    const [gallery, setGallery] = useState([]); // Array of { id, url, file }
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(isEditMode);
    const navigate = useNavigate();

    // Load existing story data if in edit mode
    useEffect(() => {
        if (isEditMode) {
            const fetchStory = async () => {
                try {
                    const storyDoc = await getDoc(doc(db, "stories", id));
                    if (storyDoc.exists()) {
                        const data = storyDoc.data();
                        setTitle(data.title || '');
                        setDescription(data.description || '');
                        setContent(data.content || '');
                        setCategory(data.category || 'news');
                        setLink(data.link || '');
                        setLinkText(data.linkText || '');
                        if (data.stats) {
                            setStatValue(data.stats.value || '');
                            setStatLabel(data.stats.label || '');
                        }
                        setExistingImageUrl(data.image || '');
                        setImagePreview(data.image || null);

                        if (data.gallery && Array.isArray(data.gallery)) {
                            setGallery(data.gallery.map((url, index) => ({
                                id: `existing-${index}`,
                                url: url
                            })));
                        }
                    } else {
                        alert("Story not found");
                        navigate('/admin/dashboard');
                    }
                } catch (error) {
                    console.error("Error fetching story:", error);
                    alert("Failed to load story");
                } finally {
                    setInitialLoading(false);
                }
            };
            fetchStory();
        }
    }, [id, isEditMode, navigate]);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            setImagePreview(URL.createObjectURL(e.target.files[0]));
            setExistingImageUrl(''); // Clear existing image when new one selected
        }
    };

    const handleGalleryUpload = (e) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            const newGalleryItems = newFiles.map(file => ({
                id: `new-${Date.now()}-${Math.random()}`,
                url: URL.createObjectURL(file),
                file: file
            }));
            setGallery(prev => [...prev, ...newGalleryItems]);
        }
    };

    const removeGalleryImage = (itemId) => {
        setGallery(prev => prev.filter(item => item.id !== itemId));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Only require image for new stories
        if (!isEditMode && !image) {
            alert("Please select an image");
            return;
        }

        setLoading(true);
        try {
            let imageUrl = existingImageUrl;

            // Upload new main image if selected
            if (image) {
                const storageRef = ref(storage, `hero-stories/${Date.now()}_${image.name}`);
                await uploadBytes(storageRef, image);
                imageUrl = await getDownloadURL(storageRef);
            }

            // Process Gallery Images
            const galleryUrls = [];
            for (const item of gallery) {
                if (item.file) {
                    // New upload
                    const storageRef = ref(storage, `story-gallery/${Date.now()}_${item.file.name}`);
                    await uploadBytes(storageRef, item.file);
                    const url = await getDownloadURL(storageRef);
                    galleryUrls.push(url);
                } else {
                    // Existing image
                    galleryUrls.push(item.url);
                }
            }

            const storyData = {
                title,
                description,
                content,
                category,
                link,
                linkText,
                image: imageUrl,
                stats: (statValue || statLabel) ? {
                    value: statValue,
                    label: statLabel
                } : null,
                gallery: galleryUrls,
                updatedAt: new Date()
            };

            if (isEditMode) {
                // Update existing story
                await updateDoc(doc(db, "stories", id), storyData);
            } else {
                // Create new story
                storyData.createdAt = new Date();
                await addDoc(collection(db, "stories"), storyData);
            }

            navigate('/admin/dashboard');
        } catch (error) {
            console.error("Error saving story:", error);
            alert("Failed to save story. Check console for details.");
        } finally {
            setLoading(false);
        }
    };

    // Drag and Drop handlers
    const [isDragging, setIsDragging] = useState(false);

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
            const newFiles = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
            const newGalleryItems = newFiles.map(file => ({
                id: `new-${Date.now()}-${Math.random()}`,
                url: URL.createObjectURL(file), // Create preview URL
                file: file
            }));
            setGallery(prev => [...prev, ...newGalleryItems]);
        }
    };

    if (initialLoading) {
        return (
            <div className="admin-loading">
                <p>Loading story...</p>
            </div>
        );
    }

    return (
        <div className="admin-editor">
            <button
                type="button"
                onClick={() => navigate('/admin/dashboard')}
                className="back-btn"
            >
                <ArrowLeft size={20} /> Back to Dashboard
            </button>

            <div className="editor-header">
                <h1>{isEditMode ? 'Edit Story' : 'Add New Story'}</h1>
            </div>

            <div className="editor-form">
                <form onSubmit={handleSubmit}>
                    {/* ... (previous form fields omitted for brevity, but I will include them in context if needed, but here I am creating a chunk that starts from `if (initialLoading)` so I need to be careful. Wait, I should target the return block mainly, but I need to insert the handler functions first. Let's do a multi-replace or carefully target) */}
                    {/* Actually, let's look at where I can insert the handlers. Line 102 seems good, before `handleSubmit`. But wait, `handleSubmit` is line 103. I can insert before `if (initialLoading)`.
                    And then I need to update the JSX for the gallery section.
                    
                    Let's utilize `multi_replace_file_content` for this to be safer.
                    */}

                    {/* Category Selection */}
                    <div className="form-group full-width">
                        <label>
                            <Tag size={16} />
                            Category
                        </label>
                        <div className="category-select">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat.value}
                                    type="button"
                                    onClick={() => setCategory(cat.value)}
                                    className={`category-btn ${category === cat.value ? 'active' : ''}`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="form-group full-width">
                        <label>Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="e.g., Commissioning of New Line"
                        />
                    </div>

                    <div className="form-group full-width">
                        <label>Short Description (Slider Preview)</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            rows="2"
                            placeholder="Brief teaser text that appears on the hero slider..."
                        />
                    </div>

                    <div className="form-group full-width">
                        <label>Full Story Content</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows="10"
                            placeholder="Write the full story here..."
                        />
                        <p className="form-help">
                            This is the complete article that users will see when they click "Read More"
                        </p>
                    </div>

                    <div className="form-grid">
                        <div className="form-group">
                            <label>External Link (Optional)</label>
                            <input
                                type="text"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                placeholder="/projects or https://..."
                            />
                            <p className="form-help">
                                Leave blank to use "Read More" for full story
                            </p>
                        </div>
                        <div className="form-group">
                            <label>Button Text</label>
                            <input
                                type="text"
                                value={linkText}
                                onChange={(e) => setLinkText(e.target.value)}
                                placeholder="Read More"
                            />
                        </div>
                    </div>

                    <div className="form-grid">
                        <div className="form-group">
                            <label>Statistic Value (Optional)</label>
                            <input
                                type="text"
                                value={statValue}
                                onChange={(e) => setStatValue(e.target.value)}
                                placeholder="e.g., 2027, 9, 160km"
                            />
                            <p className="form-help">
                                Shown as the main number in the slider status box
                            </p>
                        </div>
                        <div className="form-group">
                            <label>Statistic Label (Optional)</label>
                            <input
                                type="text"
                                value={statLabel}
                                onChange={(e) => setStatLabel(e.target.value)}
                                placeholder="e.g., Target Year, Board Members"
                            />
                            <p className="form-help">
                                Shown below the value in the slider status box
                            </p>
                        </div>
                    </div>

                    <div className="form-group full-width">
                        <label>Background Image</label>
                        <div className="image-upload-area">
                            {imagePreview ? (
                                <div className="image-preview-container">
                                    <img src={imagePreview} alt="Preview" className="image-preview" />
                                    <button
                                        type="button"
                                        onClick={() => { setImage(null); setImagePreview(null); setExistingImageUrl(''); }}
                                        className="remove-image-btn"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ) : (
                                <label className="upload-placeholder">
                                    <Upload size={32} />
                                    <div>Click or drag image to upload</div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        style={{ display: 'none' }}
                                    />
                                </label>
                            )}
                        </div>
                    </div>

                    <div className="form-group full-width">
                        <label>Story Gallery / Diary</label>
                        {/* Drag and Drop Gallery Zone */}
                        <div
                            className={`gallery-drop-zone ${isDragging ? 'active' : ''}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            {isDragging && (
                                <div className="drop-message">
                                    <Upload size={48} />
                                    <span>Drop images here to add them</span>
                                </div>
                            )}

                            <div className="gallery-grid">
                                {gallery.map((item) => (
                                    <div key={item.id} className="gallery-item">
                                        <img src={item.url} alt="Gallery item" />
                                        <button
                                            type="button"
                                            onClick={() => removeGalleryImage(item.id)}
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
                                        onChange={handleGalleryUpload}
                                        style={{ display: 'none' }}
                                    />
                                </label>
                            </div>
                            {!isDragging && (
                                <p className="form-help" style={{ textAlign: 'center', marginTop: '1rem' }}>
                                    Drag & drop images here, or click "Add Photos" to select multiple files.
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/dashboard')}
                            className="btn btn-secondary"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : (isEditMode ? 'Update Story' : 'Create Story')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StoryEditor;
