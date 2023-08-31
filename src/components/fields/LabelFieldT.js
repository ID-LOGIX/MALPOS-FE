import React from "react";
import { Box, Input, Label, Select, Option } from "../elements";

export default function LabelFieldT({
  label,
  labelDir,
  fieldSize,
  option,
  type,
  name,
  placeholder,
  ...rest
}) {
  return (
    <Box
      className={`mc-label-field-group ${label ? labelDir || "label-col" : ""}`}
    >
      {label && <Label className="mc-label-field-title">{label}</Label>}
      {type ? (
        <Input
          type={type || "text"}
          name={name}
          placeholder={placeholder || "1"}
          className={`mc-label-field-input ${fieldSize || "w-md h-sm"}`}
          {...rest}
        />
      ) : (
        <Select
          className={`mc-label-field-select ${fieldSize || "w-md h-sm"}`}
          {...rest}
        >
          {option.map((item, index) => (
            <Option key={index} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      )}
    </Box>
  );
}
