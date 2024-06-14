import ParallaxScrollView from "@/components/ParallaxScrollView";
import {Alert, Button, Image, StyleSheet, TextInput,} from "react-native";
import Checkbox from 'expo-checkbox';
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {HelloWave} from "@/components/HelloWave";
import {useState} from "react";
import CustomButton from "@/components/customButton/CustomButton";
import {Input} from "@/components/input/Input";
import {TaskType} from "@/app/(tabs)/todolistsApp";

type Props = {
    todolistId: number
    title: string
    tasks: TaskType[]
    addTask: (todolistId: number, title: string) => void
    deleteTask: (todolistId: number, taskId: number) => void
    changeTaskStatus: (todolistId: number, taskId: number, taskStatus: boolean) => void
    changeTaskTitle: (todolistId: number, taskId: number, newTitle: string) => void
}


export default function Todolist({
                                     todolistId,
                                     title,
                                     tasks,
                                     addTask,
                                     deleteTask,
                                     changeTaskTitle,
                                     changeTaskStatus
                                 }: Props) {
    const [value, setValue] = useState('')
    const [show, setShow] = useState(0)


    const createTask = () => {
        addTask(todolistId, value)
    }

    const removeTask = (id: number) => {
        deleteTask(todolistId, id)
    }

    const changeStatus = (id: number, isDone: boolean) => {
        changeTaskStatus(todolistId, id, isDone)
    }

    const changeTitle = (id: number, newTitle: string) => {
        changeTaskTitle(todolistId, id, newTitle)
    }

    return (<>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">{title}</ThemedText>
                <HelloWave/>
            </ThemedView>
            <ThemedView style={[styles.stepContainer, styles.boxTodolist]}>
                <ThemedView style={styles.stepContainer}>
                    <TextInput value={value} style={[styles.inputStyle]} onChangeText={setValue}
                               placeholder={'Text Input'}/>
                    <Button color={'#ff8906'} title={'Add Task'} onPress={createTask} disabled={value == ''}/>
                </ThemedView>
                <ThemedView style={[styles.stepContainer]}>
                    {tasks.map((task) => {
                        return <ThemedView style={[styles.stepContainer, styles.boxTask,]} key={task.id}>
                            <Checkbox value={task.isDone} style={{borderRadius: 50}}
                                      onValueChange={() => changeStatus(task.id, task.isDone)}/>
                            {show === task.id
                                ? <Input id={task.id} title={task.title} changeTitle={changeTitle}/>
                                : <ThemedText type={'default'} key={task.id} onPress={() => setShow(task.id)}>
                                    {task.title}
                                    <CustomButton title={''}
                                                  onPress={() => removeTask(task.id)}
                                                  isIcon={true}
                                                  iconName={'trash'}
                                                  color={'red'}/></ThemedText>
                            }
                        </ThemedView>
                    })}
                </ThemedView>
            </ThemedView>
        </>

    )
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 10,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    boxTodolist: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    boxTask: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 200,
    },
    inputStyle: {
        fontSize: 18,
        backgroundColor: '#fff',
        width: 200,
        padding: 4,
    },
});

const border = StyleSheet.create({
    styleBorder: {
        borderStyle: 'solid',
        borderColor: 'red',
        borderWidth: 1,
    }

})
