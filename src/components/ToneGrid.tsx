import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native'
import * as Haptics from 'expo-haptics'
import { AudioLines } from 'lucide-react-native'
import { TONES, Tone } from '../constants/data'

type ToneGridProps = {
  selectedTone: string
  onSelectTone: (toneId: string) => void
}

const { width } = Dimensions.get('window')

export const ToneGrid: React.FC<ToneGridProps> = ({
  selectedTone,
  onSelectTone
}) => {
  return (
    <View style={styles.section}>
      <View style={styles.label}>
        <AudioLines size={16} color="#6366f1" strokeWidth={2.5} />
        <Text style={styles.labelText}>Choose your tone</Text>
      </View>
      <View style={styles.grid}>
        {TONES.map((tone: Tone) => {
          const isActive = selectedTone === tone.id
          return (
            <TouchableOpacity
              key={tone.id}
              onPress={() => {
                onSelectTone(tone.id)
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
              }}
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
              </View>
              <View>
                <Text style={styles.toneLabel}>{tone.label}</Text>
                <Text style={styles.toneDesc}>{tone.desc}</Text>
              </View>
            </TouchableOpacity>
          )
        })}
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
  }
})
