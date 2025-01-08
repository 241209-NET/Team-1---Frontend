import { IPokemonType, PokemonTypePalette } from "../types/PokemonTypes";
import { Typography } from "@mui/material";
import { capitalizeFirstLetter } from "../util/helpers";

type Props = {
  type: IPokemonType;
};

export default function PokemonTypeDisplay({ type }: Props) {
  return (
    <Typography
      sx={{
        background: PokemonTypePalette[type].background,
        color: PokemonTypePalette[type].text,
        width: "10ch",
        borderRadius: "0.1rem",
        display: "inline-block",
        textAlign: "center",
      }}
    >
      {capitalizeFirstLetter(type)}
    </Typography>
  );
}
