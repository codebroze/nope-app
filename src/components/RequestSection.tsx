import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import * as Haptics from 'expo-haptics'
import { MessageSquare } from 'lucide-react-native'

type RequestSectionProps = {
  context: string
  onChange: (value: string) => void
  inputError?: boolean
  minChars?: number
}

export const RequestSection: React.FC<RequestSectionProps> = ({
  context,
  onChange,
  inputError = false,
  minChars
}) => {
  return (
    <View style={styles.section}>
      <View style={styles.label}>
        <MessageSquare size={16} color="#6366f1" strokeWidth={2.5} />
        <Text style={styles.labelText}>Incoming Request</Text>
      </View>
      <View
        style={[
          styles.textInputContainer,
          inputError && { borderColor: '#ef4444', backgroundColor: '#fef2f2' }
        ]}>
        <TextInput
          value={context}
          onChangeText={onChange}
          placeholder="What are they asking? (e.g. Can you work Saturday?)"
          placeholderTextColor="#94a3b8"
          style={styles.textInput}
          multiline
          numberOfLines={3}
          onFocus={() =>
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
          }
        />
        {inputError && minChars && (
          <Text style={styles.errorText}>
            Please add at least {minChars} characters.
          </Text>
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
  errorText: {
    marginTop: 8,
    fontSize: 12,
    color: '#b91c1c',
    fontWeight: '600'
  }
})
