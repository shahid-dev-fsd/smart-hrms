import { Button } from '@mui/material';
import { IoDiamondOutline } from 'react-icons/io5';
import './button.css'; // Import the updated CSS
import { useTheme } from '../../style/theme';

const GradientButton = ({ handleOpen }) => {
  const { mode } = useTheme();
  const textColor = mode === 'dark' ? 'white' : 'gray';
  return (
    <div className="button-container bg-blue-600 rounded-lg bg-opacity-5">
      <Button
        onClick={handleOpen}
        variant="outlined"
        sx={{
          height : "35px",
          display: 'flex',
          alignItems: 'center',
          fontSize: '13px',
          fontWeight: 'bold',
          padding: '8px 14px',
          borderRadius: '8px',
          background: '', // Gradient for border
          color: textColor,
          transition: 'background 0.5s, transform 0.3s',
          position: 'relative',
          overflow: 'hidden', // Ensure sparkles don't overflow outside the button
          '&:hover': {
            background: 'linear-gradient(45deg, #fc466b, #3f5efb)',
            transform: 'scale(1.05)',
          },
        }}
      >
        <div className="sparkle-container">
          <IoDiamondOutline
            style={{
              fontSize: '12px',
              marginRight: '8px',
              transition: 'transform 0.6s',
              position: 'relative', // To allow rotation around the diamond
              '&:hover + .buttonText': {
                animation: 'textRotate 0.6s ease-in-out forwards', // Rotate text
              },
            }}
            className="diamond-icon"
          />
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>
        </div>
        <span className="button-text">Upgrade</span>
      </Button>
    </div>
  );
};

export default GradientButton;
