import theme from '../../../styles/theme';
import styled from 'styled-components/native';

export const styles = {
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    width: '100%',
  },
  buttonStyle: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
  },
  backButton: {
    marginTop: 10,
    width: '100%',
  },
  backButtonStyle: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: 12,
  },
};

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  justify-content: center;
  background-color: ${theme.colors.background};
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
  color: ${theme.colors.text};
`;

export const ErrorText = styled.Text`
  color: ${theme.colors.error};
  text-align: center;
  margin-bottom: 10px;
`;

export const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 12px;
  margin-top: 8px;
`;

export const UserTypeContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const UserTypeButton = styled.TouchableOpacity<{ selected: boolean }>`
  flex: 1;
  padding: 12px;
  margin: 0 4px;
  border-radius: 8px;
  border: 2px solid ${(props: { selected: boolean }) => props.selected ? theme.colors.primary : theme.colors.border};
  background-color: ${(props: { selected: boolean }) => props.selected ? theme.colors.primary + '20' : theme.colors.background};
  align-items: center;
`;

export const UserTypeText = styled.Text<{ selected: boolean }>`
  color: ${(props: { selected: boolean }) => props.selected ? theme.colors.primary : theme.colors.text};
  font-weight: ${(props: { selected: boolean }) => props.selected ? 'bold' : 'normal'};
  font-size: 14px;
`;