import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from "react-native";
import CustomButton from "@/components/customButton/CustomButton";

type Props = {
    id: string
    title: string
    changeTitle: (taskId: string, title: string) => void
}

export const Input = ({title, changeTitle, id}: Props) => {
    const [value, setValue] = useState(title)

    const onChange = (text: string) => {
        setValue(text)
    }
    return (
        <View style={styles.viewStyle}>
            <TextInput value={value} onChangeText={(text) => onChange(text)} style={styles.inputStyle}/>
            <CustomButton onPress={() => changeTitle(id, value)} isIcon iconName={'checkmark-circle-outline'} color={'green'} sizeIcon={24}/>
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
        width: 130,
        backgroundColor: 'transparent',
        borderBottomWidth: 2,
        borderBottomColor: '#469bf1',
    },
})