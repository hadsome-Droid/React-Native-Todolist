import {TouchableOpacity, Text, StyleSheet, ViewStyle} from 'react-native';
import {CustomIcon} from "@/components/customIcon/CustomIcon";
import {ComponentProps, useState} from "react";

type Props = {
    onPress: () => void
    onPressIn?: () => void
    onPressOut?: () => void
    title?: string
    isIcon?: boolean
    iconName?: ComponentProps<typeof CustomIcon>['name']
    color?: string
    sizeIcon?: number
    style?: ViewStyle | ViewStyle[]
}

const CustomButton = ({onPress, title, isIcon, iconName = 'trash', color, sizeIcon, style, onPressIn, onPressOut}: Props) => {
    // const [isPressed, setIsPressed] = useState(false);
    //
    // const handlePressIn = () => {
    //     setIsPressed(true);
    // };
    //
    // const handlePressOut = () => {
    //     setIsPressed(false);
    // };

    return (
        <TouchableOpacity onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}
                          style={[styles.buttonContainer, style]}>
            {title && <Text style={styles.buttonText}>{title}</Text>}
            {isIcon && <CustomIcon name={iconName} style={[styles.iconStyle, {color: color}]} size={sizeIcon}/>}
        </TouchableOpacity>)
};

const styles = StyleSheet.create({
    buttonContainer: {
        color: "#fff",
        paddingLeft: 8,
        paddingTop: 2,
    },
    buttonText: {
        color: "#fff",
    },
    iconStyle: {
        color: 'red',

    }
});

export default CustomButton;