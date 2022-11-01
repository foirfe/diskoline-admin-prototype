import DashboardIcon from '@mui/icons-material/Dashboard';
import PlaceIcon from '@mui/icons-material/Place';
import RouteIcon from '@mui/icons-material/Route';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import TocIcon from '@mui/icons-material/Toc';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';


export const navData = [
    {
        id: 0,
        icon: <DashboardIcon/>,
        text: "Forside",
        link: "forside"
    },
    {
        id: 1,
        icon: <PlaceIcon/>,
        text: "Stoppesteder",
        link: "stoppesteder"
    },
    {
        id: 2,
        icon: <RouteIcon/>,
        text: "Ruter",
        link: "ruter"
    },
    {
        id: 3,
        icon: <PriceChangeIcon/>,
        text: "Pristabeller",
        link: "pristabeller"
    },
    {
        id: 4,
        icon: <TocIcon/>,
        text: "Fartplaner",
        link: "fartplaner"
    },
    {
        id: 5,
        icon: <AccessTimeFilledIcon/>,
        text: "Sejltider",
        link: "sejltider"
    }
]