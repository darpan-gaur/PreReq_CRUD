import { createTheme } from "@mui/material/styles";
import {blue, grey} from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        primary: {
            main: grey[50],
        },
    },
    myButton: {
        backgroundColor: "red",
        color: "white",
        border: "1px solid balck",
    },
});