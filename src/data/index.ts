import { faker } from '@faker-js/faker';

type USER = {
  userId: string;
  username: string;
  email: string;
  avatar: string;
  password: string;
  birthdate: Date;
  registeredAt: Date;
  isFavorite: boolean;
}
const createRandomUser = (): USER => {
  return {
    userId: faker.datatype.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
    isFavorite: false,
  };
}

const getUsers = (count: number = 50) => Array.from({ length: count }, createRandomUser);

export type { USER };
export default getUsers;