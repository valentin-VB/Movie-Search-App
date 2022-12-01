import { useForm } from 'react-hook-form';
import Button from 'components/Button';
import { Header, Input, StyledForm } from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const { register, handleSubmit, reset } = useForm();

  const handleSearchSubmit = data => {
    if (data.searchQuery.trim() === '') {
      return;
    }

    onSubmit(data.searchQuery);
    reset();
  };

  return (
    <Header>
      <StyledForm
        onSubmit={handleSubmit(data => {
          handleSearchSubmit(data);
        })}
      >
        <Input
          {...register('searchQuery')}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        ></Input>
        <Button></Button>
      </StyledForm>
    </Header>
  );
};

export default Searchbar;
