import { Box } from "@/src/components/Box/Box";
import { Text } from "@/src/components/Text/Text";

type Props = {
  label: string;
  value: string;
  icon: string; // emoji
};

export function StatCard({ label, value, icon }: Props) {
  return (
    <Box
      flex={1}
      alignItems="center"
      backgroundColor="cardBackground"
      borderColor="cardBorder"
      borderWidth={1}
      borderRadius="s16"
      paddingVertical="s12"
      paddingHorizontal="s8"
      style={{ gap: 4 }}
    >
      <Text preset="default" style={{ fontSize: 18 }}>
        {icon}
      </Text>
      <Text preset="paragraphsBig" weight="semiBold">
        {value}
      </Text>
      <Text preset="notesSmall" color="textMuted">
        {label}
      </Text>
    </Box>
  );
}
