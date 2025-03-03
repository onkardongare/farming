import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
        Page Not Found
      </Text>
      <Text style={{ fontSize: 16, color: 'gray', marginBottom: 20 }}>
        The page you ares looking for does not exist.
      </Text>
      <Button title="Go Home" onPress={() => router.replace('/home')} />
    </View>
  );
}

