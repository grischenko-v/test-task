import { CircularProgress, Alert } from '@mui/material'
import messages from '../messages';
import { useQuery, gql } from '@apollo/client';

const GET_STATUS = gql`
  query GetStatus {
      status
  }
`;

export const StatusFetcher = () => {
  const { loading, error, data } = useQuery(GET_STATUS, { pollInterval: 1000 });

  if(error) {
    return <Alert severity="error">
      {messages.getServerStatusFail()}
    </Alert>;
  }

  if(loading) {
    return <CircularProgress/>;
  }

  return <Alert severity={`${data.status ? 'success' : 'error'}`}>{messages.serverStatusLabel(data.status)}</Alert>
}