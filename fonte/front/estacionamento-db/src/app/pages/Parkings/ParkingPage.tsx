import Navbar from '@/app/components/Navbar';
import ParkingForm from '@/app/components/ParkingForm';
import ParkingList from '@/app/components/ParkingList';

const ParkingsPage = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Pagamentos</h1>
        <ParkingForm />
        <ParkingList/>
      </div>
    </div>
  );
};

export default ParkingsPage;
