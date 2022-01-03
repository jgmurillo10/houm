import { styled } from "@mui/material";

const List = styled('ol')(({ theme }) => ({
  listStyle: 'none',
  counterReset: 'custom-counter',
  '& li': {
    counterIncrement: 'custom-counter',
    position: 'relative',
    marginBottom: theme.spacing(4),
  },
  '& li::before': {
    content: `counter(custom-counter)`,
    color: 'white',
    fontWeight: 'bold',
    background: theme.palette.primary.main,
    borderRadius: '50%',
    padding: theme.spacing(1),
    position: 'absolute',
    left: -48,
    top: -10,
    height: 40,
    width: 40,
    display: 'block',
    textAlign: 'center'
  }
}));

interface RecipesListI {
  items: {
    step : string;
  }[]
}

const RecipeList = ({items} : RecipesListI) => {
  return (
    <List>
      {items.map((step, i) => (
        <li key={i}>{step.step}</li>
      ))}
    </List>
  );
}

export default RecipeList;
