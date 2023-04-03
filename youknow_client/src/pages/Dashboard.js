import ClientInactiveUserCard from "../components/ClientInactiveUserCard"
import ClientTimeCard from "../components/ClientTimeCard"
import ClientUserCard from "../components/ClientUserCard"
import ClientUserTimeCard from "../components/ClientUserTimeCard"

import { Grid } from "@mui/material"

const Dashboard = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <ClientUserTimeCard />
            </Grid>

            <Grid item xs={6}>
                <ClientTimeCard />
            </Grid>

            <Grid item xs={6}>
                <ClientUserCard />
            </Grid>

            <Grid item xs={6}>
                <ClientInactiveUserCard />
            </Grid>
        </Grid>
    )
}

export default Dashboard