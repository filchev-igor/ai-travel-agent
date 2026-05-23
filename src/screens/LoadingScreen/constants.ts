export const LOADING_LABELS = [
    'Searching flights...',
    'Finding accommodation...',
    'Checking activities...',
    'Combining journey variants...',
];

export const getGroupDisplay = (group: string): string => {
    const num = parseInt(group);
    return `${num} ${num === 1 ? 'person' : 'people'}`;
};

export const formatDate = (dateStr: string): string => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};