import { Select } from "antd";

import { categories } from "@/features/book-page/consts/book-categories";
import { TCategorySelectProps } from "@/features/book-page/types";

const { Option } = Select;

export const CategorySelect: React.FC<TCategorySelectProps> = ({
  selectedCategories,
  onChangeCategories,
}) => (
  <Select
    mode="multiple"
    placeholder="Select Categories"
    onChange={onChangeCategories}
    value={selectedCategories}
    style={{ width: "300px", height: 32 }}
    size="small"
    maxTagCount={2}
    maxCount={2}
  >
    {categories.map((category) => (
      <Option key={category} value={category}>
        {category}
      </Option>
    ))}
  </Select>
);
