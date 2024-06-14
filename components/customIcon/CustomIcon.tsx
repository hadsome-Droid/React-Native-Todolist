import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

type CustomIconProps = IconProps<ComponentProps<typeof Ionicons>['name']> & {
    size?: number;
};

export function CustomIcon({ name, size = 18, style, ...rest }: CustomIconProps) {
    return <Ionicons name={name} size={size} style={[{ marginBottom: -3 }, style]} {...rest} />;
}
