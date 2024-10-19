import { Switch as RNSwitch, View, ViewProps } from "react-native";
import { useController } from "react-hook-form";
import { Text } from "../../foundation";
import colors from "tailwindcss/colors";

type SwitchProps = {
  name: string;
  control: any;
  label?: string;
  className?: string;
  style?: ViewProps["style"];
};

export const Switchs = ({ name, control, label, style }: SwitchProps) => {
  const { field } = useController({ name, control });
  const { value, onChange } = field;
  return (
    <View className="flex-row items-center" style={style}>
      <RNSwitch
        className="mr-2"
        trackColor={{ false: colors.indigo[300], true: colors.indigo[300] }}
        thumbColor={value ? colors.indigo[500] : colors.neutral[400]}
        ios_backgroundColor={colors.neutral[200]}
        onValueChange={onChange}
        value={value}
      />
      {label && <Text className="flex-1">{label}</Text>}
    </View>
  );
};

export default Switchs;
