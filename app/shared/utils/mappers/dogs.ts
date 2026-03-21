import type { DogBreedOption, DogImageResult } from '~/shared/types/dogs'

export const mapDogBreedOptions = (raw: Record<string, string[]> | null | undefined): DogBreedOption[] => {
  if (!raw) {
    return []
  }

  return Object.keys(raw)
    .sort((left, right) => left.localeCompare(right))
    .map((breed) => ({
      label: breed.replace(/-/g, ' '),
      value: breed
    }))
}

export const mapDogImageResult = (breed: string, image: string | null): DogImageResult => ({
  breed,
  image
})
