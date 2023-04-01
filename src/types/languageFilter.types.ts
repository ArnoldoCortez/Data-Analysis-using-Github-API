import type { languageFilter } from '../constants/languageFilter.constants'

export type LanguageFilter = (typeof languageFilter)[keyof typeof languageFilter]
