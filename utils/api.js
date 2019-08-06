import { AsyncStorage } from 'react-native'

export const FLASHCARD_STORAGE_KEY = 'Udacity:FlashCards'

export async function fetchDecks() {
    // await AsyncStorage.clear();
    return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
        .then(results => {
            console.log('Fetching data.........', JSON.parse(results))

            const data = JSON.parse(results);

            return data;
        })
}

export async function submitDeck(deck) {
    return AsyncStorage.mergeItem(
        FLASHCARD_STORAGE_KEY,
        JSON.stringify({ [deck.id]: deck })
    );
}

export async function removeDeck(id) {
    return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results);
            data[id] = undefined;
            delete data[id];
            AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data));
            return id;
        })
        .then(idDeleted => { return idDeleted });
}

export const saveCard = (deckId, card) => {
    return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY).then(results => {
        const data = JSON.parse(results);

        // Add card to existing deck data.
        data[deckId] = {
            ...data[deckId],
            cards: [
                ...data[deckId].cards,
                { question: card.question, answer: card.answer }
            ]
        };

        // Save updated deck data back to storage
        AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data));
    });
};