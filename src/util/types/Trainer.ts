export type ITrainerLoginDTO = {
  username: string;
  password: string;
};

export type ITrainerRegisterDTO = {
  name: string;
  username: string;
  password: string;
};

export type IAddPokemonDTO = {
  number: number;
  species: string;
  name: string;
};

export type ITrainerPokemon = {
  id: number;
  number: number;
  species: string;
  name: string;
};
