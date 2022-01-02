import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Checkbox from '@mui/material/Checkbox';
import { OptionI } from '../../common/types';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

type PropsCombo = {
  onChange: (e: React.SyntheticEvent<Element, Event>, value: {label: string, value: string} | null) => void;
  value: {label: string, value: string} | null;
  options: { label: string; value: string; }[];
  label: string;
};

export function ComboBox({ onChange, value, options, label } : PropsCombo) {
  return (
    <Autocomplete
      sx={{ my: 2 }}
      onChange={onChange}
      disablePortal
      options={options}
      isOptionEqualToValue={
        (option : OptionI, value : OptionI) => option.value === value.value
      }
      value={value}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}

type Props = {
  onChange: (e: React.SyntheticEvent<Element, Event>, value: string[]) => void;
  value: string[];
};

export function CheckboxesTags({ onChange, value }: Props) {
  return (
    <Autocomplete
      sx={{ my: 2 }}
      multiple
      onChange={onChange}
      id="checkboxes-tags-demo"
      options={cuisines}
      disableCloseOnSelect
      value={value}
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

const cuisines = [
  'african', 'chinese', 'japanese', 'korean', 'vietnamese', 'thai', 'indian',
  'british', 'irish', 'french', 'italian', 'mexican', 'spanish',
  'middle eastern', 'jewish', 'american', 'cajun', 'southern', 'greek',
  'german', 'nordic', 'eastern european', 'caribbean', 'latin american',
];
