import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native"
import { styles } from "./styles"

type Props = TouchableOpacityProps & {
    title: string,
}

export function Button({ title, activeOpacity ,...rest }: Props) {
    return(
        <TouchableOpacity 
        style={styles.container} 
        {...rest}
        activeOpacity={activeOpacity ?? 0.8}
        >
            <Text style={styles.title}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}