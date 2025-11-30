import { StyleSheet } from 'react-native'

export const appStyles = StyleSheet.create({
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
  scrollView: {
    flex: 1
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    paddingBottom: 128
  },
  bottomAction: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20
  }
})
