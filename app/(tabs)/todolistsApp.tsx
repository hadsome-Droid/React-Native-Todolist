import ParallaxScrollView from '@/components/ParallaxScrollView';
import React, {useState} from 'react';
import {Image, StyleSheet} from "react-native";
import Todolist from "@/components/todolists/todolist";
import { ThemedView } from '@/components/ThemedView';

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
            setValue('')
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
        console.log(newTitle)
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map((task) => task.id === taskId ? {...task, title: newTitle} : task)
        })
    }

    return (
        <ParallaxScrollView headerImage={<Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.reactLogo}
        />} headerBackgroundColor={{light: '#A1CEDC', dark: '#1D3D47'}}>
            <ThemedView style={styles.bgc}>
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
                    />
                })}
            </ThemedView>

        </ParallaxScrollView>
    );
};

const styles = StyleSheet.create({
    bgc: {
       backgroundColor: 'white'
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
})