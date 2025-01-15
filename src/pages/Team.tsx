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
import { Navigate, useNavigate } from "react-router";
import { MdMenuBook } from "react-icons/md";
import { axiosInstance } from "../util/axios";

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
    const fetchTeam = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/trainer/team/${trainerName}`
        );
        setTeam(data[0].team);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTeam();
    setLoading(false);
  }, []);

  const handleRemovePokemon = async (id: number) => {
    try {
      const { data } = await axiosInstance.delete(`/pokemon/delete/${id}`);
      console.info(data);
      setTeam(team.filter((pokemon) => pokemon.id !== id));
    } catch (err) {
      console.error(err);
    }
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

  const handleSaveRename = async () => {
    try {
      const { data } = await axiosInstance.patch("/pokemon/update", {
        id: renameDialogPokemon!.id,
        name: renameDialogInput,
      });
      console.info(data);
      setTeam(
        team.map((pokemon) =>
          pokemon.id === renameDialogPokemon!.id
            ? { ...pokemon, name: renameDialogInput }
            : pokemon
        )
      );
    } catch (err) {
      console.error(err);
    } finally {
      handleCloseDialog();
    }
  };

  const handleViewInPokedex = (pokedexId: number) => {
    navigate(`/pokemon/${pokedexId}`);
  };

  // if (!trainerId) return <Navigate to="/login" />;

  return (
    <Fragment>
      <Stack
        spacing={2}
        sx={{
          mt: 2,
          py: 2,
          borderRadius: "1rem",
          alignitems: "center",
          width: "1000px",
          height: "800px",
          bgcolor: "#ffffff",
        }}
      >
        <Typography
          variant="h4"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          {trainerName ?? "Trainer"}'s Team
        </Typography>
        {loading ? (
          <CircularProgress size={100} />
        ) : (
          <Stack spacing={1} sx={{ alignItems: "center" }}>
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
                  sx={{
                    bgcolor: "#f2f2f2",
                    px: 3,
                    boxShadow: 3,
                    width: "500px",
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={2.5}
                    sx={{ alignItems: "center" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        transition: "transform 0.2s",
                        "&:hover": { transform: "scale(1.1)" },
                      }}
                    >
                      <img
                        src={getPokemonImageUrlFromId(pokemon.dexNumber)}
                        width="90"
                        height="90"
                      />
                    </Box>
                    <Stack
                      sx={{
                        borderLeft: "1px solid #000000",
                        paddingLeft: "1rem",
                        width: "40ch",
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {pokemon.name}
                      </Typography>
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
                        onClick={() => handleViewInPokedex(pokemon.dexNumber)}
                        style={{ cursor: "pointer", color: "#000000" }}
                      />
                    </Box>
                  </Tooltip>
                </Stack>
              </Stack>
            ))}
            {Array.from({ length: 6 - team.length }).map((_, index) => (
              <Parallelogram
                key={index}
                angle={-15}
                sx={{
                  bgcolor: "#f2f2f2",
                  px: 3,
                  boxShadow: 3,
                  height: "90px",
                  width: "500px",
                }}
              />
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
