import Head from "next/head";
import styles from '../styles/Usuarios.module.css';
import api from '../../libs/api';
import { User } from "../../types/User";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";

type Props = {
    users: User[];
}

const Usuarios = ({users}: Props) => {
    const [showMore, setShowMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [pageCount, setPageCount] = useState(1);
    const [userList, setUserList] = useState<User[]>(users);
;
    const handleLoadMore = async () => {
        if (!loading) {
            setLoading(true);

            const json = await axios.get(`/api/users?page=${pageCount + 1}`);

            if (json.data.status) {
                if (json.data.users.length === 0) {
                    setShowMore(false);
                }
                setUserList([...userList, ...json.data.users]);
            }
            setLoading(false);
            setPageCount(pageCount + 1);
        }
    }

    return (
        <div>
            <Head>
                <title>Usuários</title>
            </Head>
            <h1>Pagina Usuários</h1>

            <Link href={`/usuarios/novo`}>Adicionar Usuário</Link>

            <ul>
            {userList.map((item, index) => (
                <li key={index}>{item.name}</li>
            ))}
            </ul>

            {showMore &&
                <button onClick={handleLoadMore}>Carregar Mais</button>
            }
        </div>
    );
}

export const getServerSideProps = async () => {
    const users = await api.getAllUsers(0);
    
    return {
        props: {
            users
        }
    }
}

export default Usuarios;