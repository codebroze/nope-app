import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
  Switch
} from 'react-native'
import Modal from 'react-native-modal'
import { LinearGradient } from 'expo-linear-gradient'
import {
  ShieldCheck,
  FileText,
  Info,
  Sparkles,
  ChevronRight,
  ChevronDown,
  UserRound,
  Crown
} from 'lucide-react-native'

type AccountSheetProps = {
  visible: boolean
  onClose: () => void
  onUpgrade: () => void
  appVersion: string
  privacyUrl: string
  termsUrl: string
  isPremium?: boolean
  onTogglePremium?: (value: boolean) => void
}

export const AccountSheet: React.FC<AccountSheetProps> = ({
  visible,
  onClose,
  onUpgrade,
  appVersion,
  privacyUrl,
  termsUrl,
  isPremium = false,
  onTogglePremium
}) => {
  const openLink = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url)
      if (supported) {
        await Linking.openURL(url)
      } else {
        Alert.alert('Error', 'Unable to open link right now.')
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to open link right now.')
    }
  }

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.4}>
      <View style={styles.modalContent}>
        <View style={styles.dragHandle} />
        <View style={styles.accountHeader}>
          <View style={styles.accountAvatar}>
            <UserRound size={24} color="#4715dd" strokeWidth={2.5} />
          </View>
          <View>
            <Text style={styles.accountTitle}>Account</Text>
            <Text style={styles.accountSubtitle}>Manage your stuff</Text>
          </View>
        </View>

        <View style={styles.accountCard}>
          {onTogglePremium && (
            <View style={styles.accountRow}>
              <View style={styles.accountRowLeft}>
                <Crown size={18} color="#f59e0b" strokeWidth={2.5} />
                <Text style={styles.accountRowText}>Premium Status</Text>
              </View>
              <Switch
                value={isPremium}
                onValueChange={onTogglePremium}
                trackColor={{ false: '#e2e8f0', true: '#fbbf24' }}
                thumbColor={isPremium ? '#f59e0b' : '#94a3b8'}
              />
            </View>
          )}

          <TouchableOpacity
            style={styles.accountRow}
            onPress={() => openLink(privacyUrl)}>
            <View style={styles.accountRowLeft}>
              <ShieldCheck size={18} color="#0ea5e9" strokeWidth={2.5} />
              <Text style={styles.accountRowText}>Privacy Policy</Text>
            </View>
            <ChevronRight size={16} color="#94a3b8" strokeWidth={2.5} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.accountRow}
            onPress={() => openLink(termsUrl)}>
            <View style={styles.accountRowLeft}>
              <FileText size={18} color="#8b5cf6" strokeWidth={2.5} />
              <Text style={styles.accountRowText}>Terms & Conditions</Text>
            </View>
            <ChevronRight size={16} color="#94a3b8" strokeWidth={2.5} />
          </TouchableOpacity>

          <View style={styles.accountRow}>
            <View style={styles.accountRowLeft}>
              <Info size={18} color="#22c55e" strokeWidth={2.5} />
              <Text style={styles.accountRowText}>App Version</Text>
            </View>
            <Text style={styles.accountRowMeta}>{appVersion}</Text>
          </View>
        </View>

{!isPremium && (
          <TouchableOpacity
            onPress={onUpgrade}
            activeOpacity={0.8}
            style={styles.upgradeButton}>
            <LinearGradient
              colors={['#fbbf24', '#f59e0b']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.upgradeGradient}>
              <Sparkles size={18} color="#1f2937" strokeWidth={2.5} />
              <View style={{ flex: 1 }}>
                <Text style={styles.upgradeTitle}>Unlock Premium</Text>
                <Text style={styles.upgradeSubtitle}>
                  Create custom tones and unlock exclusive features.
                </Text>
              </View>
              <ChevronRight size={16} color="#1f2937" strokeWidth={2.5} />
            </LinearGradient>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={onClose}
          style={[styles.closeButton, { marginTop: 12 }]}>
          <ChevronDown size={24} color="#d1d5db" strokeWidth={2.5} />
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
  accountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16
  },
  accountAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#eef2ff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  accountTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1f2937'
  },
  accountSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500'
  },
  accountCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    marginBottom: 16
  },
  accountRow: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0'
  },
  accountRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  accountRowText: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '600'
  },
  accountRowMeta: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '600'
  },
  upgradeButton: {
    marginTop: 4
  },
  upgradeGradient: {
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  upgradeTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1f2937'
  },
  upgradeSubtitle: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '600'
  },
  closeButton: {
    alignSelf: 'center',
    padding: 8,
    marginTop: 8
  }
})
