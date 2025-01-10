import { IPokemonType } from "./PokemonTypes";

export type IPokeSearchApiParams = {
  limit?: number;
  offset?: number;
}

export type IPokeApiSearchResponseItem = {
  name: string;
  url: string;
};

export type IPokeApiPokemonType = { type: { name: IPokemonType } };

export type IPokeApiPokemonStat = {
  base_stat: number;
  stat: { name: string };
};

export type IPokeApiAbility = {
  ability: { name: string };
  is_hidden: boolean;
};

export type IPokeApiPokemonResponse = {
  id: number;
  name: string;
  types: IPokeApiPokemonType[];
  height: number;
  weight: number;
  abilities: IPokeApiAbility[];
  stats: IPokeApiPokemonStat[];
};

export type IPokemonPreview = {
  url: string;
  name: string;
  id: number;
  types: IPokemonType[];
  image: string;
};

export type IPokemonStat = {
  name: string;
  value: number;
};

export type IPokemonData = {
  id: string;
  name: string;
  types: IPokemonType[];
  image: string;
  sound: string;
  height: number;
  weight: number;
  stats: IPokemonStat[];
  abilities: string[];
};
