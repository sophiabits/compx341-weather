import { RESTDB_KEY } from '../config';
import { useEffect, useState } from 'react';

const db = new global.restdb(RESTDB_KEY);
export default function useDb() {
    const [data, setData] = useState([]);
    useEffect(() => {
        db.searches.find({}, (error, searches) => {
            if (error) {
                console.error('Error fetching past searches from RestDB:', error);
            } else {
                setData(searches.map((search) => search.value));
            }
        });
    }, []);

    // Tries to add a search to the database, and also adds the search to the
    // local store of past searches. This is a no-op if the given value has
    // already been seen.
    const push = (value) => {
        if (!data.includes(value)) {
            console.log(data);
            setData([...data, value]);

            // Don't worry about retrying the insert or reporting errors
            const doc = new db.searches({ value });
            doc.save();
        }
    };

    return [data, push];
}
