import { styles } from "./styles";
import { TextInput, TextInputProps } from "react-native";

export function Input({ ...rest }: TextInputProps) {
  return (
    <TextInput 
      style={styles.input}
      placeholderTextColor={"#74798B"}
      {...rest}
    />
  )
}