import {
  Autocomplete,
  Box,
  Container,
  Grid,
  TextField,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { useState } from "react";
import { useMapEvent } from "react-leaflet";
import { MapLeaflet } from "./components";

function App() {
  const [sizeText, setSizeText] = useState(200);
  const [info, setInfo] = useState({
    lat: 0,
    lng: 0
  });
  const GetLatLong = () => {
    useMapEvent('mousemove', (e) => {
      setInfo((old) => ({
        ...old,
        lat: e?.latlng?.lat.toFixed(6),
        lng: e?.latlng?.lng.toFixed(6)
      }))
    })
    return null;
  }
  return (
    <Container sx={{ paddingTop: 3 }}>
      <section style={{ position: "relative" }}>
        <MapLeaflet option-map={{scrollWheelZoom: true}}>
          <GetLatLong />
        </MapLeaflet>
        <Box sx={{ position: "absolute", top: 0, right: 0, zIndex: 1001 }}>
          <Autocomplete
            freeSolo
            variant="outlined"
            size="small"
            options={[]}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Cari alamat"
                onClick={() => setSizeText(600)}
                onBlur={() => setSizeText(200)}
                sx={{
                  mr: 1,
                  mt: 1,
                  background: "white",
                  width: `${sizeText}px`,
                  transition: "0.3s ease-in-out",
                }}
              />
            )}
          />
        </Box>
      </section>
      <section style={{marginTop: '20px'}}>
        <Grid container spacing={2} columns={3}>
          <Grid item md={1}>
            <Card elevation={0}>
              <CardContent>
                <Typography 
                  textTransform={'uppercase'}
                  fontWeight={600}
                >
                  Informasi
                </Typography>
                <Box sx={{py: 2}}>
                  <Box>
                    Latitude: {info.lat}
                  </Box>
                  <Box>
                    Longitude: {info.lng}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </section>
    </Container>
  );
}

export default App;
