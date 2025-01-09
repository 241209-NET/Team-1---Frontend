import axios from "axios";
import {
  IPokeApiAbility,
  IPokeApiPokemonResponse,
  IPokeApiPokemonStat,
  IPokeApiPokemonType,
  IPokeApiSearchResponseItem,
  IPokemonData,
  IPokemonPreview,
  IPokemonStat,
  IPokeSearchApiParams,
} from "./types/Pokemon";
import { IPokemonType } from "./types/PokemonTypes";

/** Capitalize the first letter of a string */
export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/** Lowest ID in Pokedex */
export const MIN_POKEMON_ID = 1;
/** Highest ID in Pokedex */
export const MAX_POKEMON_ID = 1025;

/** Get a random Pokemon ID */
export const getRandomPokemonId = () => {
  return (
    Math.floor(Math.random() * (MAX_POKEMON_ID - MIN_POKEMON_ID + 1)) +
    MIN_POKEMON_ID
  );
};

/** Format a Pokemon's ID for the individual Pokemon page */
export const formatPokedexId = (id: number) => {
  return id.toString().padStart(4, "0");
};

/** Get a Pokemon's official artwork image URL from its ID */
export const getPokemonImageUrlFromId = (id: number | string) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

/** Get a Pokemon's cry audio URL from its ID */
export const getPokemonAudioUrlFromId = (id: number | string) => {
  return `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/${id}.ogg`;
};

/** Map a Pokemon's types from a PokeApi response to an array of type strings */
export const mapPokeApiTypesToPokemonTypes = (
  types: IPokeApiPokemonType[]
): IPokemonType[] => {
  return types.map((t) => t.type.name);
};

/** Map a Pokemon's stats from a PokeApi response to an array of IPokemonStat */
export const mapPokeApiStatsToPokemonStats = (
  stats: IPokeApiPokemonStat[]
): IPokemonStat[] => {
  return stats.map((s) => ({
    name: s.stat.name.split("-").map(capitalizeFirstLetter).join(" "),
    value: s.base_stat,
  }));
};

/** Map a Pokemon's non-hidden abilities from a PokeApi response to an array of ability name strings */
export const mapPokeApiAbilitiesToPokemonAbilities = (
  abilities: IPokeApiAbility[]
): string[] => {
  return abilities
    .filter((a) => !a.is_hidden)
    .map((a) => capitalizeFirstLetter(a.ability.name));
};

/** Fetch preview data for a Pokemon from PokeApi */
export const fetchPokemonPreview = async (
  pkmn: IPokeApiSearchResponseItem
): Promise<IPokemonPreview> => {
  const {
    data: { id, types },
  }: { data: IPokeApiPokemonResponse } = await axios.get(pkmn.url);

  return {
    url: pkmn.url,
    name: pkmn.name,
    id,
    types: mapPokeApiTypesToPokemonTypes(types),
    image: getPokemonImageUrlFromId(id),
  };
};

/** Fetch list of Pokemon to display on home page */
export const fetchPokemonList = async (
  options: IPokeSearchApiParams = {}
): Promise<IPokemonPreview[]> => {
  options.limit ??= 20;
  options.offset ??= 0;

  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?offset=${options.offset}&limit=${options.limit}`
  );

  const data = response.data.results as IPokeApiSearchResponseItem[];
  return await Promise.all(data.map((pkmn) => fetchPokemonPreview(pkmn)));
};

/** Fetch full Pokemon data by name or ID */
export const fetchPokemonByNameOrId = async (
  nameOrId: number | string
): Promise<IPokemonData | null> => {
  try {
    const { data }: { data: IPokeApiPokemonResponse } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${nameOrId}`
    );

    return {
      id: formatPokedexId(data.id),
      name: capitalizeFirstLetter(data.name),
      types: mapPokeApiTypesToPokemonTypes(data.types),
      image: getPokemonImageUrlFromId(data.id),
      sound: getPokemonAudioUrlFromId(data.id),
      height: data.height / 10,
      weight: data.weight / 10,
      stats: mapPokeApiStatsToPokemonStats(data.stats),
      abilities: mapPokeApiAbilitiesToPokemonAbilities(data.abilities),
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};
