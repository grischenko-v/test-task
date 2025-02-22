import { CircularProgress, Alert } from '@mui/material'
import messages from '../messages';
import { useQuery, gql } from '@apollo/client';

const GET_VM_STATUS = gql`
  query GetStatus {
      vmData {
        status
        id
        name
      }
  }
`;

export const VMStatusFetcher = () => {
  const { loading, error, data } = useQuery(GET_VM_STATUS, { pollInterval: 1000 });

  if(error) {
    return <Alert severity="error">
      {messages.getServerStatusFailed()}
    </Alert>;
  }

  if(loading) {
    return <CircularProgress/>;
  }

  return <div>
    <h2>{messages.VMDataTitle()}</h2>
    {data.vmData.map(item => 
      <Alert key={item.id} severity={`${item.status ? 'success' : 'error'}`}>
        {item.name}: {messages.serverStatusLabel(item.status)}
      </Alert>
    )}   
  </div>
}