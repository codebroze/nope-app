import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import * as Haptics from 'expo-haptics'
import { UserRound } from 'lucide-react-native'

type HeaderBarProps = {
  onPressAccount: () => void
}

export const HeaderBar: React.FC<HeaderBarProps> = ({ onPressAccount }) => {
  const handlePress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    onPressAccount()
  }

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Nope</Text>
      </View>
      <TouchableOpacity style={styles.profileButton} onPress={handlePress}>
        <View style={styles.avatar}>
          <UserRound size={22} color="#5b21b6" strokeWidth={2.3} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
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
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f1f5ff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
