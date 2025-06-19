import { showToast } from '@/lib/toast';
import { TodoItemProps } from '@/types';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export function TodoItem({ item, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(item.title);

  const handleSave = () => {
    if (newTitle.trim()) {
      onEdit(item.id, newTitle.trim());
      showToast('success', 'Task updated');
      setIsEditing(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textWrap}>
        {isEditing ? (
          <TextInput
            value={newTitle}
            onChangeText={setNewTitle}
            style={styles.input}
            autoFocus
          />
        ) : (
          <Text style={[styles.text, item.done && styles.doneText]}>
            {item.title}
          </Text>
        )}
      </View>

      <View style={styles.buttons}>
        {isEditing ? (
          <TouchableOpacity
            onPress={handleSave}
            style={[styles.btn, styles.doneBtn]}
          >
            <Text style={styles.btnText}>Save</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => setIsEditing(true)}
              style={[styles.btn, styles.editBtn]}
            >
              <Text style={styles.btnText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                onToggle(item.id);
                showToast('success', item.done ? 'Task marked as undone' : 'Task completed');
              }}
              style={[styles.btn, styles.doneBtn]}
            >
              <Text style={styles.btnText}>{item.done ? 'Undo' : 'Done'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                onDelete(item.id);
                showToast('success', 'Task deleted');
              }}
              style={[styles.btn, styles.deleteBtn]}
            >
              <Text style={styles.btnText}>Delete</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  textWrap: {
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  doneText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  input: {
    fontSize: 16,
    backgroundColor: '#F1F5F9',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  editBtn: {
    backgroundColor: '#2196F3',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  btn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  doneBtn: {
    backgroundColor: '#2ACE99',
  },
  deleteBtn: {
    backgroundColor: '#F44336',
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
});
