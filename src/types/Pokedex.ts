import { IPokemonType } from "./PokemonTypes";

export const MIN_POKEMON_ID = 1;
export const MAX_POKEMON_ID = 1025;

export const getRandomPokemonId = () => {
  return (
    Math.floor(Math.random() * (MAX_POKEMON_ID - MIN_POKEMON_ID + 1)) +
    MIN_POKEMON_ID
  );
};

export type IPokemonPreview = {
  url: string;
  name: string;
  id: number;
  types: IPokemonType[];
  image: string;
}

export type IPokeApiSearchResponseItem = {
  name: string;
  url: string;
}
