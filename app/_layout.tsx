import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) return null;

  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#DCFDE7' },
          headerShown: false,
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <StatusBar style="dark" />
      <Toast />
    </>
  );
}
