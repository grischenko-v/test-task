import { CircularProgress, Alert } from '@mui/material'
import { useQuery, gql } from '@apollo/client';
import List from 'rc-virtual-list';
import messages from '../messages';

const GET_VM_DATA = gql`
  query VMData {
    vmData {
      id
      name
    }
  }
`;

const VM_LIST_HEIGHT = 540;
const VM_LIST_ITEM_HEIGHT = 36;

export const VMData = () => {
  const {
    loading: vmDataLoading,
    error: vmDataLoadError,
    data: vmData
  } = useQuery(GET_VM_DATA);

  if(vmDataLoadError) {
    return <Alert severity="error">
      {messages.getVMDataFailed()}
    </Alert>;
  }

  if(vmDataLoading) {
    return <CircularProgress/>;
  }

  return <>
    <List
      data={vmData.vmData}
      height={VM_LIST_HEIGHT}
      itemHeight={VM_LIST_ITEM_HEIGHT}
      itemKey="id">
        {item => <VMStatus key={item.id} name={item.name} id={item.id}/>}
    </List>
  </>
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
      {name}: {messages.getServerStatusFailed()}
    </Alert>;
  }
  
  if(loading) {
    return <CircularProgress/>;
  }

  return <Alert severity={`${data.getVMStatusByID.status ? 'success' : 'error'}`}>
      {name}: {messages.serverStatusLabel(data.getVMStatusByID.status)}
    </Alert>
}