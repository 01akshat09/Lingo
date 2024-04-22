import { Datagrid, List, NumberField } from "react-admin";

export const CourseList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <NumberField source="id" />
        <NumberField source="title" />
        <NumberField source="imgSrc" />
      </Datagrid>
    </List>
  );
};
