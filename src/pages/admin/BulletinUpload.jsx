import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, auth } from '../../firebase';
import { Upload, X, ArrowLeft, FileText, Plus } from 'lucide-react';
import {
    SOURCE_TYPES,
    getSourcesForType,
} from '../../data/bulletinSources';
import './Editor.css';

const titleFromFileName = (name) =>
    name.replace(/\.pdf$/i, '').replace(/[_-]+/g, ' ').trim();

const BulletinUpload = () => {
    const navigate = useNavigate();
    const [description, setDescription] = useState('');
    const [sourceType, setSourceType] = useState('directorate');
    const [sourceId, setSourceId] = useState('business-dev');
    const [publishedAt, setPublishedAt] = useState(
        new Date().toISOString().slice(0, 10)
    );
    const [files, setFiles] = useState([]); // { id, file, title }
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    const sources = getSourcesForType(sourceType);

    const handleSourceTypeChange = (type) => {
        setSourceType(type);
        setSourceId(type === 'directorate' ? 'business-dev' : '');
    };

    const addPdfFiles = (fileList) => {
        if (!fileList?.length) return;
        const pdfs = Array.from(fileList).filter(
            (f) =>
                f.type === 'application/pdf' ||
                f.name?.toLowerCase().endsWith('.pdf')
        );
        if (pdfs.length === 0) {
            alert('Please upload PDF files only. Convert Word documents to PDF first.');
            return;
        }
        if (pdfs.length < fileList.length) {
            alert('Some non-PDF files were skipped.');
        }
        const next = pdfs.map((file) => ({
            id: `${Date.now()}-${Math.random()}`,
            file,
            title: titleFromFileName(file.name),
        }));
        setFiles((prev) => [...prev, ...next]);
    };

    const updateFileTitle = (id, title) => {
        setFiles((prev) =>
            prev.map((item) => (item.id === id ? { ...item, title } : item))
        );
    };

    const removeFile = (id) => {
        setFiles((prev) => prev.filter((item) => item.id !== id));
    };

    const handleFileSelect = (e) => {
        addPdfFiles(e.target.files);
        e.target.value = '';
    };

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
        addPdfFiles(e.dataTransfer.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!auth.currentUser) {
            alert('You must be logged in to upload bulletins.');
            navigate('/admin/login');
            return;
        }

        if (sourceType !== 'authority' && !sourceId) {
            alert('Please select the directorate or unit this bulletin is from.');
            return;
        }

        if (files.length === 0) {
            alert('Please select at least one PDF file.');
            return;
        }

        const missingTitle = files.find((f) => !f.title.trim());
        if (missingTitle) {
            alert('Each bulletin needs a title.');
            return;
        }

        setUploading(true);
        try {
            const source = sources.find((s) => s.id === sourceId);
            const sourceName =
                sourceType === 'authority'
                    ? 'GRDA Authority'
                    : source?.name || '';

            let successCount = 0;
            for (let i = 0; i < files.length; i++) {
                const item = files[i];
                setProgress(`Uploading ${i + 1} of ${files.length}...`);

                const storageRef = ref(
                    storage,
                    `bulletins/${Date.now()}_${item.file.name}`
                );
                await uploadBytes(storageRef, item.file);
                const fileUrl = await getDownloadURL(storageRef);

                await addDoc(collection(db, 'bulletins'), {
                    title: item.title.trim(),
                    description: description.trim(),
                    sourceType,
                    sourceId: sourceType === 'authority' ? 'authority' : sourceId,
                    sourceName,
                    fileUrl,
                    fileName: item.file.name,
                    fileSize: item.file.size,
                    mimeType: item.file.type || 'application/pdf',
                    storagePath: storageRef.fullPath,
                    publishedAt: publishedAt || null,
                    createdAt: serverTimestamp(),
                    createdBy: auth.currentUser.email || null,
                });
                successCount++;
            }

            alert(
                successCount === 1
                    ? 'Bulletin uploaded successfully.'
                    : `${successCount} bulletins uploaded successfully.`
            );
            navigate('/admin/bulletins');
        } catch (error) {
            console.error('Error uploading bulletin:', error);
            alert(`Upload failed: ${error.message}`);
        } finally {
            setUploading(false);
            setProgress('');
        }
    };

    return (
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem' }}>
            <button
                type="button"
                onClick={() => navigate('/admin/bulletins')}
                className="back-btn"
                style={{
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#6b7280',
                }}
            >
                <ArrowLeft size={20} /> Back to Bulletins
            </button>

            <div
                style={{
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(0, 107, 63, 0.08)',
                }}
            >
                <h2
                    style={{
                        marginBottom: '0.5rem',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: 'var(--color-primary-dark)',
                    }}
                >
                    Upload Bulletin
                </h2>
                <p style={{ marginBottom: '1.5rem', color: '#6b7280', fontSize: '0.9rem' }}>
                    Upload one or more PDFs. Titles are taken from each file name — you can edit them before publishing.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontWeight: 600,
                                color: 'var(--color-primary-dark)',
                            }}
                        >
                            Issued by *
                        </label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                            {SOURCE_TYPES.map((t) => (
                                <button
                                    key={t.value}
                                    type="button"
                                    onClick={() => handleSourceTypeChange(t.value)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: '8px',
                                        border:
                                            sourceType === t.value
                                                ? '2px solid var(--color-primary)'
                                                : '1px solid rgba(0, 107, 63, 0.15)',
                                        background:
                                            sourceType === t.value
                                                ? 'var(--color-primary)'
                                                : 'white',
                                        color:
                                            sourceType === t.value
                                                ? '#FFD700'
                                                : '#374151',
                                        cursor: 'pointer',
                                        fontWeight: sourceType === t.value ? 600 : 400,
                                        fontSize: '0.85rem',
                                    }}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>

                        {sourceType !== 'authority' && (
                            <select
                                value={sourceId}
                                onChange={(e) => setSourceId(e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(0, 107, 63, 0.15)',
                                    background: 'white',
                                }}
                            >
                                <option value="">
                                    Select {sourceType === 'unit' ? 'unit' : 'directorate'}...
                                </option>
                                {sources.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontWeight: 600,
                                color: 'var(--color-primary-dark)',
                            }}
                        >
                            Issue date
                        </label>
                        <input
                            type="date"
                            value={publishedAt}
                            onChange={(e) => setPublishedAt(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: '8px',
                                border: '1px solid rgba(0, 107, 63, 0.15)',
                            }}
                        />
                    </div>

                    <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontWeight: 600,
                                color: 'var(--color-primary-dark)',
                            }}
                        >
                            Shared description (optional)
                        </label>
                        <textarea
                            className="form-input"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Applied to all selected PDFs"
                            rows={2}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: '8px',
                                border: '1px solid rgba(0, 107, 63, 0.15)',
                                resize: 'vertical',
                            }}
                        />
                    </div>

                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontWeight: 600,
                                color: 'var(--color-primary-dark)',
                            }}
                        >
                            PDF documents *
                        </label>
                        <div
                            className={`gallery-drop-zone ${isDragging ? 'active' : ''}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            style={{ minHeight: '180px', padding: '1.5rem' }}
                        >
                            {files.length > 0 && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                                    {files.map((item) => (
                                        <div
                                            key={item.id}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: '0.75rem',
                                                padding: '0.85rem',
                                                background: 'rgba(0, 107, 63, 0.05)',
                                                borderRadius: '8px',
                                            }}
                                        >
                                            <FileText size={24} color="var(--color-primary)" style={{ marginTop: '0.35rem', flexShrink: 0 }} />
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <input
                                                    type="text"
                                                    value={item.title}
                                                    onChange={(e) => updateFileTitle(item.id, e.target.value)}
                                                    style={{
                                                        width: '100%',
                                                        padding: '0.4rem 0.5rem',
                                                        borderRadius: '6px',
                                                        border: '1px solid rgba(0, 107, 63, 0.2)',
                                                        fontWeight: 600,
                                                        marginBottom: '0.25rem',
                                                    }}
                                                />
                                                <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                                                    {item.file.name} · {(item.file.size / 1024).toFixed(1)} KB
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeFile(item.id)}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    color: '#ef4444',
                                                    flexShrink: 0,
                                                }}
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <label
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    cursor: 'pointer',
                                    color: '#9ca3af',
                                    textAlign: 'center',
                                    minHeight: files.length ? '80px' : '140px',
                                    border: files.length ? '1px dashed rgba(0, 107, 63, 0.25)' : 'none',
                                    borderRadius: '8px',
                                    padding: '1rem',
                                }}
                            >
                                {files.length ? <Plus size={28} /> : <Upload size={40} />}
                                <span>
                                    {files.length
                                        ? 'Add more PDFs'
                                        : 'Drag & drop PDFs here (or click to browse)'}
                                </span>
                                <span style={{ fontSize: '0.85rem' }}>
                                    You can select multiple files at once
                                </span>
                                <input
                                    type="file"
                                    accept=".pdf,application/pdf"
                                    multiple
                                    onChange={handleFileSelect}
                                    style={{ display: 'none' }}
                                />
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={uploading || files.length === 0}
                        style={{
                            width: '100%',
                            padding: '0.875rem',
                            background:
                                uploading || files.length === 0
                                    ? '#d1d5db'
                                    : 'linear-gradient(135deg, #FFD700, #FDB913)',
                            color:
                                uploading || files.length === 0
                                    ? '#9ca3af'
                                    : '#003d23',
                            border: 'none',
                            borderRadius: '8px',
                            cursor:
                                uploading || files.length === 0
                                    ? 'not-allowed'
                                    : 'pointer',
                            fontWeight: 700,
                            fontSize: '1rem',
                            boxShadow:
                                uploading || files.length === 0
                                    ? 'none'
                                    : '0 4px 15px rgba(255, 215, 0, 0.3)',
                        }}
                    >
                        {uploading
                            ? progress || 'Uploading...'
                            : files.length <= 1
                                ? 'Publish Bulletin'
                                : `Publish ${files.length} Bulletins`}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BulletinUpload;
