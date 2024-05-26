import { Grid } from "@mui/material";
import "../Styles/dashboard.css";

const borderStyle = {
    border: "1px solid #000"
}

export default function Dashboard() {
    return (
        <>
            <Grid container>
                <Grid item sm={12} style={borderStyle} className="topBar">
                    Top bar
                </Grid>
                <Grid container sm={12} className="main">
                    <Grid item sm={2} style={borderStyle}>
                        Side nav
                    </Grid>
                    <Grid item sm={10} style={borderStyle}>
                        This the main content
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
