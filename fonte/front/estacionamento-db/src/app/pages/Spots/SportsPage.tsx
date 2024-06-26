import Navbar from '@/app/components/Navbar';
import ListSpots from '@/app/components/SportList';
import SpotForm from '@/app/components/SpotForm';

const SpotsPage = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Vagas</h1>
        <SpotForm />
        <ListSpots />
      </div>
    </div>
  );
};

export default SpotsPage;
