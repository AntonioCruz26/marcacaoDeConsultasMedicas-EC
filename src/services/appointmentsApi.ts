import { apiClient, API_ENDPOINTS } from './api';

/**
 * Interface para a consulta retornada pela API
 */
interface ApiAppointment {
  id: number;
  dataHora: string;
  especialidade: string;
  usuarioId: number;
  medicoId: number;
  observacao: string;
  status: 'AGENDADA' | 'CONFIRMADA' | 'CANCELADA' | 'REALIZADA';
}

/**
 * Interface para a consulta usada no frontend
 */
export interface Appointment {
  id: string;
  date: string;
  time: string;
  specialty: string;
  patientId: string;
  doctorId: string;
  notes: string;
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed';
}

/**
 * Interface para criar uma nova consulta
 */
export interface CreateAppointmentData {
  dataHora: string;
  especialidade: string;
  usuarioId: number;
  medicoId: number;
  observacao: string;
}

/**
 * Serviço para gerenciar consultas médicas
 */
export const appointmentsApiService = {
  /**
   * Cria uma nova consulta
   */
  async createAppointment(data: CreateAppointmentData): Promise<Appointment> {
    try {
      const appointment = await apiClient.post<ApiAppointment>(
        API_ENDPOINTS.APPOINTMENTS,
        {
          ...data,
          status: 'AGENDADA',
        }
      );
      return this.mapApiAppointmentToAppointment(appointment);
    } catch (error) {
      console.error('Erro ao criar consulta:', error);
      throw new Error('Erro ao agendar consulta');
    }
  },

  /**
   * Busca uma consulta por ID
   */
  async getAppointmentById(id: string): Promise<Appointment> {
    try {
      const appointment = await apiClient.get<ApiAppointment>(
        `${API_ENDPOINTS.APPOINTMENTS}/${id}`
      );
      return this.mapApiAppointmentToAppointment(appointment);
    } catch (error) {
      console.error('Erro ao buscar consulta:', error);
      throw new Error('Erro ao carregar consulta');
    }
  },

  /**
   * Cancela uma consulta
   */
  async cancelAppointment(id: string): Promise<void> {
    try {
      await apiClient.delete(`${API_ENDPOINTS.APPOINTMENTS}/${id}`);
    } catch (error) {
      console.error('Erro ao cancelar consulta:', error);
      throw new Error('Erro ao cancelar consulta');
    }
