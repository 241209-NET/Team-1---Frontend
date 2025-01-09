import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IPokemonPreview } from "../types/Pokedex";
import { fetchPokemonByNameOrId, fetchPokemonPreview } from "../util/helpers";

export default function Pokemon() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pokemonData, setPokemonData] = useState<IPokemonPreview | null>(null);
  const id = useParams().id ?? "";

  useEffect(() => {
    const fetchPokemon = async () => {
      setIsLoading(true);

      try {
        const data = await fetchPokemonByNameOrId(id);
        setPokemonData(data);
      } catch (error) {
        console.error(error);
      }

      setIsLoading(false);
    };

    fetchPokemon();
  }, [id]);

  if (isLoading) {
    return (
      <Box>
        <CircularProgress size={200} />
      </Box>
    );
  }

  if (pokemonData !== null) {
    return (
      <Box>
        <h1>{pokemonData.name}</h1>
      </Box>
    );
  } else
    return (
      <Box>
        <h1>Pokemon not found</h1>
      </Box>
    );
}
