import React from "react";
import { RadioGroup, Radio } from "@nextui-org/react";

export default function App() {
  const [selected, setSelected] = React.useState("london");

  return (
    <div className='flex flex-col gap-3'>
      <RadioGroup
        label='Select your favorite city'
        value={selected}
        onValueChange={setSelected}
      >
        <Radio value='buenos-aires'>Button</Radio>
        <Radio value='sydney'>Button</Radio>
        <Radio value='san-francisco'>Button</Radio>
        <Radio value='london'>London</Radio>
        <Radio value='tokyo'>Tokyo</Radio>
      </RadioGroup>
      <p className='text-default-500 text-small'>Selected: {selected}</p>
    </div>
  );
}
