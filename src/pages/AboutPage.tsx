import React from 'react'
import { useTheme } from '@mui/material/styles';

const AboutPage:React.FC = () => {
  const theme = useTheme();
  const appBarHeight = theme.mixins.toolbar.minHeight;

  return (
    <>
      <div style={{marginTop: appBarHeight}}/>
      <div>About Page</div>
    </>
  )
}

export default AboutPage