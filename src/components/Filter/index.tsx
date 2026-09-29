import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
import { styles } from "./styles";
import { FilterStatus } from "@/types/FilterStatus";

interface FilterProps extends TouchableOpacityProps {
    status: FilterStatus;
    isActive: boolean;
}

export function Filter({ status, isActive, ...rest }: FilterProps) {
    return (
        <TouchableOpacity
            {...rest}
            style={[styles.container, {opacity: isActive? 1 : 0.5}]}
            activeOpacity={0.8}
        >
            <Text style={styles.title}>
                { status === FilterStatus.PENDING ? "Pendente" : "Comprado" }
            </Text>
        </TouchableOpacity>
    )
}