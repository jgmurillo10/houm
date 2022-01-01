import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Checkbox from '@mui/material/Checkbox';

type PropsCombo = {
  onChange: (e: React.SyntheticEvent<Element, Event>, value: {label: string, value: string} | null) => void;
};

export function ComboBox({ onChange } : PropsCombo) {
  return (
    <Autocomplete
      sx={{ my: 2 }}
      onChange={onChange}
      disablePortal
      options={diets}
      renderInput={(params) => <TextField {...params} label="Diet" />}
    />
  );
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

type Props = {
  onChange: (e: React.SyntheticEvent<Element, Event>, value: string[]) => void;
};

export function CheckboxesTags({ onChange }: Props) {
  return (
    <Autocomplete
      sx={{ my: 2 }}
      multiple
      onChange={onChange}
      id="checkboxes-tags-demo"
      options={cuisines}
      disableCloseOnSelect
      getOptionLabel={(option) => option}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option}
        </li>
      )}
      renderInput={(params) => (
        <TextField {...params} label="Cuisine" placeholder="Favorites" />
      )}
    />
  );
}

const diets = [
  { label: 'Pescetarian', value: 'pescetarian' },
  { label: 'Lacto vegetarian', value: 'lacto vegetarian' },
  { label: 'Ovo vegetarian', value: 'ovo vegetarian' },
  { label: 'Vegan', value: 'vegan' },
  { label: 'Vegetarian', value: 'vegetarian' },
];

const cuisines = [
  'african', 'chinese', 'japanese', 'korean', 'vietnamese', 'thai', 'indian',
  'british', 'irish', 'french', 'italian', 'mexican', 'spanish',
  'middle eastern', 'jewish', 'american', 'cajun', 'southern', 'greek',
  'german', 'nordic', 'eastern european', 'caribbean', 'latin american',
];
