export type RandomUserCard = {
  id: string
  name: string
  email: string
  location: string
  avatar: string | null
}

export type RandomUserResponse = {
  items: RandomUserCard[]
}
