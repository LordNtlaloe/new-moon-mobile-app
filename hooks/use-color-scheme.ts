import { useColorScheme } from 'react-native';
import { Colors } from '../constants/theme';

export function useThemeColor(
    props: { light?: string; dark?: string },
    colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
    const theme = useColorScheme() ?? 'light';
    const colorFromProps = props[theme];

    if (colorFromProps) {
        return colorFromProps;
    } else {
        return Colors[theme][colorName];
    }
}

export type Theme = 'light' | 'dark';
export function useTheme() {
    const colorScheme = useColorScheme();
    return Colors[colorScheme ?? 'light'];
}

export { useColorScheme };
