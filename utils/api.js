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
    const decks = await fetchDecks();

    delete decks[id];

    return AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(decks));
}