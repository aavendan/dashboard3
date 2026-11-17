import './App.css';
import { Grid } from '@mui/material';
import SelectorUI from './components/SelectorUI';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import IndicatorUI from './components/IndicatorUI';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';


import useFetchData from './hooks/useFetchData';


function App() {

    const { data, loading, error } = useFetchData();

    return (
        <Grid container spacing={5} sx={{ justifyContent: 'center', alignItems: 'center' }}>

            {/* Encabezado */}
            <Grid size={{ xs: 12, md: 12 }}><HeaderUI /></Grid>

            {/* Alertas */}
            <Grid size={{ xs: 12, md: 12 }}
                container sx={{ justifyContent: 'flex-end', alignItems: 'center' }}>

                <AlertUI description="No se prevén lluvias" />
            </Grid>

            {/* Selector */}
            <Grid size={{ xs: 12, md: 3 }}>
                <SelectorUI />
            </Grid>

            {/* Indicadores */}
            <Grid container size={{ xs: 12, md: 9 }}>

                <Grid size={{ xs: 12, md: 3 }}>
                    {data &&
                        (<IndicatorUI
                            title='Temperatura (2m)'
                            description={`${data.current.temperature_2m} ${data.current_units.temperature_2m}`} />)
                    }
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <IndicatorUI title='Temperatura aparente' description='XX °C' />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <IndicatorUI title='Velocidad del viento' description='XX km/h' />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <IndicatorUI title='Humedad relativa' description='XX %' />
                </Grid>

            </Grid>

            {/* Gráfico */}
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
                {loading && <CircularProgress />}
                {error && <Alert severity="error">{error}</Alert>}
                {data && (
                    <ChartUI
                        title='Temperatura y viento por hora'
                        labels={data.hourly.time.map((tiempo) => tiempo.slice(11))}
                        values1={data.hourly.temperature_2m}
                        values2={data.hourly.wind_speed_10m}
                        label1={`Temperatura (${data.hourly_units.temperature_2m})`}
                        label2={`Viento (${data.hourly_units.wind_speed_10m})`} />
                )}
            </Grid>

            {/* Tabla */}
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
                {loading && <CircularProgress />}
                {error && <Alert severity="error">{error}</Alert>}
                {data && (
                    <TableUI
                        labels={data.hourly.time.map((tiempo) => tiempo.slice(11))}
                        values1={data.hourly.temperature_2m}
                        values2={data.hourly.wind_speed_10m}
                        header1={`Temperatura (${data.hourly_units.temperature_2m})`}
                        header2={`Viento (${data.hourly_units.wind_speed_10m})`} />
                )}
            </Grid>

            {/* Información adicional */}
            <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>

        </Grid>
    );
}

export default App;