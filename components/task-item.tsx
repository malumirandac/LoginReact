import { Task } from "@/constants/types";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "./ui/icon-symbol";

interface TaskItemProps {
  task: Task 
  onToggle: (id: string) => void
  onRemove: (id: string) => void
  loading: boolean;
}

export default function TaskItem({ task, onToggle, onRemove, loading } : TaskItemProps) {
  return(
    <View style= {styles.container}>
      <TouchableOpacity 
        style={[styles.circle, task.completed && styles.completedCircle]}
        onPress={() => onToggle(task.id)}
        disabled={loading}
      />
      <View>
        {task.photoUri && (
          <Image
            source={{ uri: task.photoUri }}
            style={{ width: 50, height: 50, borderRadius: 4, marginRight: 8 }}
            resizeMode="cover"
          />
        )}
      </View>
      <View>
        <Text style={[styles.title, task.completed && styles.completedTitle]}> 
          {task.title}
        </Text>
        {task.location && (
          <Text style={{ fontSize: 12, color: '#666'}}>
            Lat: {task.location.latitude}, Lon: {task.location.longitude}
          </Text>
        )}
      </View>
      
      <TouchableOpacity onPress={() => onRemove(task.id)} style={styles.removeButton} disabled={loading}>
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