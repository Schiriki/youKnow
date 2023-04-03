import axios from "axios";
import { useNavigate } from "react-router-dom";

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const ClientInactiveUserCard = () => {
    const navigate = useNavigate()

    const handleClick = (e) => {
        axios.get('http://localhost:80/youKnow/api/inactiveClients').then(function(response) {
            navigate('/data', {state: {data: response.data}})
        })
    }

    return (
        <Card>
            <CardContent>
                <h2>Liste aller inaktiver Mandanten</h2>
                <p>Dieser Report erzeugt ihnen eine Liste aller inaktiven Mandanten.</p>
                <Button variant="contained" onClick={() => handleClick()}>Daten Laden</Button>
            </CardContent>
        </Card>
    )
}

export default ClientInactiveUserCard