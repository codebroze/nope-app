import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Vibration,
  Clipboard,
  Share,
  Alert,
  Image
} from 'react-native'
import Modal from 'react-native-modal'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'

const { width, height } = Dimensions.get('window')

// --- DATA ---
const TONES = [
  {
    id: 'sarcastic',
    label: 'Spicy',
    emoji: '🌶️',
    color: '#fef3c7',
    textColor: '#d97706',
    borderColor: '#fde68a',
    desc: "Don't ask again"
  },
  {
    id: 'petty',
    label: 'Petty',
    emoji: '💅',
    color: '#fed7aa',
    textColor: '#ea580c',
    borderColor: '#fdba74',
    desc: 'Bless your heart'
  },
  {
    id: 'genz',
    label: 'Gen Z',
    emoji: '📱',
    color: '#e9d5ff',
    textColor: '#9333ea',
    borderColor: '#d8b4fe',
    desc: "It's a flop"
  },
  {
    id: 'dramatic',
    label: 'Drama',
    emoji: '✨',
    color: '#fce7f3',
    textColor: '#c026d3',
    borderColor: '#f3e8ff',
    desc: 'The audacity!'
  },
  {
    id: 'oldenglish',
    label: 'Victorian',
    emoji: '🎩',
    color: '#fef3c7',
    textColor: '#92400e',
    borderColor: '#fde68a',
    desc: 'Good day sir'
  },
  {
    id: 'ghost',
    label: 'Ghost',
    emoji: '👻',
    color: '#f3f4f6',
    textColor: '#4b5563',
    borderColor: '#e5e7eb',
    desc: '*Silence*'
  }
]

const RESPONSES = {
  sarcastic: [
    'I plan on staring at a blank wall that day. Sounds more fun.',
    'My horoscope said to avoid bad ideas today.',
    "I would, but I don't want to.",
    "Let me check my schedule... Yep, says 'No' all day."
  ],
  petty: [
    'I love that confidence for you, but absolutely not.',
    'Oh, honey. No.',
    "Funny how you thought I'd say yes.",
    "I'd love to help, but I don't want to lie to you.",
    'Bless your heart for asking.'
  ],
  genz: [
    'Bestie, absolutely not. 💀',
    "It's giving rejection.",
    'Naur.',
    'I fear that is a flop. Left on read.',
    'Respectfully? No.'
  ],
  dramatic: [
    "You ask this of me? On the day of my cat's half-birthday?!",
    'My spirit weeps at the very thought!',
    'Heavens no! The stars have aligned against us!',
    'I would rather walk on Legos in the dark!'
  ],
  oldenglish: [
    'I bid thee a firm farewell on this matter.',
    'Nay, sir! A thousand times, nay!',
    'I find myself disinclined to acquiesce.',
    'Good day. I said, GOOD DAY.'
  ],
  ghost: [
    '...',
    '*Read 12:45 PM*',
    'who is this?',
    'Error 404: Interest not found.'
  ]
}

