// from: https://stackoverflow.com/a/25677072
const REGEXP = /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/;

export default function validateCityName(value) {
    if (REGEXP.test(value)) {
        return null;
    }

    return 'Invalid city name';
}
