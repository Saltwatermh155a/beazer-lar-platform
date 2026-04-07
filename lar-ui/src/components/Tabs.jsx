import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ColorTabs() {
    const [value, setValue] = React.useState('one');
    const navigate = useNavigate();
    let location = useLocation();
    const user_data = useSelector((state) => state.user);

    React.useEffect(() => {
        if (location.pathname === "/home") {
            setValue('one')
        }
        if (location.pathname === "/topinputform") {
            setValue('two')
        }
        if (location.pathname === "/topoutput") {
            setValue('three')
        }
        if (location.pathname === "/larcriteria") {
            setValue('four')
        }
        if (location.pathname === "/proforma") {
            setValue('five')
        }
        if (location.pathname === "/" || location.pathname === "/presidents-letter" || location.pathname === "/letter-editor") {
            setValue('six')
        }
    }, [location])

    const handleChange = (event, newValue) => {
        setValue(newValue);
        const routes = {
            one: "/home",
            two: "/topinputform",
            three: "/topoutput",
            four: "/larcriteria",
            five: "/proforma",
            six: "/presidents-letter",
        };
        if (routes[newValue]) {
            navigate(routes[newValue]);
        }
    };

    return (<div className='mt-5 pt-3'>
        {user_data?.username && <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }} >
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="navigation tabs"
                variant="scrollable"
                scrollButtons="auto"
            >
                <Tab value="one" label="Home" />
                <Tab value="two" label="Input" />
                <Tab value="three" label="TOP" />
                <Tab value="four" label="LAR Criteria" />
                <Tab value="five" label="Proforma" />
                <Tab value="six" label="President's Letter" />
            </Tabs>
        </Box>}
    </div>
    );
}
