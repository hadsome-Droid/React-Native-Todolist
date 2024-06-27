import {Button, StyleSheet, TextInput,} from "react-native";
import Checkbox from 'expo-checkbox';
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {HelloWave} from "@/components/HelloWave";
import {useState} from "react";
import CustomButton from "@/components/customButton/CustomButton";
import {Input} from "@/components/input/Input";
import {
    UpdateTask,
    UpdateTaskModelType,
    useCreateTaskMutation,
    useGetTasksQuery,
    useRemoveTaskMutation,
    useUpdateTaskTitleMutation
} from "@/services/tasks/tasks.service";
import {TaskPriorities, TaskStatuses} from "@/enums/common.enums";

type Task = {
    title: string;
    description: string;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: string;
    deadline: string;
    id: string
    todolistId: string
}

type Filter = 'all' | 'active' | 'completed'

type Props = {
    todolistId: string
    title: string
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
    removeTodolist: (todolistId: string) => void
}


export default function Todolist({
                                     todolistId,
                                     title,
                                     changeTodolistTitle,
                                     removeTodolist
                                 }: Props) {
    const [value, setValue] = useState('')
    const [show, setShow] = useState('')
    const [filter, setFilter] = useState<Filter>('all');

    const {data, isLoading, error} = useGetTasksQuery(todolistId)
    const [createTask] = useCreateTaskMutation()
    const [removeTask] = useRemoveTaskMutation()
    const [updateTaskTitle] = useUpdateTaskTitleMutation()



    if (isLoading) {
        return <ThemedView style={styles.stepContainer}>
            <ThemedText style={{fontWeight: 'bold', fontSize: 28}}>Loading...</ThemedText>
        </ThemedView>
    }

    const handlePress = (buttonName: Filter) => {
        setFilter(buttonName);
    };

    const getButtonStyle = (buttonName: Filter) => {
        return filter === buttonName ? [styles.buttonStyle, styles.buttonActive] : [styles.buttonStyle];
    };

    const createHandlerTask = () => {
        createTask({todolistId, title: value})
        setValue('')
    }

    const removeHandlerTask = (id: string) => {
        removeTask({todolistId, taskId: id})
    }

    const changeStatus = (id: string, status: TaskStatuses) => {
        let newStatus = status === TaskStatuses.Completed ? TaskStatuses.New : TaskStatuses.Completed
        let task;
        if (!isLoading) {
            task = data.items.find((t: Task) => t.id === id)
            if (task) {
                const newTaskData: UpdateTaskModelType = {
                    title: task.title,
                    description: task.description,
                    status: newStatus,
                    priority: task.priority,
                    startDate: task.startDate,
                    deadline: task.deadline,
                };
                updateTaskTitle({todolistId, taskId: id, newTaskData})
            }
        }
    }

    const changeTitle = (id: string, newTitle: string) => {
        let task;
        if (!isLoading) {
            task = data.items.find((t: Task) => t.id === id)
            if (task) {
                const newTaskData: UpdateTaskModelType = {
                    title: newTitle,
                    description: task.description,
                    status: task.status,
                    priority: task.priority,
                    startDate: task.startDate,
                    deadline: task.deadline,
                };
                updateTaskTitle({todolistId, taskId: id, newTaskData})
            }
        }
        setShow('')
    }


    const changeFilter = (title: Filter) => {
        switch (title) {
            case "active": {
                return data?.items.filter((task:Task) => task.status === TaskStatuses.New)
            }
            case "completed": {
                return data?.items.filter((task: Task) => task.status === TaskStatuses.Completed)
            }
            default: {
                return data?.items || []
            }
        }
    }
    const filteredTasks = changeFilter(filter);

    console.log('taskArr', filteredTasks)

    const handlerChangeTodolistTitle = (todolistId: string, newTitle: string) => {
        changeTodolistTitle(todolistId, newTitle)
        setShow('')
    }

    const removeHandlerTodolist = () => {
        removeTodolist(todolistId)
    }


    return (<ThemedView style={styles.bgc}>
            <ThemedView style={styles.titleContainer}>
                {show === todolistId
                    ? <Input id={todolistId} title={title} changeTitle={handlerChangeTodolistTitle}/>
                    : <><ThemedText type="title" onPress={() => setShow(todolistId)}>{title}</ThemedText><HelloWave/>
                        <CustomButton onPress={removeHandlerTodolist} isIcon iconName={'close'} sizeIcon={24}/></>
                }

            </ThemedView>
            <ThemedView style={[styles.stepContainer, styles.boxTodolist]}>
                <ThemedView style={styles.stepContainer}>
                    <TextInput value={value} style={[styles.inputStyle]} onChangeText={setValue}
                               placeholder={'Text Input'}/>
                    <Button color={'#ff8906'} title={'Add Task'} onPress={createHandlerTask} disabled={value == ''}/>
                </ThemedView>
                <ThemedView style={[styles.stepContainer]}>
                    {filteredTasks.map((task: Task) => {
                        return <ThemedView style={[styles.stepContainer, styles.boxTask,]} key={task.id}>
                            <Checkbox value={task.status === TaskStatuses.Completed} style={{borderRadius: 50}}
                                      onValueChange={() => changeStatus(task.id, task.status)}/>
                            {show === task.id
                                ? <Input id={task.id} title={task.title} changeTitle={changeTitle}/>
                                : <ThemedText type={'default'} key={task.id} onPress={() => setShow(task.id)}>
                                    {task.title}
                                    <CustomButton title={''}
                                                  onPress={() => removeHandlerTask(task.id)}
                                                  isIcon={true}
                                                  iconName={'trash'}
                                                  color={'red'}/></ThemedText>
                            }
                        </ThemedView>
                    })}
                </ThemedView>
                <ThemedView style={styles.buttonBox}>
                    <CustomButton
                        onPress={() => handlePress('all')}
                        title={'All'}
                        style={getButtonStyle('all')}/>
                    <CustomButton onPress={() => handlePress('active')} title={'Active'}
                                  style={getButtonStyle('active')}/>
                    <CustomButton onPress={() => handlePress('completed')} title={'Completed'}
                                  style={getButtonStyle('completed')}/>
                </ThemedView>
            </ThemedView>
        </ThemedView>

    )
}

const styles = StyleSheet.create({
    bgc: {
        paddingBottom: 15
    },
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
    buttonBox: {
        flexDirection: 'row',
        gap: 15,
        justifyContent: 'space-between'
    },
    buttonStyle: {
        borderRadius: 2,
        textAlign: 'center',
        paddingTop: 3,
        paddingRight: 3,
        paddingLeft: 3,
        paddingBottom: 3,
        backgroundColor: 'grey'
    },
    buttonActive: {
        backgroundColor: 'green'
    }
});

const border = StyleSheet.create({
    styleBorder: {
        borderStyle: 'solid',
        borderColor: 'red',
        borderWidth: 1,
    }

})
