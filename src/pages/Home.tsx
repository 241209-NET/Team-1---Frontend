import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid2 as Grid,
  Input,
  Stack,
  Typography,
} from "@mui/material";
import { IPokemonType, PokemonTypePalette } from "../types/PokemonTypes";
import { useState } from "react";
import { ExpandMore } from "@mui/icons-material";
import { MdCatchingPokemon } from "react-icons/md";
import { GiCardRandom } from "react-icons/gi";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedTypes, setSelectedTypes] = useState<IPokemonType[]>([]);

  const handleToggleType = (type: IPokemonType) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleSearch = () => {
    setIsLoading(true);

    setIsLoading(false);
  };

  return (
    <Stack sx={{ bgcolor: "#ffffff99", px: 6, py: 3 }}>
      {/* Search box */}
      <Stack spacing={2} sx={{ bgcolor: "#ffffff" }}>
        {/* Search bar */}
        <Box
          sx={{
            px: 3,
            py: 2,
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
        <Accordion>
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
                        background: background,
                        color: text,
                        width: "12ch",
                        borderRadius: "0.5rem",
                        display: "inline-block",
                        textAlign: "center",
                        border: selectedTypes.includes(type as IPokemonType)
                          ? "3px solid black"
                          : "3px solid gray",
                      }}
                    >
                      {type}
                    </Grid>
                  )
                )}
              </Grid>
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Stack>
  );
}
