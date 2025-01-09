import {
  Box,
  Button,
  CircularProgress,
  Grid2 as Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IPokemonData } from "../util/types/Pokemon";
import { fetchPokemonByNameOrId } from "../util/helpers";

export default function Pokemon() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pokemonData, setPokemonData] = useState<IPokemonData | null>(null);
  const id = useParams().id ?? "";

  useEffect(() => {
    const fetchPokemon = async () => {
      setIsLoading(true);

      setPokemonData(await fetchPokemonByNameOrId(id));

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

  // TODO: Evolution chain
  if (pokemonData !== null) {
    return (
      <Stack
        spacing={3}
        sx={{
          bgcolor: "#fff",
          width: "1000px",
          minHeight: "800px",
          px: "3rem",
          py: "2rem",
          alignItems: "center",
          borderRadius: "1rem",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          <span style={{ marginRight: "0.4ch" }}>{pokemonData.name}</span>
          <span style={{ color: "#616161" }}>#{pokemonData.id}</span>
        </Typography>
        <Stack direction="row" sx={{ justifyContent: "center" }}>
          <Paper sx={{ bgcolor: "#F2F2F2" }}>
            <img src={pokemonData.image} width="300" height="300" />
          </Paper>
          <Paper sx={{ bgcolor: "#F2F2F2", width: "500px" }}>
            <Grid container sx={{ px: 5, py: 1 }}>
              <Grid size={6}>
                <Typography variant="h6">Height</Typography>
                <Typography>{pokemonData.height.toFixed(1)} m</Typography>
              </Grid>
              <Grid size={6}>
                <Typography variant="h6">Abilities</Typography>
                {pokemonData.abilities.map((ability) => (
                  <Typography key={ability}>{ability}</Typography>
                ))}
              </Grid>
              <Grid size={6}>
                <Typography variant="h6">Weight</Typography>
                <Typography>{pokemonData.weight.toFixed(1)} kg</Typography>
              </Grid>
              <Grid size={6}>
                <Typography variant="h6">Base Stats</Typography>
                {pokemonData.stats.map((stat) => (
                  <Typography key={stat.name}>
                    <span style={{ fontSize: "0.8rem" }}>
                      {stat.name.toUpperCase()}
                    </span>
                    : {stat.value}
                  </Typography>
                ))}
              </Grid>
              <Grid size={12}>
                <audio controls src={pokemonData.sound} />
              </Grid>
            </Grid>
          </Paper>
        </Stack>

        <Button variant="contained" sx={{ width: "20ch" }}>
          Add to My Team
        </Button>
      </Stack>
    );
  } else
    return (
      <Box>
        <h1>Pokemon not found</h1>
      </Box>
    );
}
