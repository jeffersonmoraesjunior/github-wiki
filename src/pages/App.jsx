import gitlogo from '../assets/github.png';
import Input from '../components/Input';
import Button from '../components/Button';
import ItemRepo from '../components/ItemRepo';
import { api } from '../services/api';
import { Container } from './styles';
import { useState } from 'react';

function App() {
    const [currentRepo, setCurrentRepo] = useState('');

    const [repos, setRepos] = useState([]);

    const handleSerchRepo = async () => {
        const { data } = await api.get(`repos/${currentRepo}`);

        if (data.id) {
            const isExist = repos.find((repo) => repo.id === data.id);

            if (!isExist) {
                setRepos((prev) => [...prev, data]);
                setCurrentRepo('');
                return; //para a funcao
            }
        }
        alert('Repositorio não encontrado.');
    };

    const handleRemoveRepo = (id) => {
        console.log('removendo registro', id);

        //utilizar tp filter
    };
    return (
        <Container>
            <img src={gitlogo} width={72} height={72} alt="Git hub" />
            <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)} />
            <Button onClick={handleSerchRepo()} />
            {repos.map((repo) => (
                <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo} />
            ))}
        </Container>
    );
}

export default App;
