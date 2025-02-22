import { CircularProgress, Alert } from '@mui/material'
import messages from '../messages';
import { useQuery, gql } from '@apollo/client';

const GET_VM_DATA = gql`
query VMData {
  vmData {
    id
    name
  }
}
`;

export const VMData = () => {
  const {
    loading: vmDataLoading,
    error: vmDataLoadError,
    data: vmData } = useQuery(GET_VM_DATA);

  if(vmDataLoadError) {
    return <Alert severity="error">
      {messages.getVMDataFailed()}
    </Alert>;
  }

  if(vmDataLoading) {
    return <CircularProgress/>;
  }

  return <div>
    <h2>{messages.VMDataTitle()}</h2>
    {vmData.vmData.map(item => 
      <VMStatus key={item.id} name={item.name} id={item.id}/>
    )}
  </div>
}

const GET_VM_STATUS = gql`
  query Status($id: String!) {
    getVMStatusByID(id: $id) {
      status
    }
  }
`;

const VMStatus = ({ id, name }) => {
  const {
    loading,
    error,
    data
  } = useQuery(GET_VM_STATUS, {
      variables: { id },
      pollInterval: 1000,
    }
  );

  if(error) {
    return <Alert severity="error">
      {messages.getServerStatusFailed()}
    </Alert>;
  }
  
  if(loading) {
    return <CircularProgress/>;
  }

  return <Alert severity={`${data.getVMStatusByID.status ? 'success' : 'error'}`}>
      {name}: {messages.serverStatusLabel(data.getVMStatusByID.status)}
    </Alert>
}