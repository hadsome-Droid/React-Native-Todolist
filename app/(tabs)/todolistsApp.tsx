import ParallaxScrollView from '@/components/ParallaxScrollView';
import React, {useState} from 'react';
import {Image, StyleSheet, TextInput} from "react-native";
import Todolist from "@/components/todolists/todolist";
import { ThemedView } from '@/components/ThemedView';
import CustomButton from "@/components/customButton/CustomButton";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export default function TodolistsApp() {
    const [value, setValue] = useState('')


    let todolistID1 = 1
    let todolistID2 = 2

    const [todolists, setTodolists] = useState([
        {id: todolistID1, title: 'Todo 1', filter: 'all'},
        {id: todolistID2, title: 'Todo 2', filter: 'all'}
    ])

    const [tasks, setTasks] = useState(
        {
            [todolistID1]: [
                {id: 1, title: 'Html', isDone: true},
                {id: 2, title: 'CSS', isDone: true},
                {id: 3, title: 'React Native', isDone: false},
                {id: 4, title: 'JS', isDone: true},
                {id: 5, title: 'React', isDone: false},
            ],
            [todolistID2]: [
                {id: 1, title: 'By a Car', isDone: true},
                {id: 2, title: 'Spend all money', isDone: true},
                {id: 3, title: 'Play all games', isDone: false},
                {id: 4, title: 'Ride one book', isDone: true},
                {id: 5, title: 'Wake up early', isDone: false},
            ]
        },
    )

    const addTask = (todolistId: number, title: string) => {
        const newTask = {id: tasks[todolistId].length + 1, title, isDone: false}
        if (title.trim() !== '') {
            setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
        }
    }

    const deleteTask = (todolistId: number, taskId: number) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})
    }

    const changeStatus = (todolistId: number, taskId: number, isDone: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone: !isDone} : task)
        })
    }

    const changeTitle = (todolistId: number, taskId: number, newTitle: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map((task) => task.id === taskId ? {...task, title: newTitle} : task)
        })
    }

    const changeTodolistTitle = (todolistId: number, newTitle: string) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, title: newTitle} : todolist))
    }

    const createTodolist = (title: string) => {
        const newTodolist = {id: todolists.length + 1, title, filter: 'all'}
        if (title.trim() !== '') {
            setTodolists([newTodolist, ...todolists])
            setTasks({...tasks, [todolists.length + 1]: []})
            setValue('')
        }
    }

    const removeTodolist = (todolistId: number) => {
        const newTodolist = todolists.filter(todolist => todolist.id !== todolistId)
        setTodolists(newTodolist)

        delete tasks[todolistId]
        setTasks({...tasks})
    }
    console.log(todolists)
    console.log(tasks)
    return (
        <ParallaxScrollView headerImage={<Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.reactLogo}
        />} headerBackgroundColor={{light: '#A1CEDC', dark: '#1D3D47'}}>
            <ThemedView style={styles.bgc}>
                <ThemedView style={styles.createBox}>
                    <TextInput style={styles.inputStyle} placeholder={'Create Todolist'} value={value} onChangeText={(text) => setValue(text)}/>
                    <CustomButton onPress={() =>createTodolist(value)} title={'Add Todolist'} isIcon iconName={'hammer'}  color={'white'} style={styles.buttonStyle}/>
                </ThemedView>

                {todolists.map(todolist => {
                    return <Todolist
                        key={todolist.id}
                        todolistId={todolist.id}
                        title={todolist.title}
                        tasks={tasks[todolist.id]}
                        addTask={addTask}
                        deleteTask={deleteTask}
                        changeTaskStatus={changeStatus}
                        changeTaskTitle={changeTitle}
                        changeTodolistTitle={changeTodolistTitle}
                        removeTodolist={removeTodolist}
                    />
                })}
            </ThemedView>

        </ParallaxScrollView>
    );
};

const styles = StyleSheet.create({
    bgc: {
       // backgroundColor: 'white'
    },
    createBox:{
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        marginBottom: 28,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
    inputStyle: {
        fontSize: 18,
        color: 'white',
        width: 150,
        backgroundColor: 'transparent',
        borderBottomWidth: 2,
        borderBottomColor: '#469bf1',
        marginBottom: 5
    },
    buttonStyle: {
        flexDirection: "row",
        justifyContent: 'center',
        gap: 5,
        backgroundColor: 'green',
        padding: 4,
        width: 150,
        borderRadius: 2,
    },

})