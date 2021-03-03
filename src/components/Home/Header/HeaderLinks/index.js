import React, { useState, Suspense } from 'react';
import { Link as RouterLink, useRouteMatch } from "react-router-dom";
import menu from '../../../../config/menuItems.json';
import Icon from '@material-ui/core/Icon';


function HeaderLinks(props) {
    const { path, url } = useRouteMatch();

    const [items, setItems] = useState(JSON.parse(localStorage.getItem('menuItems')))

    return (
        <>
            {items.map((item) => {
                return <div key={item.IconName} >
                    <RouterLink className={props.styles} to={`${path}${item.Path}`}>
                        <Icon onClick={(e)=> {document.title = item.PathName}}>{item.ImportName}</Icon>
                    </RouterLink>
                </div>

            })}
        </>
    )
}



export default HeaderLinks;