// src/styles.js

const textFieldStyles = (mode) => ({
    backgroundColor: mode === 'light' ? 'white' : '#424242', // Background color based on mode
    color: mode === 'light' ? 'black' : 'white', // Text color based on mode
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: mode === 'light' ? 'grey' : '#aaa', // Border color based on mode
      },
      '&:hover fieldset': {
        borderColor: mode === 'light' ? 'blue' : '#fff', // Hover border color based on mode
      },
      '& input': {
        color: mode === 'light' ? 'black' : 'white', // Input text color based on mode
      },
    },
    '& .MuiInputLabel-root': {
      color: mode === 'light' ? 'grey' : '#bbb', // Default label color
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: mode === 'light' ? 'blue' : '#fff', // Focused label color based on mode
    },
    '& .MuiInputLabel-root.Mui-error': {
      color: 'red', // Error label color
    },
  });
  
  export default textFieldStyles;
  