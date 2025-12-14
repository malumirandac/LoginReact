import { useAuth } from '@/components/context/auth-context';
import NewTask from '@/components/new-task';
import TaskItem from '@/components/task-item';
import { IconSymbol } from '@/components/ui/icon-symbol';
import Title from '@/components/ui/title';
import { Task } from '@/constants/types';
import getTodoService from '@/services/todo-service';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function HomeScreen() {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Task[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [creatingNew, setCreatingNew] = useState<boolean>(false)

  const todoService = useMemo(() => user ? getTodoService({ token: user.token }): null, [user]);

  const fetchTodos = useCallback(async () => {
    if (!user || !todoService) return;
    setLoading(true);
    try {
      const response = await todoService.getTodos();
      setTodos(response.data);
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    } finally {
      setLoading(false);
    }
  }, [user, todoService]);

  useEffect(() => { 
    if (user) {
      fetchTodos();
    }
  }, [user, fetchTodos]);
  

  const onTaskCreated = () => {
    fetchTodos();
    setCreatingNew(false);
  }

  const toggleTodo = async (id: string) => {
    setLoading(true);
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    const updatedTodo = todos.find((todo) => todo.id === id);
    if (todoService && updatedTodo !== undefined) {
      updatedTodo.completed = !updatedTodo.completed;
      try {
        await todoService.updateTodo(updatedTodo);
        await fetchTodos();
      } catch (error) {
        Alert.alert("Error", (error as Error).message);
      }
    }
  };

  const removeTodo = async (id: string) => {
    setLoading(true);
    await todoService?.deleteTodo(id);
    await fetchTodos();
  };

  const handleNewTaskClose = () => {
    setCreatingNew(false);
  }

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
