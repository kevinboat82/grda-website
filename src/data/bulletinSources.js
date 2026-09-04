/** Shared directorate & unit sources for bulletin attribution */

export const DIRECTORATE_SOURCES = [
    { id: 'pprme', name: 'Policy, Planning & Research', shortName: 'PPRME' },
    { id: 'projects', name: 'Projects Development', shortName: 'Projects' },
    { id: 'hr', name: 'Human Resource', shortName: 'HR' },
    { id: 'finance', name: 'Finance', shortName: 'Finance' },
    { id: 'estate', name: 'Revenue Mobilisation & Estate', shortName: 'Estate' },
    { id: 'regulations', name: 'Regulations & Licensing', shortName: 'Regulations' },
    { id: 'admin', name: 'Administration', shortName: 'Admin' },
    { id: 'business-dev', name: 'Strategic Initiatives & Business Development', shortName: 'Business Development' },
];

export const UNIT_SOURCES = [
    { id: 'hse', name: 'Health, Safety & Environment', shortName: 'HSE Unit' },
    { id: 'it', name: 'Information Technology', shortName: 'IT Unit' },
    { id: 'procurement', name: 'Procurement', shortName: 'Procurement' },
    { id: 'records', name: 'Records & Information', shortName: 'Records Unit' },
    { id: 'audit', name: 'Internal Audit', shortName: 'Audit Unit' },
];

export const SOURCE_TYPES = [
    { value: 'directorate', label: 'Directorate' },
    { value: 'unit', label: 'Unit' },
    { value: 'authority', label: 'GRDA Authority' },
];

export function getSourcesForType(sourceType) {
    if (sourceType === 'directorate') return DIRECTORATE_SOURCES;
    if (sourceType === 'unit') return UNIT_SOURCES;
    return [];
}

export function getSourceLabel(sourceType, sourceId, sourceName) {
    if (sourceType === 'authority') return 'GRDA Authority';
    if (sourceName) return sourceName;
    const list = getSourcesForType(sourceType);
    const found = list.find((s) => s.id === sourceId);
    return found?.name || 'GRDA';
}
