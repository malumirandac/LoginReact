import { Task } from "@/constants/types";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "./ui/icon-symbol";

interface TaskItemProps {
  task: Task 
  onToggle: (id: string) => void
  onRemove: (id: string) => void
}

export default function TaskItem({ task, onToggle, onRemove } : TaskItemProps) {
  return(
    <View style= {styles.container}>
      <TouchableOpacity 
        style={[styles.circle, task.completed && styles.completedCircle]}
        onPress={() => onToggle(task.id)}
      />
      <Text style={[styles.title, task.completed && styles.completedTitle]}>
        {task.title}
      </Text>
      <TouchableOpacity onPress={() => onRemove(task.id)} style={styles.removeButton}>
        <IconSymbol name="trash.circle" size={24} color="#757575ff" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    borderBottomColor: '#fb9af4ff',
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    padding: 8,
    borderWidth: 2,
    borderColor: '#f200ffff',
    backgroundColor: 'transparent',
    marginRight: 12,
  },
  completedCircle: {
    backgroundColor: '#fb9af4ff',
  },
  title: {
    fontSize: 16,
    color: '#000',
  },
  completedTitle: {
    color: '#999',
    textDecorationLine: 'line-through',
  },
  removeButton: {
    marginLeft: 'auto',
    padding: 4,
  }
})