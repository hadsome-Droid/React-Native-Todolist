import ParallaxScrollView from "@/components/ParallaxScrollView";
import {Alert, Button, Image, StyleSheet, TextInput,} from "react-native";
import Checkbox from 'expo-checkbox';
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {HelloWave} from "@/components/HelloWave";
import {useState} from "react";
import CustomButton from "@/components/customButton/CustomButton";


export default function Todolist() {
    const [value, setValue] = useState('')

    const [tasks, setTasks] = useState([
        {id: 1, title: 'Html', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'React Native', isDone: false},
        {id: 4, title: 'JS', isDone: true},
        {id: 5, title: 'React', isDone: false},
    ])

    const addTask = () => {
        const newTask = {id: tasks.length + 1, title: value, isDone: false}
        if(value !== '' && value !== ' '){
            setTasks([newTask, ...tasks])
            setValue('')
        }
    }

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id))
    }

    const changeStatus = (id: number, isDone: boolean) => {
        setTasks(tasks.map(task => task.id === id ? {...task, isDone: !isDone} : task))
    }

    return (
        <ParallaxScrollView headerImage={<Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.reactLogo}
        />} headerBackgroundColor={{light: '#A1CEDC', dark: '#1D3D47'}}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">TodoList!</ThemedText>
                <ThemedText type="title">TodoList!</ThemedText>
                <HelloWave/>
            </ThemedView>
            <ThemedView style={[styles.stepContainer, styles.boxTodolist]}>
                <ThemedView style={styles.stepContainer}>
                    <TextInput value={value} style={[styles.inputStyle]} onChangeText={setValue}
                               placeholder={'Text Input'}/>
                    <Button color={'#ff8906'} title={'Add Task'} onPress={addTask} disabled={value == ''}/>
                </ThemedView>
                <ThemedView style={[styles.stepContainer]}>
                    {tasks.map((task) => {
                        return <ThemedView style={[styles.stepContainer, styles.boxTask, ]} key={task.id}>
                            <Checkbox value={task.isDone} onValueChange={() => changeStatus(task.id, task.isDone)}/>
                            <ThemedText type={'default'} key={task.id} >{task.title}<CustomButton title={''}
                                                                                                 onPress={() => deleteTask(task.id)}
                                                                                                 isIcon={true}/></ThemedText>

                        </ThemedView>
                    })}
                </ThemedView>
            </ThemedView>
        </ParallaxScrollView>
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
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
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
