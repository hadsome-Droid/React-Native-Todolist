import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {CustomIcon} from "@/components/customIcon/CustomIcon";
import {ComponentProps} from "react";

type Props = {
    onPress: () => void
    title?: string
    isIcon?: boolean
    iconName?: ComponentProps<typeof CustomIcon>['name']
    color?: string
}

const CustomButton = ({onPress, title, isIcon, iconName = 'trash', color}: Props) => (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
        {title && <Text style={styles.buttonText}>{title}</Text>}
        {isIcon && <CustomIcon name={iconName} style={[styles.iconStyle, {color: color}]}/>}
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    buttonContainer: {
        color: "#fff",
        paddingLeft: 8,
        paddingTop: 2,
        // borderStyle: 'solid',
        // borderColor: 'green',
        // borderWidth: 1,
    },
    buttonText: {
        color: "#fff",
    },
    iconStyle: {
        color: 'red',

    }
});

export default CustomButton;