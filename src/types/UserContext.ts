export interface DummyUsers {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  accessToken?: string
  refreshToken?: string
}

export interface DummyUser extends DummyUsers {
  maidenName: string
  age: number
  phone: string
  password: string
  birthDate: string
  bloodGroup: string
  height: number
  weight: number
  eyeColor: string
  hair: {
    color: string
    type: string
  }
  ip: string
  address: {
    address: string
    city: string
    state: string
    stateCode: string
    country: string
    coordinates: {
      lat: number
      lng: number
    }
    postalCode: string
  }
  macAddress: string
  university: string
  bank: {
    cardExpire: string
    cardNumber: string
    cardType: string
    currency: string
    iban: string
  }
  company: {
    address: {
      address: string
      city: string
      coordinates: {
        lat: number
        lng: number
      }
      postalCode: string
      state: string
      stateCode: string
      country: string
    }
    department: string
    name: string
    title: string
  }
  ein: string
  ssn: string
  userAgent: string
  crypto: {
    coin: string
    wallet: string
    network: string
  }
  role: string
}
