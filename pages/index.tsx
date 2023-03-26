import { DepartureBoard } from '@/components/DepartureBoard';
import { SearchBar } from '@/components/SearchBar';

export default function Home() {
  return (
    <div className="h-full">
      <main className="flex flex-col items-center justify-center">
        <SearchBar />
        <DepartureBoard />
      </main>
    </div>
  );
}
