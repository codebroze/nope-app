import React, { useEffect, useState } from 'react'
import { View, ScrollView, Alert, Share } from 'react-native'
import * as Clipboard from 'expo-clipboard'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import Constants from 'expo-constants'

import { appStyles } from './src/styles/appStyles'
import { HeaderBar } from './src/components/HeaderBar'
import { RequestSection } from './src/components/RequestSection'
import { ToneGrid } from './src/components/ToneGrid'
import { GenerateButton } from './src/components/GenerateButton'
import { ResultModal } from './src/components/ResultModal'
import { AccountSheet } from './src/components/AccountSheet'
import { ToneCreationModal } from './src/components/ToneCreationModal'
import { TONES, RESPONSES, Tone } from './src/constants/data'
import {
  OPENROUTER_API_KEY,
  OPENROUTER_MODEL,
  PRIVACY_URL,
  TERMS_URL
} from './src/constants/config'
import {
  loadCustomTones,
  saveCustomTone,
  deleteCustomTone,
  loadPremiumStatus,
  savePremiumStatus
} from './src/utils/customTones'

const App: React.FC = () => {
  const [context, setContext] = useState('')
  const [selectedTone, setSelectedTone] = useState('sarcastic')
  const [toneUsed, setToneUsed] = useState('sarcastic')
  const [result, setResult] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)
  const [showResultSheet, setShowResultSheet] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showAccountSheet, setShowAccountSheet] = useState(false)
  const [inputError, setInputError] = useState(false)
  const [customTones, setCustomTones] = useState<Tone[]>([])
  const [isPremium, setIsPremium] = useState(false)
  const [showToneCreationModal, setShowToneCreationModal] = useState(false)

  const MIN_INPUT_CHARS = 12

  const appVersion =
    Constants.expoConfig?.version || Constants.manifest?.version || '1.0.0'

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const [loadedCustomTones, loadedPremiumStatus] = await Promise.all([
          loadCustomTones(),
          loadPremiumStatus()
        ])
        setCustomTones(loadedCustomTones)
        setIsPremium(loadedPremiumStatus)
      } catch (error) {
        console.error('Failed to initialize app:', error)
      }
    }

    initializeApp()

    // Only auto-generate when there is starter text that meets the minimum.
    if (context.trim().length >= MIN_INPUT_CHARS) {
      generateResponse(false).catch(error => {
        console.error('Failed to generate initial response', error)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCopy = async () => {
    try {
      await Clipboard.setStringAsync(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      Alert.alert('Error', 'Failed to copy to clipboard')
    }
  }

  const handleShare = async () => {
    try {
      await Share.share({
        message: result
      })
    } catch (error) {
      console.log('Share canceled')
    }
  }

  const handleUpgrade = async () => {
    Alert.alert(
      'Premium coming soon',
      'We will notify you when premium perks are ready.'
    )
  }

  const handleTogglePremium = async (newStatus: boolean) => {
    try {
      await savePremiumStatus(newStatus)
      setIsPremium(newStatus)
    } catch (error) {
      Alert.alert('Error', 'Failed to update premium status')
    }
  }

  const handleCreateTone = () => {
    if (!isPremium) {
      Alert.alert(
        'Premium Feature',
        'Custom tones are a premium feature. Upgrade to create your own tones!',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Upgrade', onPress: handleUpgrade }
        ]
      )
      return
    }
    setShowToneCreationModal(true)
  }

  const handleSaveCustomTone = async (tone: {
    id: string
    label: string
    emoji: string
    desc: string
  }) => {
    try {
      await saveCustomTone(tone)
      const updatedTones = await loadCustomTones()
      setCustomTones(updatedTones)
      Alert.alert('Success', `"${tone.label}" tone created!`)
    } catch (error) {
      Alert.alert('Error', 'Failed to save custom tone')
    }
  }

  const handleDeleteCustomTone = async (toneId: string) => {
    try {
      await deleteCustomTone(toneId)
      const updatedTones = await loadCustomTones()
      setCustomTones(updatedTones)

      if (selectedTone === toneId) {
        setSelectedTone('sarcastic')
        setToneUsed('sarcastic')
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to delete custom tone')
    }
  }

  const hasMinInput = context.trim().length >= MIN_INPUT_CHARS

  const generateResponse = async (showSheet = true) => {
    if (!hasMinInput) {
      setInputError(true)
      return
    }

    setIsAnimating(true)
    setCopied(false)
    setInputError(false)

    const allTones = [...TONES, ...customTones]
    const tonePool = allTones.filter(t => t.id !== 'random')
    const resolvedToneId =
      selectedTone === 'random'
        ? tonePool[Math.floor(Math.random() * tonePool.length)]?.id ||
          'sarcastic'
        : selectedTone

    setToneUsed(resolvedToneId)

    const toneMeta = allTones.find(t => t.id === resolvedToneId)
    const fallbackOptions =
      RESPONSES[resolvedToneId] || RESPONSES.sarcastic
    const toneExamples = fallbackOptions
      .slice(0, 4)
      .map(example => `- ${example}`)
      .join('\n')

    const buildPrompt = () => {
      const incoming = context?.trim()
        ? context.trim()
        : 'No incoming request provided.'

      return (
        `Tone: "${toneMeta?.label ?? selectedTone}" (${
          toneMeta?.emoji ?? '✨'
        })\n` +
        `Style examples:\n${toneExamples}\n` +
        'Craft one concise decline in this tone. Keep it under 24 words. Stay playful but clear. Avoid emoji unless natural. Do not add extra quotes.\n' +
        `Incoming request: ${incoming}`
      )
    }

    const useFallback = () => {
      const randomChoice =
        fallbackOptions[Math.floor(Math.random() * fallbackOptions.length)]
      setResult(randomChoice)
    }

    if (!OPENROUTER_API_KEY) {
      console.warn(
        'Missing EXPO_PUBLIC_OPENROUTER_API_KEY; using local responses.'
      )
      useFallback()
      setIsAnimating(false)
      if (showSheet) setShowResultSheet(true)
      return
    }

    try {
      const response = await fetch(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
            'HTTP-Referer': 'http://localhost',
            'X-Title': 'Nopeify'
          },
          body: JSON.stringify({
            model: OPENROUTER_MODEL,
            messages: [
              {
                role: 'system',
                content:
                  'You craft brief, witty declines to requests. Keep replies short, human, and on-tone.'
              },
              {
                role: 'user',
                content: buildPrompt()
              }
            ],
            max_tokens: 90,
            temperature: 0.8,
            top_p: 0.9
          })
        }
      )

      if (!response.ok) {
        throw new Error(`OpenRouter request failed: ${response.status}`)
      }

      const data = await response.json()
      const content =
        data?.choices?.[0]?.message?.content?.trim().replace(/^"|"$/g, '') ||
        null

      if (!content) {
        throw new Error('No content returned from OpenRouter')
      }

      setResult(content)
    } catch (error) {
      console.error('Error fetching from OpenRouter', error)
      Alert.alert(
        'Generation issue',
        'Using a built-in response while we retry later.'
      )
      useFallback()
    } finally {
      setIsAnimating(false)
      if (showSheet) setShowResultSheet(true)
    }
  }

  return (
    <View style={appStyles.container}>
      <StatusBar style="dark" />

      <LinearGradient
        colors={['#e0e7ff', '#f8fafc']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.4 }}
        style={appStyles.backgroundGradient}
      />

      <HeaderBar onPressAccount={() => setShowAccountSheet(true)} />

      <ScrollView
        style={appStyles.scrollView}
        contentContainerStyle={appStyles.scrollContent}>
        <RequestSection
          context={context}
          onChange={value => {
            setContext(value)
            if (value.trim().length >= MIN_INPUT_CHARS && inputError) {
              setInputError(false)
            }
          }}
          inputError={inputError}
          minChars={MIN_INPUT_CHARS}
        />
        <ToneGrid
          selectedTone={selectedTone}
          onSelectTone={tone => {
            setSelectedTone(tone)
            if (tone !== 'random') {
              setToneUsed(tone)
            }
          }}
          customTones={customTones}
          onCreateTone={handleCreateTone}
          onDeleteTone={handleDeleteCustomTone}
          isPremium={isPremium}
        />
      </ScrollView>

      <View style={appStyles.bottomAction}>
        <GenerateButton
          onPress={() => generateResponse(true)}
          disabled={isAnimating}
          loading={isAnimating}
        />
      </View>

      <AccountSheet
        visible={showAccountSheet}
        onClose={() => setShowAccountSheet(false)}
        onUpgrade={handleUpgrade}
        appVersion={appVersion}
        privacyUrl={PRIVACY_URL}
        termsUrl={TERMS_URL}
        isPremium={isPremium}
        onTogglePremium={handleTogglePremium}
      />

      <ResultModal
        visible={showResultSheet}
        result={result}
        selectedTone={toneUsed}
        onCopy={handleCopy}
        copied={copied}
        onShare={handleShare}
        onGenerateAnother={() => generateResponse(true)}
        onClose={() => {
          setShowResultSheet(false)
          setContext('')
        }}
      />

      <ToneCreationModal
        visible={showToneCreationModal}
        onClose={() => setShowToneCreationModal(false)}
        onSave={handleSaveCustomTone}
      />
    </View>
  )
}

export default App
