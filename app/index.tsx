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

  const handleAddTodo = () => router.push('/new');

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Tasks</Text>

      {todos.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emoji}>📝</Text>
          <Text style={styles.emptyText}>No tasks yet</Text>
          <Text style={styles.emptySub}>Tap the + button to add one</Text>

          <TouchableOpacity onPress={handleAddTodo} style={styles.addBtn}>
            <Text style={styles.addBtnText}>Add First Task</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TodoItem
              item={item}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={updateTodo}
            />
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      {todos.length !== 0 && (
        <TouchableOpacity style={styles.fab} onPress={handleAddTodo}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      )}
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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  emptySub: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  addBtn: {
    backgroundColor: '#2ACE99',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },

});
