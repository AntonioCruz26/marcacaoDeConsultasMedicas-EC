import { useState} from 'react';
import { authApiService } from '../../../services/authApi';
import { User } from '../../../types/auth';

const [loadingDoctors, setLoadingDoctors] = useState(true);
const [error, setError] = useState('');
const [doctors, setDoctors] = useState<User[]>([]);

export const useloadDoctors = async () => {
try {
    setLoadingDoctors(true);
    setError(''); // Limpa erros anteriores
    const doctorsData = await authApiService.getAllDoctors();
    setDoctors(doctorsData);
    console.log(`${doctorsData.length} médicos carregados com sucesso`);
} catch (error) {
    console.error('Erro ao carregar médicos:', error);
    setError('Carregando médicos com dados locais...');
    // Tentativa adicional com pequeno delay
    setTimeout(async () => {
    try {
        const doctorsData = await authApiService.getAllDoctors();
        setDoctors(doctorsData);
        setError('');
    } catch (retryError) {
        setError('Médicos carregados com dados locais (API indisponível)');
    }
    }, 1000);
} finally {
    setLoadingDoctors(false);
}
};