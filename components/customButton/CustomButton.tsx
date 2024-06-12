import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {CustomIcon} from "@/components/customIcon/CustomIcon";

type Props = {
    onPress: () => void
    title?: string
    isIcon?: boolean
}

const CustomButton = ({onPress, title, isIcon}: Props) => (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
        {title && <Text style={styles.buttonText}>{title}</Text>}
        {isIcon && <CustomIcon name={'trash'} style={styles.iconStyle}/>}
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    buttonContainer: {
        // elevation: 8,
        // backgroundColor: "#009688",
        // borderRadius: 10,
        color: "#fff",
        // borderStyle: 'solid',
        // borderColor: 'red',
        // borderWidth: 1,
        paddingLeft: 8,
        paddingTop: 2
    },
    buttonText: {
        color: "#fff",
    },
    iconStyle: {
        color: 'red',

    }
});

export default CustomButton;