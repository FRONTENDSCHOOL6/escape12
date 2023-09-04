import { useBearsStore } from '../store/bears';

function AddBearButton() {
  const addBear = useBearsStore((state) => state.addBear);

  return (
    <button
      type="button"
      onClick={() => addBear({ id: 'bear', name: '야무쌤' })}
    >
      AddBearButton
    </button>
  );
}

export default AddBearButton;
