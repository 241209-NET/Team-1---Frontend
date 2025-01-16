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
  const {
    id: trainerId,
    name: trainerName,
    setName: setTrainerName,
    logout,
  } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [team, setTeam] = useState<ITrainerPokemon[]>([]);
  // Rename Pokemon dialog
  const [renamePkmnDialogInput, setRenamePkmnDialogInput] =
    useState<string>("");
  const [renamePkmnDialogOpen, setRenamePkmnDialogOpen] =
    useState<boolean>(false);
  const [renamePkmnDialogPokemon, setRenamePkmnDialogPokemon] =
    useState<ITrainerPokemon | null>(null);
  // Rename Trainer dialog
  const [renameTrainerDialogInput, setRenameTrainerDialogInput] =
    useState<string>("");
  const [renameTrainerDialogOpen, setRenameTrainerDialogOpen] =
    useState<boolean>(false);
  // Delete Trainer dialog
  const [deleteTrainerDialogOpen, setDeleteTrainerDialogOpen] =
    useState<boolean>(false);
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

  useEffect(() => {
    setRenameTrainerDialogInput(trainerName ?? "");
  }, [trainerName]);

  const handleRemovePokemon = async (id: number) => {
    try {
      const { data } = await axiosInstance.delete(`/pokemon/delete/${id}`);
      console.info(data);
      setTeam(team.filter((pokemon) => pokemon.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenRenamePkmnDialog = () => {
    setRenamePkmnDialogOpen(true);
  };

  const handleCloseRenamePkmnDialog = () => {
    setRenamePkmnDialogOpen(false);
    setTimeout(() => {
      setRenamePkmnDialogInput("");
      setRenamePkmnDialogPokemon(null);
    }, 100);
  };

  const handleSaveRenamePkmn = async () => {
    try {
      const { data } = await axiosInstance.patch("/pokemon/update", {
        id: renamePkmnDialogPokemon!.id,
        name: renamePkmnDialogInput,
      });
      console.info(data);
      setTeam(
        team.map((pokemon) =>
          pokemon.id === renamePkmnDialogPokemon!.id
            ? { ...pokemon, name: renamePkmnDialogInput }
            : pokemon
        )
      );
    } catch (err) {
      console.error(err);
    } finally {
      handleCloseRenamePkmnDialog();
    }
  };

  const handleViewInPokedex = (pokedexId: number) => {
    navigate(`/pokemon/${pokedexId}`);
  };

  const handleOpenRenameTrainerDialog = () => {
    setRenameTrainerDialogOpen(true);
  };

  const handleCloseRenameTrainerDialog = () => {
    setRenameTrainerDialogOpen(false);
    setTimeout(() => {
      setRenameTrainerDialogInput(trainerName ?? "");
    }, 100);
  };

  const handleSaveRenameTrainer = async () => {
    try {
      const { data } = await axiosInstance.patch("/trainer/update", {
        id: trainerId,
        name: renameTrainerDialogInput,
      });
      console.info(data);
      setTrainerName(renameTrainerDialogInput);
    } catch (err) {
      console.error(err);
    } finally {
      handleCloseRenameTrainerDialog();
    }
  };

  const handleOpenDeleteTrainerDialog = () => {
    setDeleteTrainerDialogOpen(true);
  };

  const handleCloseDeleteTrainerDialog = () => {
    setDeleteTrainerDialogOpen(false);
  };

  const handleDeleteTrainer = async () => {
    try {
      const { data } = await axiosInstance.delete(
        `/trainer/delete/${trainerName}`
      );
      console.info(data);
      logout();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  if (!trainerId) return <Navigate to="/login" />;

  return (
    <Fragment>
      <Box sx={{ position: "relative" }}>
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
                            setRenamePkmnDialogPokemon(pokemon);
                            setRenamePkmnDialogInput(pokemon.name);
                            handleOpenRenamePkmnDialog();
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
        <Stack spacing={2}>
          <Button
            variant="contained"
            onClick={handleOpenRenameTrainerDialog}
            sx={{ position: "absolute", bottom: 10, left: 10 }}
          >
            Rename Trainer
          </Button>
          <Button
            variant="contained"
            onClick={handleOpenDeleteTrainerDialog}
            sx={{
              bgcolor: "#f52d2d",
              position: "absolute",
              bottom: 10,
              right: 10,
            }}
          >
            Delete Trainer
          </Button>
        </Stack>
      </Box>
      {/* Rename Pokemon dialog */}
      <Dialog open={renamePkmnDialogOpen} onClose={handleCloseRenamePkmnDialog}>
        <DialogTitle>
          What would you like to rename your {renamePkmnDialogPokemon?.species}{" "}
          to?
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            <Input
              value={renamePkmnDialogInput}
              onChange={(e) => setRenamePkmnDialogInput(e.target.value)}
              inputProps={{ sx: { textAlign: "center" } }}
            />
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "center" }}
            >
              <Button variant="outlined" onClick={handleCloseRenamePkmnDialog}>
                Cancel
              </Button>
              <Button
                variant="contained"
                disabled={!renamePkmnDialogInput.trim()}
                onClick={handleSaveRenamePkmn}
              >
                Save
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
      {/* Rename Trainer dialog */}
      <Dialog
        open={renameTrainerDialogOpen}
        onClose={handleCloseRenameTrainerDialog}
      >
        <DialogTitle>
          What would you like to rename your Trainer to?
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            <Input
              value={renameTrainerDialogInput}
              onChange={(e) => setRenameTrainerDialogInput(e.target.value)}
              inputProps={{ sx: { textAlign: "center" } }}
            />
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "center" }}
            >
              <Button
                variant="outlined"
                onClick={handleCloseRenameTrainerDialog}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                disabled={!renameTrainerDialogInput.trim()}
                onClick={handleSaveRenameTrainer}
              >
                Save
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
      {/* Delete Trainer dialog */}
      <Dialog
        open={deleteTrainerDialogOpen}
        onClose={handleCloseDeleteTrainerDialog}
      >
        <DialogTitle>
          Are you sure you want to delete your Trainer account?
        </DialogTitle>
        <DialogContent>
          <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
            <Button variant="outlined" onClick={handleCloseDeleteTrainerDialog}>
              No
            </Button>
            <Button variant="contained" onClick={handleDeleteTrainer}>
              Yes
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
