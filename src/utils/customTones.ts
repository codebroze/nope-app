import AsyncStorage from '@react-native-async-storage/async-storage'
import { Tone } from '../constants/data'

const CUSTOM_TONES_KEY = '@nope_custom_tones'
const PREMIUM_STATUS_KEY = '@nope_premium_status'

export type CustomTone = Omit<Tone, 'color' | 'textColor' | 'borderColor'> & {
  isCustom: true
  createdAt: number
}

const CUSTOM_TONE_COLORS = [
  { color: '#dbeafe', textColor: '#1e40af', borderColor: '#bfdbfe' },
  { color: '#f3e8ff', textColor: '#7c3aed', borderColor: '#e9d5ff' },
  { color: '#fef3c7', textColor: '#d97706', borderColor: '#fde68a' },
  { color: '#dcfce7', textColor: '#16a34a', borderColor: '#bbf7d0' },
  { color: '#ffe4e6', textColor: '#e11d48', borderColor: '#fecdd3' },
  { color: '#e0f2fe', textColor: '#0369a1', borderColor: '#bae6fd' }
]

export const getCustomToneColors = (index: number) => {
  return CUSTOM_TONE_COLORS[index % CUSTOM_TONE_COLORS.length]
}

export const loadCustomTones = async (): Promise<Tone[]> => {
  try {
    const data = await AsyncStorage.getItem(CUSTOM_TONES_KEY)
    if (!data) return []

    const customTones: CustomTone[] = JSON.parse(data)
    return customTones.map((tone, index) => ({
      ...tone,
      ...getCustomToneColors(index)
    }))
  } catch (error) {
    console.error('Failed to load custom tones:', error)
    return []
  }
}

export const saveCustomTone = async (tone: Omit<CustomTone, 'createdAt' | 'isCustom'>): Promise<void> => {
  try {
    const existingTones = await loadCustomTones()
    const customTone: CustomTone = {
      ...tone,
      isCustom: true,
      createdAt: Date.now()
    }

    const updatedTones = [...existingTones.map(t => ({
      id: t.id,
      label: t.label,
      emoji: t.emoji,
      desc: t.desc,
      isCustom: true as const,
      createdAt: Date.now()
    })), customTone]

    await AsyncStorage.setItem(CUSTOM_TONES_KEY, JSON.stringify(updatedTones))
  } catch (error) {
    console.error('Failed to save custom tone:', error)
    throw error
  }
}

export const deleteCustomTone = async (toneId: string): Promise<void> => {
  try {
    const existingTones = await loadCustomTones()
    const updatedTones = existingTones.filter(t => t.id !== toneId)

    await AsyncStorage.setItem(CUSTOM_TONES_KEY, JSON.stringify(updatedTones.map(t => ({
      id: t.id,
      label: t.label,
      emoji: t.emoji,
      desc: t.desc,
      isCustom: true as const,
      createdAt: Date.now()
    }))))
  } catch (error) {
    console.error('Failed to delete custom tone:', error)
    throw error
  }
}

export const loadPremiumStatus = async (): Promise<boolean> => {
  try {
    const status = await AsyncStorage.getItem(PREMIUM_STATUS_KEY)
    return status === 'true'
  } catch (error) {
    console.error('Failed to load premium status:', error)
    return false
  }
}

export const savePremiumStatus = async (isPremium: boolean): Promise<void> => {
  try {
    await AsyncStorage.setItem(PREMIUM_STATUS_KEY, isPremium.toString())
  } catch (error) {
    console.error('Failed to save premium status:', error)
    throw error
  }
}
