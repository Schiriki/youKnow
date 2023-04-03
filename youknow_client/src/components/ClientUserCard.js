import axios from "axios"
import { useNavigate } from "react-router-dom";

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const ClientUserCard = () => {
    const navigate = useNavigate();

    const handleClick = (e) => {
        axios.get('http://localhost:80/youKnow/api/clientsUser').then(function(response) {
            navigate('/data', {state: {data: response.data}})
        })
    }

    return (
        <Card>
            <CardContent>
                <h2>Liste aller Mandanten mit den zugehörigen Benutzern</h2>
                <p>Dieser Report erzeugt ihnen eine Liste aller Mandanten mit deren Benutzern.</p>
                <Button variant="contained" onClick={() => handleClick()}>Daten Laden</Button>
            </CardContent>
        </Card>
    )
}

export default ClientUserCard