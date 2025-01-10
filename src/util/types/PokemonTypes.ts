export const PokemonTypeList = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dark",
  "dragon",
  "steel",
  "fairy",
] as const;

export type IPokemonType = (typeof PokemonTypeList)[number];

type IPokemonTypePalette = {
  [key in IPokemonType]: {
    background: string;
    text: string;
  };
};

export const PokemonTypePalette: IPokemonTypePalette = {
  normal: {
    background: "#A8A77A",
    text: "#000000",
  },
  fire: {
    background: "#EE8130",
    text: "#FFFFFF",
  },
  water: {
    background: "#6390F0",
    text: "#FFFFFF",
  },
  electric: {
    background: "#F7D02C",
    text: "#000000",
  },
  grass: {
    background: "#7AC74C",
    text: "#000000",
  },
  ice: {
    background: "#96D9D6",
    text: "#000000",
  },
  fighting: {
    background: "#D56723",
    text: "#FFFFFF",
  },
  poison: {
    background: "#B97FC9",
    text: "#FFFFFF",
  },
  ground: {
    background: "linear-gradient(180deg, #F7DE3F 50%, #AB9841 50%)",
    text: "#000000",
  },
  flying: {
    background: "linear-gradient(180deg, #3CC7EF 50%, #BDB9B8 50%)",
    text: "#000000",
  },
  psychic: {
    background: "#F95587",
    text: "#FFFFFF",
  },
  bug: {
    background: "#A6B91A",
    text: "#000000",
  },
  rock: {
    background: "#B6A136",
    text: "#000000",
  },
  ghost: {
    background: "#735797",
    text: "#FFFFFF",
  },
  dark: {
    background: "#707070",
    text: "#FFFFFF",
  },
  dragon: {
    background: "linear-gradient(180deg, #53A4CF 50%, #F16E57 50%)",
    text: "#000000",
  },
  steel: {
    background: "#B7B7CE",
    text: "#000000",
  },
  fairy: {
    background: "#e49cc0",
    text: "#000000",
  },
};
