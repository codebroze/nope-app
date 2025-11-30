import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert
} from 'react-native'
import * as Haptics from 'expo-haptics'
import { AudioLines, Plus, Trash2 } from 'lucide-react-native'
import { TONES, Tone } from '../constants/data'

type ToneGridProps = {
  selectedTone: string
  onSelectTone: (toneId: string) => void
  customTones?: Tone[]
  onCreateTone?: () => void
  onDeleteTone?: (toneId: string) => void
  isPremium?: boolean
}

const { width } = Dimensions.get('window')

export const ToneGrid: React.FC<ToneGridProps> = ({
  selectedTone,
  onSelectTone,
  customTones = [],
  onCreateTone,
  onDeleteTone,
  isPremium = false
}) => {
  const allTones = [...TONES, ...customTones]

  const handleDeleteTone = (toneId: string, toneLabel: string) => {
    Alert.alert(
      'Delete Custom Tone',
      `Are you sure you want to delete "${toneLabel}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            onDeleteTone?.(toneId)
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
          }
        }
      ]
    )
  }

  const isCustomTone = (toneId: string) => {
    return customTones.some(t => t.id === toneId)
  }

  return (
    <View style={styles.section}>
      <View style={styles.label}>
        <AudioLines size={16} color="#6366f1" strokeWidth={2.5} />
        <Text style={styles.labelText}>Choose your tone</Text>
        {isPremium && customTones.length > 0 && (
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumBadgeText}>
              {customTones.length} custom
            </Text>
          </View>
        )}
      </View>
      <View style={styles.grid}>
        {allTones.map((tone: Tone) => {
          const isActive = selectedTone === tone.id
          const isCustom = isCustomTone(tone.id)
          return (
            <TouchableOpacity
              key={tone.id}
              onPress={() => {
                onSelectTone(tone.id)
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
              }}
              onLongPress={() => {
                if (isCustom && onDeleteTone) {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
                  handleDeleteTone(tone.id, tone.label)
                }
              }}
              delayLongPress={500}
              style={[
                styles.toneButton,
                isActive && {
                  backgroundColor: 'white',
                  borderColor: '#6366f1',
                  borderWidth: 3,
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
                    style={[styles.activeDot, { backgroundColor: '#6366f1' }]}
                  />
                )}
                {isCustom && !isActive && (
                  <View style={styles.customIndicator}>
                    <Trash2 size={10} color="#94a3b8" strokeWidth={2.5} />
                  </View>
                )}
              </View>
              <View>
                <Text style={styles.toneLabel}>{tone.label}</Text>
                <Text style={styles.toneDesc}>{tone.desc}</Text>
              </View>
            </TouchableOpacity>
          )
        })}
        {onCreateTone && (
          <TouchableOpacity
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
              onCreateTone()
            }}
            style={[styles.toneButton, styles.addButton]}>
            <View style={styles.addButtonContent}>
              <View style={styles.addIconContainer}>
                <Plus size={24} color="#6366f1" strokeWidth={2.5} />
              </View>
              <Text style={styles.addButtonText}>Create Tone</Text>
              {isPremium && (
                <Text style={styles.addButtonSubtext}>Premium</Text>
              )}
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
  premiumBadge: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 'auto'
  },
  premiumBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#d97706',
    textTransform: 'uppercase',
    letterSpacing: 0.5
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
    borderWidth: 2,
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
  customIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  addButton: {
    backgroundColor: '#f8fafc',
    borderColor: '#c7d2fe',
    borderStyle: 'dashed',
    borderWidth: 2
  },
  addButtonContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4
  },
  addIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eef2ff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6366f1'
  },
  addButtonSubtext: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94a3b8'
  }
})
