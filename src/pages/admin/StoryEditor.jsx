import React, { useState, useEffect } from 'react';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { Upload, X, ArrowLeft, Tag } from 'lucide-react';
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
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [existingImageUrl, setExistingImageUrl] = useState('');
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
                        setExistingImageUrl(data.image || '');
                        setImagePreview(data.image || null);
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

            // Upload new image if selected
            if (image) {
                const storageRef = ref(storage, `hero-stories/${Date.now()}_${image.name}`);
                await uploadBytes(storageRef, image);
                imageUrl = await getDownloadURL(storageRef);
            }

            const storyData = {
                title,
                description,
                content,
                category,
                link,
                linkText,
                image: imageUrl,
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
