import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert
} from 'react-native'
import Modal from 'react-native-modal'
import * as Haptics from 'expo-haptics'
import { X, Check } from 'lucide-react-native'

type ToneCreationModalProps = {
  visible: boolean
  onClose: () => void
  onSave: (tone: { id: string; label: string; emoji: string; desc: string }) => void
}

const EMOJI_OPTIONS = [
  '🔥', '💎', '🌟', '⚡', '💪', '🎯',
  '🎨', '🎭', '🎪', '🎬', '🎸', '🎤',
  '🌈', '☀️', '🌙', '⭐', '💫', '✨',
  '🦄', '🦋', '🐝', '🦁', '🐯', '🐺',
  '🍕', '🍔', '🌮', '🍜', '☕', '🍰',
  '🎮', '🎲', '🎰', '🏆', '👑', '💰',
  '🚀', '🛸', '🌊', '🏔️', '🗿', '🔮',
  '💖', '💜', '🧡', '💛', '💚', '💙'
]

export const ToneCreationModal: React.FC<ToneCreationModalProps> = ({
  visible,
  onClose,
  onSave
}) => {
  const [selectedEmoji, setSelectedEmoji] = useState('✨')
  const [toneName, setToneName] = useState('')
  const [toneDescription, setToneDescription] = useState('')

  const handleReset = () => {
    setSelectedEmoji('✨')
    setToneName('')
    setToneDescription('')
  }

  const handleClose = () => {
    handleReset()
    onClose()
  }

  const handleSave = () => {
    if (!toneName.trim()) {
      Alert.alert('Missing Name', 'Please enter a name for your tone.')
      return
    }

    if (!toneDescription.trim()) {
      Alert.alert('Missing Description', 'Please enter a description for your tone.')
      return
    }

    const toneId = `custom_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

    onSave({
      id: toneId,
      label: toneName.trim(),
      emoji: selectedEmoji,
      desc: toneDescription.trim()
    })

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    handleReset()
    onClose()
  }

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={handleClose}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.4}>
      <View style={styles.modalContent}>
        <View style={styles.dragHandle} />

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Create Custom Tone</Text>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <X size={24} color="#64748b" strokeWidth={2.5} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Choose Emoji</Text>
            <View style={styles.selectedEmojiContainer}>
              <Text style={styles.selectedEmoji}>{selectedEmoji}</Text>
            </View>
            <View style={styles.emojiGrid}>
              {EMOJI_OPTIONS.map(emoji => (
                <TouchableOpacity
                  key={emoji}
                  onPress={() => {
                    setSelectedEmoji(emoji)
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                  }}
                  style={[
                    styles.emojiButton,
                    selectedEmoji === emoji && styles.emojiButtonActive
                  ]}>
                  <Text style={styles.emojiText}>{emoji}</Text>
                  {selectedEmoji === emoji && (
                    <View style={styles.checkmark}>
                      <Check size={12} color="#6366f1" strokeWidth={3} />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Tone Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Mysterious, Cheerful, Zen"
              placeholderTextColor="#94a3b8"
              value={toneName}
              onChangeText={setToneName}
              maxLength={20}
              autoCapitalize="words"
            />
            <Text style={styles.charCount}>{toneName.length}/20</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Description</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Keep them guessing"
              placeholderTextColor="#94a3b8"
              value={toneDescription}
              onChangeText={setToneDescription}
              maxLength={30}
              autoCapitalize="sentences"
            />
            <Text style={styles.charCount}>{toneDescription.length}/30</Text>
          </View>
        </ScrollView>

        <View style={styles.actions}>
          <TouchableOpacity onPress={handleClose} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveText}>Create Tone</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    maxHeight: '90%'
  },
  dragHandle: {
    width: 48,
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 16
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1e293b'
  },
  closeButton: {
    padding: 4
  },
  scrollView: {
    maxHeight: 450
  },
  scrollContent: {
    paddingBottom: 16
  },
  section: {
    marginBottom: 24
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 12
  },
  selectedEmojiContainer: {
    alignSelf: 'center',
    width: 80,
    height: 80,
    backgroundColor: '#f8fafc',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#6366f1',
    marginBottom: 16
  },
  selectedEmoji: {
    fontSize: 40
  },
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  emojiButton: {
    width: 48,
    height: 48,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#e2e8f0',
    position: 'relative'
  },
  emojiButtonActive: {
    backgroundColor: '#eef2ff',
    borderColor: '#6366f1',
    transform: [{ scale: 1.05 }]
  },
  emojiText: {
    fontSize: 24
  },
  checkmark: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 16,
    height: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#6366f1'
  },
  input: {
    backgroundColor: '#f8fafc',
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '600'
  },
  charCount: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'right',
    marginTop: 4,
    fontWeight: '500'
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#64748b'
  },
  saveButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4
  },
  saveText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white'
  }
})
