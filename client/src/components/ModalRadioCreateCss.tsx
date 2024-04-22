import React, { useState } from "react";
import { Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";

export default function App() {
  const [selectedValue, setSelectedValue] = useState(null);

  return (
    <div className='flex w-full flex-wrap md:flex-nowrap gap-4 align-center justify-center'>
      <Autocomplete
        label='Css element category'
        placeholder='Select your element Category'
        className='max-w-xs'
        onSearch={(value) => setSelectedValue(value)}
      >
        <AutocompleteItem key={"button"} value='button'>
          Button
        </AutocompleteItem>
        <AutocompleteItem key={"checkbox"} value='checkbox'>
          Checkbox
        </AutocompleteItem>
        <AutocompleteItem key={"switches"} value='toggleswitches'>
          Switches
        </AutocompleteItem>
        <AutocompleteItem key={"cards"} value='cards'>
          Input
        </AutocompleteItem>
        <AutocompleteItem key={"loaders"} value='loaders'>
          Loaders
        </AutocompleteItem>
        <AutocompleteItem key={"radio"} value='radiobuttons'>
          Radio Buttons
        </AutocompleteItem>
        <AutocompleteItem key={"Forms"} value='Forms'>
          Forms
        </AutocompleteItem>
        <AutocompleteItem key={"patterns"} value='patterns'>
          Patterns
        </AutocompleteItem>
        <AutocompleteItem key={"tooltips"} value='tooltips'>
          Tooltips
        </AutocompleteItem>
      </Autocomplete>
      {selectedValue === null && <p>Please select a value</p>}
      <Button disabled={selectedValue === null}>Submit</Button>
    </div>
  );
}
