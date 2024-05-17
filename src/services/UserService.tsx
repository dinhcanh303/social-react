import { imageC } from '@/constants/const'

export const UserService = {
  getData() {
    return [
      {
        id: '1',
        email: 'abc@example.com',
        fullName: 'Foden Ngo 1',
        firstName: 'Foden',
        lastName: 'Ngo',
        avatar: imageC,
        role: 'admin'
      },
      {
        id: '2',
        email: 'abc@example.com',
        fullName: 'Foden Ngo 2',
        firstName: 'Foden',
        lastName: 'Ngo',
        avatar: imageC,
        role: 'admin'
      },
      {
        id: '3',
        email: 'abc@example.com',
        fullName: 'Foden Ngo 3',
        firstName: 'Foden',
        lastName: 'Ngo',
        avatar: imageC,
        role: 'admin'
      },
      {
        id: '4',
        email: 'abc@example.com',
        fullName: 'Foden Ngo 4',
        firstName: 'Foden',
        lastName: 'Ngo',
        avatar: imageC,
        role: 'admin'
      },
      {
        id: '5',
        email: 'abc@example.com',
        fullName: 'Foden Ngo 5',
        firstName: 'Foden',
        lastName: 'Ngo',
        avatar: imageC,
        role: 'admin'
      }
    ]
  },
  getUsersSmall() {
    return Promise.resolve(this.getData().slice(0, 10))
  }
}
