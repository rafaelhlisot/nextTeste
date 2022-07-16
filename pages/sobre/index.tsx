import Link from 'next/link';
import Head from 'next/head';

const Sobre = () => {
    return (
        <div>
            <h1>Pagina sobre</h1>
            <Head><title>Teste</title></Head>
            <ul>
                <li> <Link href="/sobre/bonieky">Pagina de Bonieky</Link> </li>
                <li> <Link href="/sobre/rafael">Pagina de Rafael</Link> </li>
            </ul>

            <button>Aumentar</button>
        </div>
    );
}

export default Sobre;