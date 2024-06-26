import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className="flex-grow">
          Sistema de Gestão de Estacionamento
        </Typography>
        <Button color="inherit" component={Link} href="/">
          Home
        </Button>
        <Button color="inherit" component={Link} href="/clients">
          Clientes
        </Button>
        <Button color="inherit" component={Link} href="/vehicles">
          Veículos
        </Button>
        <Button color="inherit" component={Link} href="/spots">
          Vagas
        </Button>
        <Button color="inherit" component={Link} href="/parkings">
          Pagamentos
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
