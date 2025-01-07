export const PokemonTypeList = [
  "Normal",
  "Fire",
  "Water",
  "Electric",
  "Grass",
  "Ice",
  "Fighting",
  "Poison",
  "Ground",
  "Flying",
  "Psychic",
  "Bug",
  "Rock",
  "Ghost",
  "Dark",
  "Dragon",
  "Steel",
  "Fairy",
] as const;

export type IPokemonType = (typeof PokemonTypeList)[number];

type IPokemonTypePalette = {
  [key in IPokemonType]: {
    background: string;
    text: string;
  };
};

export const PokemonTypePalette: IPokemonTypePalette = {
  Normal: {
    background: "#A8A77A",
    text: "#000000",
  },
  Fire: {
    background: "#EE8130",
    text: "#FFFFFF",
  },
  Water: {
    background: "#6390F0",
    text: "#FFFFFF",
  },
  Electric: {
    background: "#F7D02C",
    text: "#000000",
  },
  Grass: {
    background: "#7AC74C",
    text: "#000000",
  },
  Ice: {
    background: "#96D9D6",
    text: "#000000",
  },
  Fighting: {
    background: "#D56723",
    text: "#FFFFFF",
  },
  Poison: {
    background: "#B97FC9",
    text: "#FFFFFF",
  },
  Ground: {
    background: "linear-gradient(180deg, #F7DE3F 50%, #AB9841 50%)",
    text: "#000000",
  },
  Flying: {
    background: "linear-gradient(180deg, #3CC7EF 50%, #BDB9B8 50%)",
    text: "#000000",
  },
  Psychic: {
    background: "#F95587",
    text: "#FFFFFF",
  },
  Bug: {
    background: "#A6B91A",
    text: "#000000",
  },
  Rock: {
    background: "#B6A136",
    text: "#000000",
  },
  Ghost: {
    background: "#735797",
    text: "#FFFFFF",
  },
  Dark: {
    background: "#707070",
    text: "#FFFFFF",
  },
  Dragon: {
    background: "linear-gradient(180deg, #53A4CF 50%, #F16E57 50%)",
    text: "#000000",
  },
  Steel: {
    background: "#B7B7CE",
    text: "#000000",
  },
  Fairy: {
    background: "#e49cc0",
    text: "#000000",
  },
};
