export const GROUP_OPTIONS = [
    { label: '1 person', value: '1' },
    { label: '2 people', value: '2' },
    { label: '3 people', value: '3' },
    { label: '4 people', value: '4' },
    { label: '5 people', value: '5' },
    { label: '6+ people', value: '6' },
];

export const BUDGET_VALUES = [500, 1000, 1500, 2000, 2500, 3000, 4000, 5000];

export const BUDGET_OPTIONS = BUDGET_VALUES.map(value => ({
    label: `Up to €${value.toLocaleString()}`,
    value: value.toString(),
}));

export const getGroupLabel = (value: string): string => {
    const num = parseInt(value);
    if (num === 6) return '6+ people';
    return `${num} ${num === 1 ? 'person' : 'people'}`;
};

export const getBudgetLabel = (value: string): string => {
    const num = parseInt(value);
    return `Up to €${num.toLocaleString()}`;
};

// Add this to your existing constants.ts file
export const EUROPEAN_COUNTRY_CODES = [
    // EU Countries
    'at', 'be', 'bg', 'hr', 'cy', 'cz', 'dk', 'ee', 'fi', 'fr', 'de', 'gr',
    'hu', 'ie', 'it', 'lv', 'lt', 'lu', 'mt', 'nl', 'pl', 'pt', 'ro', 'sk',
    'si', 'es', 'se',
    // Non-EU
    'ch', 'no', 'is', 'gb',
    // Balkan
    'al', 'ba', 'mk', 'me', 'rs', 'xk',
    // Additional
    'md', 'tr'
];