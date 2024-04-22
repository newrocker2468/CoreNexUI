import React from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

export default function App() {
  return (
    <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
      <Autocomplete
        label='Favorite Animal'
        placeholder='Select your Css element'
        className='max-w-xs'
        isClearable ={false}
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
          Autocomplete
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
    </div>
  );
}
