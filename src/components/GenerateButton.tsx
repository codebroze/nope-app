import React from 'react'
import { Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import * as Haptics from 'expo-haptics'
import { Zap } from 'lucide-react-native'

type GenerateButtonProps = {
  onPress: () => void
  disabled?: boolean
  loading?: boolean
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({
  onPress,
  disabled,
  loading = false
}) => {
  const isDisabled = disabled || loading

  const handlePress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    onPress()
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={isDisabled}
      activeOpacity={0.8}>
      <LinearGradient
        colors={['#6b21a8', '#ec4899']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.generateButton, isDisabled && { opacity: 0.7 }]}>
        {loading ? (
          <>
            <ActivityIndicator color="white" size="small" />
            <Text style={styles.generateText}>Generating...</Text>
          </>
        ) : (
          <>
            <Zap size={22} color='white' strokeWidth={2.2} />
            <Text style={styles.generateText}>Generate</Text>
          </>
        )}
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  generateButton: {
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#6b21a8',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8
  },
  generateText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700'
  }
})
