import { Select, type SelectProps } from "@mantine/core";

type CommonSelectProps = SelectProps;

export function CommonSelect(props: CommonSelectProps) {
  return (
    <Select
      searchable
      clearable
      nothingFoundMessage="Không tìm thấy lựa chọn"
      {...props}
    />
  );
}
