import React, { useEffect, useState } from 'react';
import UserService from '../../services/user-service';
import {
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
    GridList,
    GridListTile,
    CardActionArea,
    CardMedia
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: '100%',
        height: '100%',
    },
    card: {
        maxWidth: 345,
        height: 400
    }
}));

function Products() {
    const service = new UserService();
    const classes = useStyles();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        service.getProducts().then((data) => {
            setProducts(data);
        })
    }, [])

    if (products.length > 0) {

        return <>
            <GridList style={{marginTop: 10}} cellHeight={450} className={classes.gridList} cols={5} spacing={5}>
                {products.map((item) => {
                    return <GridListTile key={item.id} cols={1} rows={1}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    height="150"
                                    image="https://i.picsum.photos/id/34/150/150.jpg?hmac=RSvd6H7Ciu1LVG385QiorhKw5F2Ha_-ZK0NPt8zv8ME"
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {item.id}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {item.title}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Share
                                </Button>
                                <Button size="small" color="primary">
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </GridListTile>
                })}
            </GridList>
        </>
    } else {
        return <div>?</div>
    }
}


export default Products