import { useLocation } from 'react-router-dom';

const ItemShop = () => {
    const location = useLocation();
    const name = location.state.name;
    const url = location.state.url;

    return (
        <div>{name}{url}</div>
    )
}

export default ItemShop;