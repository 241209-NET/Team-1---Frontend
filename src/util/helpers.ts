import axios from "axios";
import { IPokeApiSearchResponseItem } from "../types/Pokedex";
import { IPokemonType } from "../types/PokemonTypes";

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const fetchPokemonPreview = async (pkmn: IPokeApiSearchResponseItem) => {
  const response = await axios.get(pkmn.url);
  const { id, types } = response.data;

  return {
    url: pkmn.url,
    name: pkmn.name,
    id,
    types: types.map((t: { type: { name: IPokemonType } }) => t.type.name),
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
  };
};

export const fetchPokemonList = async (offset = 0, limit = 20) => {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  );

  const data = response.data.results as IPokeApiSearchResponseItem[];
  return await Promise.all(data.map((pkmn) => fetchPokemonPreview(pkmn)));
};

export const fetchPokemonByNameOrId = async (nameOrId: string) => {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${nameOrId}`
  );

  return response.data;
};
