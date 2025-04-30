import React from 'react';
import { Container, Notification } from '@mantine/core';

interface NotifyProp {
  title: string;
  message: string;
  alive: boolean;
}

const Notify = function Notify({ nt, onClose }: { nt: NotifyProp; onClose: () => void }) {
  return (
    <Notification 
      title={nt.title} 
      onClose={onClose}
      my={'0.5rem'}
      classNames={{
        root: "dark:bg-neutral-800",
        title: "text-neutral-200",
        closeButton: "text-neutral-200 dark:hover:bg-neutral-700",
        description: "text-neutral-200",
        icon: "text-neutral-200",
        body: "text-neutral-200",
        loader: "text-neutral-200",
      }}
    >
    {nt.message}
    </Notification>
  );
};

const nots = [
  {
    title: "New Routine",
    message: "You have a new routine available",
    alive: true,
  },
  {
    title: "New Exercise",
    message: "You have a new exercise available",
    alive: true,
  },
  {
    title: "New Workout",
    message: "You have a new workout available",
    alive: true,
  },
];

const Notifications = () => {
  const [notList, setNotList] = React.useState<NotifyProp[]>([]);

  React.useEffect(() => {
    setNotList(nots.filter((not) => not.alive === true));
  }, []);

  const handleRemoveNotification = (title: string) => {
    setNotList((prevList) => prevList.filter((not) => not.title !== title));
  };

  return (
    <Container p={0} m={0} w={"100%"} className='flex flex-col align-center' >
      <h1 className='text-3xl font-bold text-neutral-200'>Notifications</h1>
      <br />
      {notList.map((nt) => (
        <Notify
          key={nt.title}
          nt={nt}
          onClose={() => handleRemoveNotification(nt.title)}
        />
      ))}
    </Container>
  );
};

export default Notifications;
