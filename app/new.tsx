import { showToast } from '@/lib/toast';
import { useTodoStore } from '@/store/todoStore';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function NewTodoScreen() {
  const [title, setTitle] = useState('');
  const addTodo = useTodoStore((state) => state.addTodo);
  const router = useRouter();

  const handleAddTodo = () => {
    if (!title.trim()) {
      Alert.alert('Todo cannot be empty');
      return;
    }

    addTodo(title);
    showToast('success', 'You have added a new task');
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add New Task</Text>

      <TextInput
        style={styles.input}
        placeholder="What do you want to do?"
        value={title}
        onChangeText={setTitle}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddTodo}>
        <Text style={styles.buttonText}>Add Todo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCFDE7',
    padding: 20,
    paddingTop: (StatusBar.currentHeight ?? 0) + 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#2ACE99',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
