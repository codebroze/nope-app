import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'
import {
  Copy,
  Share2,
  RefreshCw
} from 'lucide-react-native'
import { TONES } from '../constants/data'

type ResultModalProps = {
  visible: boolean
  result: string
  selectedTone: string
  onCopy: () => void
  copied: boolean
  onShare: () => void
  onGenerateAnother: () => void
  onClose: () => void
}

export const ResultModal: React.FC<ResultModalProps> = ({
  visible,
  result,
  selectedTone,
  onCopy,
  copied,
  onShare,
  onGenerateAnother,
  onClose
}) => {
  const tone = TONES.find(t => t.id === selectedTone)

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.4}>
      <View style={styles.modalContent}>
        <View style={styles.dragHandle} />

        <View style={styles.resultContainer}>
          <View style={styles.resultIcon}>
            <Text style={styles.resultEmoji}>{tone?.emoji ?? '✨'}</Text>
          </View>

          <Text style={styles.resultTone}>
            Tone: {tone?.label ?? selectedTone}
          </Text>

          <Text style={styles.resultText}>"{result}"</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            onPress={onCopy}
            style={[
              styles.actionButton,
              copied && { backgroundColor: '#d1fae5', borderColor: '#a7f3d0' }
            ]}>
            <Text style={[styles.actionText, copied && { color: '#065f46' }]}>
              {copied ? 'Copied!' : 'Copy Text'}
            </Text>
            {!copied && <Copy size={16} color="#374151" strokeWidth={2.5} />}
          </TouchableOpacity>

          <TouchableOpacity onPress={onShare} style={styles.shareButton}>
            <Text style={styles.shareText}>Share</Text>
            <Share2 size={16} color="white" strokeWidth={2.5} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={onGenerateAnother} style={styles.tryAnother}>
          <RefreshCw size={16} color="#6b7280" strokeWidth={2.5} />
          <Text style={styles.tryAnotherText}>Try another</Text>
        </TouchableOpacity>
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
    maxHeight: '85%'
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
    marginBottom: 12
  },
  resultEmoji: {
    fontSize: 28
  },
  resultText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    textAlign: 'center',
    lineHeight: 32
  },
  resultTone: {
    fontSize: 14,
    color: '#94a3b8',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 12
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
  }
})
