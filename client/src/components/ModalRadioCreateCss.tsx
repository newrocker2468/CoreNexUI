import React, { Key, useEffect } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { FC } from "react";

interface ModalRadioCreateCssProps {
  Category: string;
  setCategory: (key: string) => void; // C
  setHtml: (html: string) => void;
  setCss: (css: string) => void;
}



const ModalRadioCreateCss: FC<ModalRadioCreateCssProps> = ({
  Category,
  setCategory,
  setHtml,
  setCss,
}) => {
  const categoryDefaults: { [key: string]: { html: string; css: string } } = {
    button: {
      html: "<button>Default Button</button>",
      css: "button { background-color: blue; color: white; }",
    },
    checkbox: {
      html: '<input type="checkbox" />',
      css: 'input[type="checkbox"] { width: 20px; height: 20px; }',
    },
    switches: {
      html: `<label class="switch">
    <input type="checkbox">
    <span class="slider"></span>
  </label>`,
      css: `/* The switch - the box around the slider */
.switch {
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 3.5em;
  height: 2em;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 30px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 1.4em;
  width: 1.4em;
  border-radius: 20px;
  left: 0.3em;
  bottom: 0.3em;
  background-color: white;
  transition: .4s;
}

.switch input:checked + .slider {
  background-color: #2196F3;
}

.switch input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

.switch input:checked + .slider:before {
  transform: translateX(1.5em);
}`,
    },
    Input: {
      html: `<input type="text" name="text" class="input">`,
      css: `.input {
  max-width: 190px;
}`,
    },
    loaders: {
      html: `<div class="loader"></div>`,
      css: `.loader { }`,
    },
    radiobuttons: {
      html: `<div class="radio-input">
  <input type="radio" id="value-1" name="value-radio" value="value-1">
  <input type="radio" id="value-2" name="value-radio" value="value-2">
  <input type="radio" id="value-3" name="value-radio" value="value-3">
</div>`,
      css: `.radio-input input {

}`,
    },
    Forms: {
      html: `<form class="form">
    <input type="text" class="input">
    <input type="text" class="input"> 
    <button>Submit</button>
</form>`,
      css: `.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form button {
  align-self: flex-end;
}
    `,
    },
    patterns: {
      html: `<div class="container"></div>`,
      css: `.container {
  width: 100%;
  height: 100%;
  /* Add your background pattern here */
  background: lightblue;
}`,
    },
    cards: {
      html: `<div class="card"></div>`,
      css: `.card {
  width: 190px;
  height: 254px;
  background: lightgrey;
}`,
    },
    tooltips: {
      html: `<div class="tooltip-container">
  <span class="tooltip">Uiverse.io</span>
  <span class="text">Tooltip</span>
</div>`,
      css: `/* This is an example, feel free to delete this code */
.tooltip-container {
  --background: #22d3ee;
  position: relative;
  background: var(--background);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 17px;
  padding: 0.7em 1.8em;
}

.tooltip {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.3em 0.6em;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s;
  background: var(--background);
}

.tooltip::before {
  position: absolute;
  content: "";
  height: 0.6em;
  width: 0.6em;
  bottom: -0.2em;
  left: 50%;
  transform: translate(-50%) rotate(45deg);
  background: var(--background);
}

.tooltip-container:hover .tooltip {
  top: -100%;
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}`,
    },
  };

const handleCategoryChange = (value: Key) => {
  const strValue = value.toString();
  setCategory(strValue);
  if (categoryDefaults[strValue]) {
    setHtml(categoryDefaults[strValue].html);
    setCss(categoryDefaults[strValue].css);
  }
};

useEffect(() => {
  if (!Category) handleCategoryChange("button");
}, [Category]);

  return (
    <div className='flex w-full flex-wrap md:flex-nowrap gap-4 align-center justify-center'>
      <Autocomplete
        label='Elements Category'
        placeholder='Select your Css element'
        className='max-w-xs'
        isClearable={false}
        selectedKey={Category}
        onSelectionChange={handleCategoryChange}
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
        <AutocompleteItem key={"Input"} value='Input'>
          Input
        </AutocompleteItem>
        <AutocompleteItem key={"loaders"} value='loaders'>
          Loaders
        </AutocompleteItem>
        <AutocompleteItem key={"radiobuttons"} value='radiobuttons'>
          Radio Buttons
        </AutocompleteItem>
        <AutocompleteItem key={"cards"} value='cards'>
          Cards
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
};
export default ModalRadioCreateCss;
