import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Input,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useAuth } from "../util/auth/AuthContext";
import { Fragment, useEffect, useState } from "react";
import { ITrainerPokemon } from "../util/types/Trainer";
import Parallelogram from "../components/Parallelogram";
import { getPokemonImageUrlFromId } from "../util/helpers";
import { BiSolidNoEntry } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router";
import { MdMenuBook } from "react-icons/md";

export default function Team() {
  const { id: trainerId, name: trainerName } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [team, setTeam] = useState<ITrainerPokemon[]>([]);
  const [renameDialogInput, setRenameDialogInput] = useState<string>("");
  const [renameDialogOpen, setRenameDialogOpen] = useState<boolean>(false);
  const [renameDialogPokemon, setRenameDialogPokemon] =
    useState<ITrainerPokemon | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: Fetch team from API
    const fetchTeam = async () => {
      setTeam([
        { id: 1, number: 1, species: "Bulbasaur", name: "Bulby" },
        { id: 2, number: 4, species: "Charmander", name: "Charlie" },
        { id: 3, number: 7, species: "Squirtle", name: "Squirt" },
      ]);
    };

    fetchTeam();
    setLoading(false);
  }, []);

  const handleRemovePokemon = (id: number) => {
    // TODO: Remove Pokemon from team in API
    setTeam(team.filter((pokemon) => pokemon.id !== id));
  };

  const handleOpenDialog = () => {
    setRenameDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setRenameDialogOpen(false);
    setTimeout(() => {
      setRenameDialogInput("");
      setRenameDialogPokemon(null);
    }, 100);
  };

  const handleSaveRename = () => {
    // TODO: Save new nickname to API
    handleCloseDialog();
  };

  const handleViewInPokedex = (pokedexId: number) => {
    navigate(`/pokemon/${pokedexId}`);
  };

  // TODO: Redirect to login page if not logged in

  return (
    <Fragment>
      <Stack sx={{ mt: 4 }} spacing={2}>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          {trainerName ?? "Trainer"}'s Team
        </Typography>
        {loading ? (
          <CircularProgress size={100} />
        ) : (
          <Stack spacing={0.5}>
            {team.map((pokemon) => (
              <Stack
                key={pokemon.id}
                direction="row"
                spacing={2}
                sx={{ alignItems: "center" }}
              >
                <Tooltip
                  placement="top"
                  title={`Remove ${pokemon.name} from team`}
                >
                  <Box>
                    <BiSolidNoEntry
                      size={32}
                      onClick={() => handleRemovePokemon(pokemon.id)}
                      style={{ cursor: "pointer", color: "#ff3e3e" }}
                    />
                  </Box>
                </Tooltip>
                <Parallelogram
                  angle={-15}
                  sx={{ bgcolor: "#f2f2f2", px: 3, width: "400px" }}
                >
                  <Stack
                    direction="row"
                    spacing={2.5}
                    sx={{ alignItems: "center" }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={getPokemonImageUrlFromId(pokemon.number)}
                        width="90"
                        height="90"
                      />
                    </Box>
                    <Stack>
                      <Typography variant="h4">{pokemon.name}</Typography>
                      <Typography variant="h6">{pokemon.species}</Typography>
                    </Stack>
                  </Stack>
                </Parallelogram>
                <Stack>
                  <Tooltip
                    placement="top"
                    title={`Edit ${pokemon.name}'s nickname`}
                  >
                    <Box>
                      <CiEdit
                        size={32}
                        onClick={() => {
                          setRenameDialogPokemon(pokemon);
                          setRenameDialogInput(pokemon.name);
                          handleOpenDialog();
                        }}
                        style={{ cursor: "pointer", color: "#000000" }}
                      />
                    </Box>
                  </Tooltip>
                  <Tooltip
                    placement="top"
                    title={`View ${pokemon.species} in Pokédex`}
                  >
                    <Box>
                      <MdMenuBook
                        size={32}
                        onClick={() => handleViewInPokedex(pokemon.number)}
                        style={{ cursor: "pointer", color: "#000000" }}
                      />
                    </Box>
                  </Tooltip>
                </Stack>
              </Stack>
            ))}
          </Stack>
        )}
      </Stack>
      <Dialog open={renameDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          What would you like to rename your {renameDialogPokemon?.species} to?
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            <Input
              value={renameDialogInput}
              onChange={(e) => setRenameDialogInput(e.target.value)}
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
              <Button variant="contained" onClick={handleSaveRename}>
                Save
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
