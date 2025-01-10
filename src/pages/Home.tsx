import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CircularProgress,
  Grid2 as Grid,
  Input,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { IPokemonType, PokemonTypePalette } from "../util/types/PokemonTypes";
import { useEffect, useState } from "react";
import { ExpandMore } from "@mui/icons-material";
import { MdCatchingPokemon } from "react-icons/md";
import { GiCardRandom } from "react-icons/gi";
import { IPokemonPreview } from "../util/types/Pokemon";
import {
  capitalizeFirstLetter,
  fetchPokemonList,
  getRandomPokemonId,
} from "../util/helpers";
import PokemonTypeDisplay from "../components/PokemonTypeDisplay";
import { useNavigate } from "react-router";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedTypes, setSelectedTypes] = useState<IPokemonType[]>([]);
  const [pokemonData, setPokemonData] = useState<IPokemonPreview[]>([]);
  const [searchOffset, setSearchOffset] = useState<number>(0);
  const SEARCH_LIMIT = 20;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialPokemon = async () => {
      setIsLoading(true);

      try {
        const pokemonData = await fetchPokemonList();

        setPokemonData(pokemonData);
      } catch (error) {
        console.error(error);
      }

      setIsLoading(false);
    };

    fetchInitialPokemon();
  }, []);

  const handleToggleType = (type: IPokemonType) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleSearch = () => {
    // TODO: Make search display results instead of navigating to page
    navigate(`/pokemon/${searchInput}`);
  };

  const handleGetRandomPokemon = () => {
    navigate(`/pokemon/${getRandomPokemonId().toString()}`);
  };

  /** Load more Pokemon from PokeApi */
  const handleLoadMorePokemon = () => {
    setIsLoadingMore(true);

    fetchPokemonList({
      offset: searchOffset + SEARCH_LIMIT,
      limit: SEARCH_LIMIT,
    })
      .then((newPokemonData) => {
        setPokemonData([...pokemonData, ...newPokemonData]);
        setSearchOffset(searchOffset + SEARCH_LIMIT);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoadingMore(false);
      });
  };

  const handleClickPokemon = (id: number) => {
    navigate(`/pokemon/${id}`);
  };

  return (
    <Stack sx={{ bgcolor: "#ffffff", px: 6, py: 3, borderRadius: "1rem" }}>
      {/* Search box */}
      <Stack
        spacing={2}
        sx={{ bgcolor: "#ffffff", maxWidth: "1200px", mx: "auto" }}
      >
        {/* Search bar */}
        <Box
          sx={{
            px: 3,
            pt: 2,
            pb: 4,
            mb: 3,
            width: "1000px",
            borderBottom: "1px solid #e2e2e2",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack spacing={1}>
            <Typography variant="h5">Search by name or Pokédex ID:</Typography>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Input
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                }}
                placeholder="Search..."
                disabled={isLoading}
                sx={{ width: "20ch", fontSize: "2rem" }}
              />
              <MdCatchingPokemon
                fontSize="2rem"
                style={{
                  transition: "transform 0.2s",
                  cursor: "pointer",
                  color: "#1876D2",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "rotate(90deg)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "rotate(0deg)";
                }}
                onClick={handleSearch}
              />
            </Stack>
          </Stack>
          <Typography variant="h5">OR</Typography>
          <Button
            variant="contained"
            onClick={handleGetRandomPokemon}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: 2,
            }}
          >
            <GiCardRandom
              style={{ fontSize: "1.5rem", marginRight: "0.8rem" }}
            />
            <Typography>Show me a random Pokémon!</Typography>
          </Button>
        </Box>
        {/* Search filters */}
        <Accordion sx={{ display: "none" }}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="advanced-search-content"
            id="advanced-search"
          >
            <Typography
              component="span"
              sx={{ textAlign: "center", m: "auto" }}
            >
              Advanced Search
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={3}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                <Typography variant="h6">Filter by type:</Typography>
                <Button onClick={() => setSelectedTypes([])}>
                  Unselect All
                </Button>
              </Box>
              <Grid container spacing={2}>
                {Object.entries(PokemonTypePalette).map(
                  ([type, { background, text }]) => (
                    <Grid
                      size={2}
                      key={type}
                      onClick={() => handleToggleType(type as IPokemonType)}
                      sx={{
                        cursor: "pointer",
                        border: selectedTypes.includes(type as IPokemonType)
                          ? "3px solid black"
                          : "3px solid gray",
                        background: background,
                        color: text,
                        width: "14ch",
                        textAlign: "center",
                        borderRadius: "0.5rem",
                      }}
                    >
                      <PokemonTypeDisplay type={type as IPokemonType} />
                    </Grid>
                  )
                )}
              </Grid>
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Stack>

      {/* Results */}
      <Stack>
        <Box
          sx={{
            bgcolor: "#ffffff",
            display: "flex",
            justifyContent: "center",
            py: 3,
            minHeight: "70vh",
          }}
        >
          {isLoading ? (
            <CircularProgress size={100} />
          ) : (
            <Grid container columnGap={2} rowGap={5} sx={{ px: 3 }}>
              {pokemonData.map((pkmn) => (
                <Grid
                  key={pkmn.name}
                  onClick={() => handleClickPokemon(pkmn.id)}
                  sx={{ cursor: "pointer" }}
                >
                  <Paper
                    sx={{ width: "200px", height: "200px", bgcolor: "#F2F2F2" }}
                  >
                    <img
                      src={pkmn.image}
                      alt={pkmn.name}
                      height="200px"
                      width="auto"
                    />
                  </Paper>
                  <Typography variant="h6" sx={{ textAlign: "center" }}>
                    {capitalizeFirstLetter(pkmn.name)}
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ justifyContent: "center" }}
                  >
                    {pkmn.types.map((type) => (
                      <PokemonTypeDisplay type={type} key={type} />
                    ))}
                  </Stack>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Stack>
      <Button onClick={handleLoadMorePokemon} disabled={isLoadingMore}>
        {isLoadingMore ? <CircularProgress size={20} /> : "Load More"}
      </Button>
    </Stack>
  );
}
