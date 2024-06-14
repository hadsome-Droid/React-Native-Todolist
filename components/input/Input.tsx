import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from "react-native";
import CustomButton from "@/components/customButton/CustomButton";

type Props = {
    id: number
    title: string
    changeTitle: (taskId: number, title: string) => void
}

export const Input = ({title, changeTitle, id}: Props) => {
    const [value, setValue] = useState(title)

    const onChange = (text: string) => {
        setValue(text)
    }
    return (
        <View style={styles.viewStyle}>
            <TextInput value={value} onChangeText={(text) => onChange(text)} style={styles.inputStyle}/>
            <CustomButton onPress={() => changeTitle(id, value)} isIcon iconName={'checkmark'} color={'green'}/>
        </View>
    );
};

const styles = StyleSheet.create({
    viewStyle:{
        alignItems: 'center',
        flexDirection: 'row',
        // borderStyle: 'solid',
        // borderColor: 'red',
        // borderWidth: 1,
    },
    inputStyle: {
        fontSize: 18,
        color: 'white',
        width: 150,
        backgroundColor: "#c5cfc2",
    },
})