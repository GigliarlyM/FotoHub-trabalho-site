import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CadastroGeral() {
    const [activeForm, setActiveForm] = useState('cliente');
    const navigate = useNavigate()

    const [nomeCliente, setNomeCliente] = useState('');
    const [emailCliente, setEmailCliente] = useState('');
    const [senhaCliente, setSenhaCliente] = useState('');

    const [apelidoArtista, setApelidoArtista] = useState('');
    const [emailUsuario, setEmailUsuario] = useState('');

    const showForm = (form) => {
        setActiveForm(form);
    };

    const getToken = () => {
        return sessionStorage.getItem('token');
    }

    const handleClienteSubmit = async (e) => {
        
        const cliente = {
            nome: nomeCliente,
            email: emailCliente,
            senha: senhaCliente
        }

        try {
            const token = getToken();
            const response = await axios.post(import.meta.env.VITE_APP_API_URL + `/client`, cliente)
            if (response) {
                navigate('/')
            }
        } catch (error) {
            if (error.response.data.message == "CPF já cadastrado") {
                console.log("CPF já cadastrado")
            }
            else {
                console.log(error)
            }
        }
    }

    const handlePhotographerSubmit = async () => {

        const fotografo = {
            userName: apelidoArtista,
            clientEmail: emailUsuario
        }

        try {
            const token = getToken();
            const response = await axios.post(import.meta.env.VITE_APP_API_URL + `/artist`, fotografo)
            console.log("Fotográfo cadastrado " + response.data)
        } catch (error) {
            if (error.response.data.message == "CPF já cadastrado") {
                console.log("CPF já cadastrado")
            }
            else {
                console.log(error)
            }
        }
    }

    return (
        <div className="tab-container">
            <button onClick={() => navigate("login/photographer")}>Voltar para a Home</button>
            <h1>Cadastro</h1>
            <div className="tabs">
                
                <button
                    id="clienteTab"
                    className={activeForm === 'cliente' ? 'active' : ''}
                    onClick={() => showForm('cliente')}>
                    Cliente/Usuário
                </button>
                <button
                    id="fotografoTab"
                    className={activeForm === 'fotografo' ? 'active' : ''}
                    onClick={() => showForm('fotografo')}>
                    Artista
                </button>
            </div>

            {activeForm === 'cliente' && (
                <div id="clienteForm" className="form-container active">
                    <form>
                        <br />
                        <label htmlFor="nomeCliente">Nome</label>
                        <input type="text" id="nomeCliente" placeholder="Nome" value={nomeCliente} onChange={e => setNomeCliente(e.target.value)} />

                        <label htmlFor="emailCliente">Email</label>
                        <input type="email" id="emailCliente" placeholder="Email" value={emailCliente} onChange={e => setEmailCliente(e.target.value)} />

                        <label htmlFor="senhaCliente">senha</label>
                        <input type="password" id="senhaCliente" placeholder="senha" value={senhaCliente} onChange={e => setSenhaCliente(e.target.value)} />

                        <br />

                        <div className="botao-Cadastrar">
                        <button type="button" onClick={handleClienteSubmit}>Cadastrar Cliente/Usuário</button>
                        </div>
                    </form>
                </div>
            )}

            {activeForm === 'fotografo' && (
                <div id="fotografoForm" className="form-container">
                    <form>
                        <br />
                        <label htmlFor="apelidoArtista">Apelido</label>
                        <input type="text" id="apelidoArtista" placeholder="Apelido" value={apelidoArtista} onChange={e => setApelidoArtista(e.target.value)} />

                        <label htmlFor="emailUsuario">Email da conta de usuario</label>
                        <input type="email" id="emailUsuario" placeholder="Email" value={emailUsuario} onChange={e => setEmailUsuario(e.target.value)}/>

                        <br />

                        <div className="botao-Cadastrar">
                        <button type="button" onClick={handlePhotographerSubmit}>Cadastrar Fotógrafo</button>
                        </div>
                    </form>
                    
                </div>
            )}
            <footer className="footer"> &copy; 2024 FotoHub - Todos os direitos reservados</footer>
        </div>
    );
}