export default function App() {
  const [context, setContext] = useState('')
  const [selectedTone, setSelectedTone] = useState('sarcastic')
  const [result, setResult] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)
  const [showResultSheet, setShowResultSheet] = useState(false)
  const [copied, setCopied] = useState(false)

  // Generate initial response
  useEffect(() => {
    generateResponse(false)
  }, [])

  const generateResponse = (showSheet = true) => {
    setIsAnimating(true)
    setCopied(false)

    setTimeout(() => {
      const options = RESPONSES[selectedTone]
      const randomChoice = options[Math.floor(Math.random() * options.length)]
      setResult(randomChoice)
      setIsAnimating(false)
      if (showSheet) setShowResultSheet(true)
    }, 500)
  }

  const handleCopy = async () => {
    try {
      await Clipboard.setString(result)
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

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Background Gradient */}
      <LinearGradient
        colors={['#e0e7ff', '#f8fafc']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.4 }}
        style={styles.backgroundGradient}
      />

      {/* --- HEADER --- */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require('./assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Nopeify</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-circle-outline" size={32} color="#4715dd" />
        </TouchableOpacity>
      </View>

      {/* --- SCROLLABLE CONTENT --- */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}>
        {/* Section: Incoming Request */}
        <View style={styles.section}>
          <View style={styles.label}>
            <Ionicons name="chatbubble-outline" size={16} color="#6366f1" />
            <Text style={styles.labelText}>Incoming Request</Text>
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              value={context}
              onChangeText={setContext}
              placeholder="What are they asking? (e.g. Can you work Saturday?)"
              placeholderTextColor="#94a3b8"
              style={styles.textInput}
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        {/* Section: Tone Cards */}
        <View style={styles.section}>
          <View style={styles.label}>
            <Ionicons name="volume-high-outline" size={16} color="#6366f1" />
            <Text style={styles.labelText}>Choose your tone</Text>
          </View>
          <View style={styles.grid}>
            {TONES.map(tone => {
              const isActive = selectedTone === tone.id
              return (
                <TouchableOpacity
                  key={tone.id}
                  onPress={() => {
                    setSelectedTone(tone.id)
                    Vibration.vibrate(10)
                  }}
                  style={[
                    styles.toneButton,
                    isActive && {
                      backgroundColor: tone.color,
                      borderColor: tone.borderColor,
                      transform: [{ scale: 1.02 }]
                    },
                    !isActive && {
                      backgroundColor: 'white',
                      borderColor: '#e2e8f0'
                    }
                  ]}>
                  <View style={styles.toneTop}>
                    <Text style={styles.toneEmoji}>{tone.emoji}</Text>
                    {isActive && (
                      <View
                        style={[
                          styles.activeDot,
                          { backgroundColor: tone.textColor }
                        ]}
                      />
                    )}
                  </View>
                  <View>
                    <Text
                      style={[
                        styles.toneLabel,
                        isActive && { color: tone.textColor }
                      ]}>
                      {tone.label}
                    </Text>
                    <Text
                      style={[
                        styles.toneDesc,
                        isActive && { color: tone.textColor, opacity: 0.7 }
                      ]}>
                      {tone.desc}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
      </ScrollView>

      {/* --- BOTTOM FLOATING ACTION --- */}
      <View style={styles.bottomAction}>
        <TouchableOpacity
          onPress={() => generateResponse(true)}
          disabled={isAnimating}
          activeOpacity={0.8}>
          <LinearGradient
            colors={['#4715dd', '#7c3aed']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.generateButton, isAnimating && { opacity: 0.7 }]}>
            {isAnimating ? (
              <Ionicons
                name="refresh"
                size={24}
                color="white"
                style={{ transform: [{ rotate: '45deg' }] }}
              />
            ) : (
              <>
                <Text style={styles.generateText}>Generate</Text>
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* --- RESULT SHEET (Modal) --- */}
      <Modal
        isVisible={showResultSheet}
        onBackdropPress={() => setShowResultSheet(false)}
        style={styles.modal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.4}>
        <View style={styles.modalContent}>
          {/* Drag Handle */}
          <View style={styles.dragHandle} />

          {/* Result Content */}
          <View style={styles.resultContainer}>
            <View style={styles.resultIcon}>
              <Text style={styles.resultEmoji}>
                {TONES.find(t => t.id === selectedTone)?.emoji || '✨'}
              </Text>
            </View>

            <Text style={styles.resultText}>"{result}"</Text>

            <Text style={styles.resultTone}>
              Tone: {TONES.find(t => t.id === selectedTone)?.label}
            </Text>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity
              onPress={handleCopy}
              style={[
                styles.actionButton,
                copied && { backgroundColor: '#d1fae5', borderColor: '#a7f3d0' }
              ]}>
              <Text style={[styles.actionText, copied && { color: '#065f46' }]}>
                {copied ? 'Copied!' : 'Copy Text'}
              </Text>
              {!copied && <Ionicons name="copy" size={16} color="#374151" />}
            </TouchableOpacity>

            <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
              <Text style={styles.shareText}>Share</Text>
              <Ionicons name="share" size={16} color="white" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => generateResponse(true)}
            style={styles.tryAnother}>
            <Ionicons name="refresh" size={16} color="#6b7280" />
            <Text style={styles.tryAnotherText}>Try another</Text>
          </TouchableOpacity>

          {/* Close Area */}
          <TouchableOpacity
            onPress={() => setShowResultSheet(false)}
            style={styles.closeButton}>
            <Ionicons name="chevron-down" size={24} color="#d1d5db" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc'
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 20
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 8
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: '#4715dd'
  },
  profileButton: {
    padding: 4
  },
  scrollView: {
    flex: 1
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    paddingBottom: 128
  },
  section: {
    marginBottom: 32
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16
  },
  labelText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 1.5
  },
  textInputContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  textInput: {
    fontSize: 16,
    color: '#334155',
    textAlignVertical: 'top',
    minHeight: 60
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  },
  toneButton: {
    width: (width - 40 - 12) / 2,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  toneTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  toneEmoji: {
    fontSize: 28
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'currentColor'
  },
  toneLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155'
  },
  toneDesc: {
    fontSize: 12,
    color: '#64748b',
    lineHeight: 16
  },
  bottomAction: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20
  },
  generateButton: {
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#4715dd',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8
  },
  generateText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700'
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    maxHeight: height * 0.85
  },
  dragHandle: {
    width: 48,
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 24
  },
  resultContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 48
  },
  resultIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#e0e7ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16
  },
  resultEmoji: {
    fontSize: 28
  },
  resultText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 8
  },
  resultTone: {
    fontSize: 14,
    color: '#94a3b8',
    fontWeight: '500'
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  },
  actionText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151'
  },
  shareButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#6366f1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4
  },
  shareText: {
    fontSize: 14,
    fontWeight: '700',
    color: 'white'
  },
  tryAnother: {
    alignItems: 'center',
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8
  },
  tryAnotherText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '600'
  },
  closeButton: {
    alignSelf: 'center',
    padding: 8,
    marginTop: 8
  }
})
