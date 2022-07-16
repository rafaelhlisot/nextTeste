import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from '../../styles/UsuariosNovo.module.css';

const UsuariosNovo = () => {
    const router = useRouter();
    const [nameInput, setNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');

    const handleSaveForm = async () => {
        if (nameInput && emailInput) {
                const json = await axios.post(`/api/users`, {
                name: nameInput,
                email: emailInput
            })

            if (json.data.status) {
                router.push('/usuarios');
            } else {
                alert(json.data.error);
            }
        }
    }

    return (
        <div>
            <Head>
                <title>Usuários - Novo</title>
            </Head>
            <h1>Pagina Usuários - Novo</h1>   

            <input
                className={styles.input} 
                type="text" 
                value={nameInput} 
                onChange={e => setNameInput(e.target.value)}
                placeholder="Digite o nome do usuário"
            />

            <input 
                className={styles.input}
                type="text" 
                value={emailInput} 
                onChange={e => setEmailInput(e.target.value)}
                placeholder="Digite o e-mail do usuário"
            />

            <button onClick={handleSaveForm}>Cadastrar</button>
        </div>
    );
}

export default UsuariosNovo;