import { useWordListStore, type WordEntry } from '@/stores/schnapsidee/wordListStore'
import { useLanguageSettingsStore } from '@/stores/languageSettingsStore'

export function getRandomWord(): WordEntry | string {
    const wordListStore = useWordListStore()
    const languageSettingsStore = useLanguageSettingsStore()
 
    // Make sure store is initialized first
    if (!wordListStore.isInitialized) {
        console.warn('[getRandomWord] Word list store not initialized')
        return 'Loading...'
    }
 
    const language = languageSettingsStore.getLanguage()
    
    const wordEntry = wordListStore.getRandomWord(language)
 
    if (!wordEntry) {
      console.warn('[getRandomWord] No word found:', {
        language,
        wordList: wordListStore.wordLists[language],
      })
      return 'No matching words found 🤒'
    }
 
    return wordEntry
}

export function getWordListCategories(): string[] {
    // TODO: Don't hardcode this, but check the store for available categories
    return [
        'standard',
        'activity',
        'sport',
        'spicy',
    ]
 }