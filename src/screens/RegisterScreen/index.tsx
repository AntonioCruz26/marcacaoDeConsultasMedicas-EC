import React, { useState } from 'react';
import { Input, Button, Text } from 'react-native-elements';
import { useAuth } from '../../contexts/AuthContext';
import { ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { RegisterScreenProps } from './types/types';
import {styles, Container, Title, ErrorText, SectionTitle, UserTypeContainer, UserTypeButton, UserTypeText} from './styles/styles';


const RegisterScreen: React.FC = () => {
  const { register } = useAuth();
  const navigation = useNavigation<RegisterScreenProps['navigation']>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'PACIENTE' | 'ADMIN'>('PACIENTE');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError('');

      if (!name || !email || !password) {
        setError('Por favor, preencha todos os campos');
        return;
      }

      await register({
        name,
        email,
        password,
        userType,
      });

      // Após o registro bem-sucedido, navega para o login
      navigation.navigate('Login');
    } catch (err) {
      setError('Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Cadastro de Usuário</Title>
      
      <Input
        placeholder="Nome completo"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        containerStyle={styles.input}
      />

      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        containerStyle={styles.input}
      />

      <Input
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        containerStyle={styles.input}
      />

      <SectionTitle>Tipo de Usuário</SectionTitle>
      <UserTypeContainer>
        <UserTypeButton 
          selected={userType === 'PACIENTE'}
          onPress={() => setUserType('PACIENTE')}
        >
          <UserTypeText selected={userType === 'PACIENTE'}>
            👤 Paciente
          </UserTypeText>
        </UserTypeButton>
        
        <UserTypeButton 
          selected={userType === 'ADMIN'}
          onPress={() => setUserType('ADMIN')}
        >
          <UserTypeText selected={userType === 'ADMIN'}>
            🔧 Administrador
          </UserTypeText>
        </UserTypeButton>
      </UserTypeContainer>

      {error ? <ErrorText>{error}</ErrorText> : null}

      <Button
        title="Cadastrar"
        onPress={handleRegister}
        loading={loading}
        containerStyle={styles.button as ViewStyle}
        buttonStyle={styles.buttonStyle}
      />

      <Button
        title="Voltar para Login"
        onPress={() => navigation.navigate('Login')}
        containerStyle={styles.backButton as ViewStyle}
        buttonStyle={styles.backButtonStyle}
      />
    </Container>
  );
};



export default RegisterScreen; 