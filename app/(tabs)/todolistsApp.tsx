import ParallaxScrollView from '@/components/ParallaxScrollView';
import React, {useState} from 'react';
import {Image, StyleSheet, TextInput} from "react-native";
import Todolist from "@/components/todolists/todolist";
import { ThemedView } from '@/components/ThemedView';
import CustomButton from "@/components/customButton/CustomButton";
import {
    useCreateTodolistMutation,
    useGetTodolistsQuery, useRemoveTodolistMutation,
    useUpdateTodolistTitleMutation
} from "@/services/todolists/todolists.service";


export default function TodolistsApp() {
    const {data, isLoading} = useGetTodolistsQuery()
    const [updateTodolistTitle] = useUpdateTodolistTitleMutation()
    const [createTodolist] = useCreateTodolistMutation()
    const [removeTodolist] = useRemoveTodolistMutation()

    console.log('+++result', data)

    const [value, setValue] = useState('')


    // let todolistID1 = 1
    // let todolistID2 = 2
    //
    // const [todolists, setTodolists] = useState([
    //     {id: todolistID1, title: 'Todo 1', filter: 'all'},
    //     {id: todolistID2, title: 'Todo 2', filter: 'all'}
    // ])
    //
    // const [tasks, setTasks] = useState(
    //     {
    //         [todolistID1]: [
    //             {id: 1, title: 'Html', isDone: true},
    //             {id: 2, title: 'CSS', isDone: true},
    //             {id: 3, title: 'React Native', isDone: false},
    //             {id: 4, title: 'JS', isDone: true},
    //             {id: 5, title: 'React', isDone: false},
    //         ],
    //         [todolistID2]: [
    //             {id: 1, title: 'By a Car', isDone: true},
    //             {id: 2, title: 'Spend all money', isDone: true},
    //             {id: 3, title: 'Play all games', isDone: false},
    //             {id: 4, title: 'Ride one book', isDone: true},
    //             {id: 5, title: 'Wake up early', isDone: false},
    //         ]
    //     },
    // )


    const changeTodolistTitle = (todolistId: string, title: string) => {
        updateTodolistTitle({id: todolistId, title})

        // setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, title: newTitle} : todolist))
    }

    const addTodolist = (title: string) => {
        createTodolist({title})
        // const newTodolist = {id: todolists.length + 1, title, filter: 'all'}
        // if (title.trim() !== '') {
        //     setTodolists([newTodolist, ...todolists])
        //     setTasks({...tasks, [todolists.length + 1]: []})
        //     setValue('')
        // }
    }

    const deleteTodolist = (todolistId: string) => {
        removeTodolist({id: todolistId})
        // const newTodolist = todolists.filter(todolist => todolist.id !== todolistId)
        // setTodolists(newTodolist)
        //
        // delete tasks[todolistId]
        // setTasks({...tasks})
    }

    return (
        <ParallaxScrollView headerImage={<Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.reactLogo}
        />} headerBackgroundColor={{light: '#A1CEDC', dark: '#1D3D47'}}>
            <ThemedView style={styles.bgc}>
                <ThemedView style={styles.createBox}>
                    <TextInput style={styles.inputStyle} placeholder={'Create Todolist'} value={value} onChangeText={(text) => setValue(text)}/>
                    <CustomButton onPress={() =>addTodolist(value)} title={'Add Todolist'} isIcon iconName={'hammer'}  color={'white'} style={styles.buttonStyle}/>
                </ThemedView>

                {data?.map(todolist => {
                    return <Todolist
                        key={todolist.id}
                        todolistId={todolist.id}
                        title={todolist.title}
                        changeTodolistTitle={changeTodolistTitle}
                        removeTodolist={deleteTodolist}
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