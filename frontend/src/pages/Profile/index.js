import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './styles.css'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api'

import logoImg from '../../assets/logo.svg'

export default function Profile() {

    const [incidents, setIncidents] = useState([])
    
    const history = useHistory()

    const ongId = localStorage.getItem('ongId')
    const ongName = localStorage.getItem('ongName')

    //disparando função quando o componente é mostrado em tela apenas 1 vez ([])
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ongId]) //variável como dependência

    //deletando casos
    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id))

        } catch(err) {
            alert('Erro ao deletar caso. Tente novamente')
        }
    }

    function handleLogout() {
        localStorage.clear()  
        
        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vinda, {ongName}!</span>

                <Link to="/incidents/new" className="button">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>Descrição:</strong>
                        <p>{incident.description}</p>

                        <strong>Valor</strong>
                        <p>{Intl.NumberFormat('pt-BR', 
                        { style: 'currency', 
                        currency: 'BRL' }).format(incident.value)}</p>

                        {/* Arrow functino MUITO importante no onlcik, para definir como função e não retorno de uma função */}
                        <button type="button"
                        onClick={() => handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}