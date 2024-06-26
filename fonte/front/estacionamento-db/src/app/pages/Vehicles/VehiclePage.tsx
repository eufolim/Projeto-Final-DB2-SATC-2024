import Navbar from '@/app/components/Navbar';
import VehicleForm from '@/app/components/VehicleForm';
import ListVehicles from '@/app/components/VehicleList';

const VehiclesPage = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Veículos</h1>
        <VehicleForm />
        <ListVehicles/>
      </div>
    </div>
  );
};

export default VehiclesPage;
