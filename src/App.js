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
import { useEffect, useState } from "react";
import { useMapEvent } from "react-leaflet";
import { MapLeaflet } from "./components";
import {search} from "./core/services/nominatim";

function App() {
  const [sizeText, setSizeText] = useState(200);
  const [info, setInfo] = useState({
    lat: 0,
    lng: 0,
    address: null
  });
  const [optionSearchAddress, setOptionAddress] = useState([]);
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

  const handleSearchAddress = async (event) => {
    const {code, target} = event;
    if (code !== "Enter") return;
    const response = await search(target.value);
    setOptionAddress(response);
    console.log(response, "RESPONSE ???");
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
            value={info.address}
            onChange={(event, newValue) => {
              if (typeof newValue === 'string') return;
              setInfo((old) => ({...old, address: newValue}));
            }}
            options={optionSearchAddress}
            getOptionLabel={(option) => {
              // Value selected with enter, right from the input
              if (typeof option === 'string') {
                return option;
              }
              // Regular option
              return option.display_name;
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Cari alamat"
                onClick={() => setSizeText(600)}
                onBlur={() => setSizeText(200)}
                onKeyDown={handleSearchAddress}
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
                  <table>
                    <tbody>
                      <tr>
                        <td>Latitude</td>
                        <td>:</td>
                        <td>{info.lat}</td>
                      </tr>
                      <tr>
                        <td>Longitude</td>
                        <td>:</td>
                        <td>{info.lng}</td>
                      </tr>
                    </tbody>
                  </table>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={1}>
            <Card elevation={0}>
              <CardContent>
                <Typography 
                  textTransform={'uppercase'}
                  fontWeight={600}
                >
                  Informasi Lokasi
                </Typography>
                <Box sx={{py: 2}}>
                  <table>
                    <tbody>
                      <tr>
                        <td>osm_id</td>
                        <td>:</td>
                        <td>{info?.address?.osm_id ?? "-"}</td>
                      </tr>
                      <tr>
                        <td>place_id</td>
                        <td>:</td>
                        <td>{info?.address?.place_id ?? "-"}</td>
                      </tr>
                      <tr>
                        <td>osm_type</td>
                        <td>:</td>
                        <td>{info?.address?.osm_type ?? "-"}</td>
                      </tr>
                      <tr>
                        <td>type</td>
                        <td>:</td>
                        <td>{info?.address?.type ?? "-"}</td>
                      </tr>
                      <tr>
                        <td>latitude</td>
                        <td>:</td>
                        <td>{info?.address?.lat ?? "-"}</td>
                      </tr>
                      <tr>
                        <td>longitude</td>
                        <td>:</td>
                        <td>{info?.address?.lon ?? "-"}</td>
                      </tr>
                    </tbody>
                  </table>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={1}>
            <Card elevation={0}>
              <CardContent>
                <Typography 
                  textTransform={'uppercase'}
                  fontWeight={600}
                >
                  Informasi Alamat
                </Typography>
                <Box sx={{py: 2}}>
                  <table>
                    <tbody>
                      {
                        info.address == null ? 'Tidak ada data.' : Object.keys(info.address.address).map((addreses, key) => {
                          return <tr key={key}>
                            <td>{addreses}</td>
                            <td>:</td>
                            <td>{info?.address?.address[addreses] ?? "-"}</td>
                          </tr>
                        })
                      }
                    </tbody>
                  </table>
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
