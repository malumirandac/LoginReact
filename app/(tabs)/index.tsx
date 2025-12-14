import { useAuth } from '@/components/context/auth-context';
import NewTask from '@/components/new-task';
import TaskItem from '@/components/task-item';
import { IconSymbol } from '@/components/ui/icon-symbol';
import Title from '@/components/ui/title';
import { Task } from '@/constants/types';
import getTodoService from '@/services/todo-service';
import { useCallback, useEffect, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function HomeScreen() {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Task[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [creatingNew, setCreatingNew] = useState<boolean>(false)

  const fetchTodos = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const todoService = getTodoService({ token: user.token });
      const response = await todoService.getTodos();
      setTodos(response.data);
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { 
    if (user) {
      fetchTodos();
    }
  }, [user, fetchTodos]);
  

  const createTask = (task: Task) => {
    if (task.title.trim().length === 0) return;
    setTodos((prevTodos) => { 
      const newTodos = [...prevTodos, task];
      return newTodos;
     });
    setCreatingNew(false);
  }

  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  const handleNewTaskClose = () => {
    setCreatingNew(false);
  }

  if (creatingNew){
    return (
      <SafeAreaView style={styles.container}>
        <NewTask onClose={handleNewTaskClose} onTaskSave={createTask} />
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
