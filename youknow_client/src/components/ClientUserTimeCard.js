import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios"
import dayjs from 'dayjs';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from "@mui/x-date-pickers";
import { Grid } from "@mui/material";


const ClientUserTimeCard = () => {
    const [startdate, setStartdate] = useState(dayjs('2010-04-17'))
    const [enddate, setEnddate] = useState(dayjs('2023-04-17'))
    const [client, setClient] = useState('')
    const navigate = useNavigate()

    const handleClick = (e) => {
        // convert the date into an format MySql can work with
        const convertedStartdate = new Date(startdate.$d).toISOString().slice(0, 19).replace('T', ' ')
        const convertedEnddate = new Date(enddate.$d).toISOString().slice(0, 19).replace('T', ' ')

        // if no client is selected, there will be a default one used in the backend
        if(client.length > 0){
            axios.get(`http://localhost:80/youKnow/api/clientsUserTime/${convertedStartdate}/${convertedEnddate}/${client}`).then(function(response) {
                navigate('/data', {state: {data: response.data}})
            })
        }else{
            axios.get(`http://localhost:80/youKnow/api/clientsUserTime/${convertedStartdate}/${convertedEnddate}`).then(function(response) {
                navigate('/data', {state: {data: response.data}})
            })
        }
    }

    return (
        <Card>
            <CardContent>
                <h2>Liste eines Mandanten mit der Nutzeit der Benutzer</h2>
                <p>Dieser Report erzeugt ihnen eine Liste eines Mandanten mit der Nutzeit seiner Benutzer. Mit den Inputs können sie einen Zeitraum für die Datenfilterung, sowie den Mandanten festlegen.</p>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField variant="outlined" label="Mandant" name="client" value={client} onChange={(e) => setClient(e.target.value)}/>
                    </Grid>

                    <Grid item xs={6}>
                        <DateTimePicker label="Startdate" value={startdate} onChange={(e) => setStartdate(e)}/>
                    </Grid>
                    
                    <Grid item xs={6}>
                        <DateTimePicker label="Enddate" value={enddate} onChange={(e) => setEnddate(e)} />
                    </Grid>
                    
                    <Grid item>
                        <Button variant="contained" onClick={handleClick}>Daten Laden</Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default ClientUserTimeCard