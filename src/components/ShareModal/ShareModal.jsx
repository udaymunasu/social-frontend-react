import PostShare from "../PostShare/PostShare";
import { Button, Modal, Box } from '@mui/material';

function ShareModal({ open, onClose }) {

  return (
    <Modal
    open={open}
    onClose={onClose}
    aria-labelledby="profile-modal-title"
    aria-describedby="profile-modal-description"
  >
    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
    <PostShare/>
      <Button onClick={onClose} variant="contained" color="primary" sx={{ mt: 2 }}>
        Close Modal
      </Button>
    </Box>
  </Modal>
  );
}

export default ShareModal;
