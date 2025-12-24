import { useAuth } from "@/components/context/auth-context";
import { Task } from "@/constants/types";
import getImageUploadService from "@/services/image-upload-service";
import getTodoService from '@/services/todo-service';
import * as ImageManipulator from 'expo-image-manipulator';
import { launchCameraAsync, requestCameraPermissionsAsync } from "expo-image-picker";
import { Accuracy, getCurrentPositionAsync, requestForegroundPermissionsAsync } from "expo-location";
import { useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";
import Button from "./ui/button";
import Title from "./ui/title";

interface NewTaskProps{
    onClose: () => void;
    onTaskCreated: () => void;
}

export default function NewTask({ onClose, onTaskCreated }: NewTaskProps) {
    const [photoUri, setPhotoUri] = useState<string | null>(null)
    const [taskTitle, setTaskTitle] = useState<string>("")
    const [isCapturingPhoto, setIsCapturingPhoto] = useState<boolean>(false)
    const [isSaving, setIsSaving] = useState<boolean>(false)
    const { user } = useAuth();

    async function handleTakePhoto() {
        if (isCapturingPhoto) return



        try {
    setIsCapturingPhoto(true);

    const { status } = await requestCameraPermissionsAsync()

    if (status !== 'granted') {
        Alert.alert("Permiso denegado", "No se pudo obtener permiso para acceder a la cámara");
        setIsCapturingPhoto(false);
        return;
    }

    const result = await launchCameraAsync({
        mediaTypes: ['images'],
        quality: 0.9,
        allowsEditing: false,
        exif: false
    })

    if (!result.canceled && result.assets.length > 0) {
        const picked = result.assets[0];

        // Reduce/comprime la imagen para evitar 413
        const manipulated = await ImageManipulator.manipulateAsync(
            picked.uri,
            [{ resize: { width: 1280 } }], // ajustar según necesidades
            { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );

        const uploadService = getImageUploadService({ token: user!.token });
        const formData = new FormData();
        formData.append('image', {
            uri: manipulated.uri,
            name: `photo.jpg`,
            type: 'image/jpeg',
        } as any);

        try {
            const remoteUrl = await uploadService.uploadImage(formData);
            setPhotoUri(remoteUrl);
        } catch (srvErr) {
            console.error("Error uploading photo:", srvErr);
            const msg = srvErr instanceof Error ? srvErr.message : "No se pudo subir la foto.";
            Alert.alert("Error", msg);
        }
    }

} catch (error) {
    console.error("Error taking photo:", error);
    const msg = error instanceof Error ? error.message : "No se pudo tomar la foto. Intente de nuevo";
    Alert.alert("Error", msg);
} 
finally {
    setIsCapturingPhoto(false);
}



    }

    async function handleSaveTask() {
        if (isSaving) return;
        let location = null;
    
        try {
            setIsSaving(true);

            try{
                const { status } = await requestForegroundPermissionsAsync()

                if (status === 'granted') {
                    const locationResult = await getCurrentPositionAsync({
                        accuracy: Accuracy.Balanced
                    });
                    location = {
                        latitude: Number(locationResult.coords.latitude.toFixed(6)),
                        longitude: Number(locationResult.coords.longitude.toFixed(6)),
                    }
            }
            } catch (locationError) {
            console.error("Error obtaining location:", locationError);
        }
        
        const newTask: Task = {
            id: Date.now().toString(),
            title: taskTitle,
            completed: false,
            photoUri: photoUri || undefined,
            location: location || undefined,
            userId: user ? user.id : "",
        };
        const todoService = getTodoService({ token: user!.token });
        await todoService.createTodo(newTask);
        onTaskCreated();
        } catch (error) {
            console.error("Error guardando la tarea:", error);
            Alert.alert("Error,", "No se pudo guardar la tarea. Intente de nuevo.");
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <View style={styles.container}>
            <Title>
                Crear una nueva tarea
            </Title>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Título de la tarea</Text>
                <TextInput style={styles.input} value={taskTitle} onChangeText={setTaskTitle} /> 
            </View>
            {photoUri ? (
                <View style={{ marginBottom: 16 }}>
                    <Image 
                        source={{ uri: photoUri}}
                        style={{ width: '100%', height:360 , borderRadius: 4}}  
                        resizeMode="contain"
                    /> 
                </View>
            ) : (
                <View style={styles.emptyPhotoContainer}>
                <Text style={styles.emptyPhotoIcon}>📷</Text>
                <Text style={styles.emptyPhotoText}>Toma una foto para tu tarea</Text>
            </View>
            ) }
            <Button type="outlined" text={photoUri ? "Volver a tomar foto" : "Tomar Foto"} onPress={handleTakePhoto} />
            <View style={{ gap: 12, flexDirection: 'column', marginTop: 96 }}>
            <Button type="primary" text="Agregar tarea" onPress={handleSaveTask} disabled={!taskTitle.trim() || isSaving} loading={isSaving} />
            <Button type="danger" text="Cancelar" onPress={onClose} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
    },
    emptyPhotoContainer: {
        height: 200,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: '#444444ff'
    },
    emptyPhotoIcon: {
        fontSize: 48,
        marginBottom: 8,
    },
    emptyPhotoText: {
        color: '#ffffffaa',
    }
})