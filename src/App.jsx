import { useBearsStore } from './store/bears';
import AddBearButton from './components/AddBearButton';

function App() {
  const bears = useBearsStore((state) => state.bears);
  console.log(bears);

  return (
    <div>
      {bears.length}
      <AddBearButton />
    </div>
  );
}

export default App;
