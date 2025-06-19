import { TodoItem } from '@/components/TodoItem';
import { useTodoStore } from '@/store/todoStore';
import { useRouter } from 'expo-router';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen() {
  const todos = useTodoStore((state) => state.todos);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);

  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Todos</Text>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem item={item} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={updateTodo} />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <TouchableOpacity style={styles.fab} onPress={() => router.push('/new')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCFDE7',
    padding: 16,
    paddingTop: (StatusBar.currentHeight ?? 0) + 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#2ACE99',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
});
