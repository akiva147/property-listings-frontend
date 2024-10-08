import { Button, message } from 'antd';
import classes from './counter-page.module.scss';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { counterService } from '../../services/counter.service';
import { loader } from '../../constants/general.const';

export interface CounterPageProps {}

export const CounterPage = (props: CounterPageProps) => {
  const queryClient = useQueryClient();
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ['count'],
    queryFn: () => counterService.getCount(),
  });

  const incrementCounter = async () => {
    await counterService.incrementCount();
    queryClient.invalidateQueries({
      queryKey: ['count'],
    });
  };

  if (isLoading || isFetching) return loader;
  if (isError) {
    message.error({
      content: 'Error fetching counter',
      key: 'error-fetching-counter',
    });
    return <></>;
  }
  return (
    <div className={classes.container}>
      <main>
        <Button onClick={incrementCounter}>Count is {data?.value}</Button>
      </main>
    </div>
  );
};
