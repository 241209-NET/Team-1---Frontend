import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid2 as Grid,
  Input,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import { IPokemonData } from "../util/types/Pokemon";
import { fetchPokemonByNameOrId } from "../util/helpers";
import { useAuth } from "../util/auth/AuthContext";
import wtpImgUrl from "../assets/whos-that-pokemon.png";
import { axiosInstance } from "../util/axios";

export default function Pokemon() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pokemonData, setPokemonData] = useState<IPokemonData | null>(null);
  const [dialogInput, setDialogInput] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const id = useParams().id ?? "";
  const { id: trainerId } = useAuth();

  useEffect(() => {
    const fetchPokemon = async () => {
      setIsLoading(true);
      setPokemonData(await fetchPokemonByNameOrId(id));

      setTimeout(() => {
        setDialogInput(pokemonData?.name ?? "");
      }, 200);
      setIsLoading(false);
    };

    fetchPokemon();
  }, [id]);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setTimeout(() => {
      setDialogInput(pokemonData?.name ?? "");
    }, 100);
  };

  const handleAddPokemonToTeam = async () => {
    try {
      const res = await axiosInstance.post("/pokemon", {
        dexNumber: pokemonData!.id,
        species: pokemonData!.name,
        name: dialogInput,
        trainerID: trainerId,
      });
      console.info(res.data);
      handleCloseDialog();
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <Box>
        <CircularProgress size={200} />
      </Box>
    );
  }

  // TODO: Evolution chain
  // TODO: Flavor text
  // TODO: Display error if team is full
  if (pokemonData !== null) {
    return (
      <Fragment>
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
          <Button
            variant="contained"
            onClick={handleOpenDialog}
            disabled={!trainerId}
            sx={{ width: "20ch" }}
          >
            Add to My Team
          </Button>
        </Stack>
        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>
            What would you like to rename your {pokemonData?.name} to?
          </DialogTitle>
          <DialogContent>
            <Stack spacing={3}>
              <Input
                value={dialogInput}
                onChange={(e) => setDialogInput(e.target.value)}
                inputProps={{ sx: { textAlign: "center" } }}
              />
              <Stack
                direction="row"
                spacing={2}
                sx={{ justifyContent: "center" }}
              >
                <Button variant="outlined" onClick={handleCloseDialog}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleAddPokemonToTeam}>
                  Save
                </Button>
              </Stack>
            </Stack>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  } else
    return (
      <Stack spacing={2} sx={{ textAlign: "center", mt: 4, py: 3, px: 8 }}>
        <Typography variant="h3">Who's that Pokémon?</Typography>
        <img
          src={wtpImgUrl}
          width="1000"
          height="550"
          style={{ borderRadius: "0.5rem", boxShadow: "0 0 4px #00000099" }}
        />
        <Typography variant="h4">...we're not sure.</Typography>
      </Stack>
    );
}
