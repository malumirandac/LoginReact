import NewTask from '@/components/new-task';
import TaskItem from '@/components/task-item';
import { IconSymbol } from '@/components/ui/icon-symbol';
import Title from '@/components/ui/title';
import useTodoList from '@/hooks/use-todo-list';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const {
    creatingNew,
    handleNewTaskClose,
    onTaskCreated,
    todos,
    loading,
    toggleTodo,
    removeTodo,
    setCreatingNew,
  } = useTodoList();


  if (creatingNew){
    return (
      <SafeAreaView style={styles.container}>
        <NewTask onClose={handleNewTaskClose} onTaskCreated={onTaskCreated} />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Title>
        To Do List
      </Title>
      {loading && <Title>Loading...</Title>}
      {todos.map((task) => (
        <TaskItem 
        key={task.id} 
        task={task} 
        onToggle={toggleTodo}
        onRemove={removeTodo}
        loading={loading}
        />
      ))}
      <TouchableOpacity style={styles.newTaskButton} onPress={() => setCreatingNew(true)}>
        <IconSymbol name="plus" size={24} color="#ffffffff" /> 
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  newTaskButton: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f200ffff',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
