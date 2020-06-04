import validateCityName from './validateCityName';

it('validateCityName: fails invalid city names', () => {
    const cases = [
        'A----B',
        '------',
        '*******',
        '&&',
        '()',
        '//',
        '\\\\',
    ];

    cases.forEach((value) => {
        expect(validateCityName(value)).toBe('Invalid city name');
    });
});

it('validateCityName: succeeds on valid city names', () => {
    const cases = [
        'Toronto',
        'St. Catharines',
        'San Fransisco',
        'Val-d\'Or',
        'Presqu\'ile',
        'Niagara on the Lake',
        'Niagara-on-the-Lake',
        'München',
        'toronto',
        'toRonTo',
        'villes du Québec',
        'Provence-Alpes-Côte d\'Azur',
        'Île-de-France',
        'Kópavogur',
        'Garðabær',
        'Sauðárkrókur',
        'Þorlákshöfn',
    ];

    cases.forEach((value) => {
        expect(validateCityName(value)).toBe(null);
    });
});
