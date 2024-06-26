import Navbar from '@/app/components/Navbar';
import ClientSearch from '@/app/components/ClientSearch';

const ClientsPage = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <ClientSearch />
      </div>
    </div>
  );
};

export default ClientsPage;
