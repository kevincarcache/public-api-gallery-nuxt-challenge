export type RandomUserCard = {
  id: string
  name: string
  email: string
  location: string
  avatar: string | null
  role: string
  age: number | null
  nationality: string
}

export type RandomUserResponse = {
  items: RandomUserCard[]
}
