import gql from 'graphql-tag';

export const SIGN_UP = gql`
  query GetAllPokemon(
    $sortMethod: PokemonOrderByInput
    $selectedFilters: [Type!]
    $searchString: String
    $offset: Int
    $limit: Int
  ) {
    allPokemon(
      orderBy: $sortMethod
      filterByType: $selectedFilters
      searchString: $searchString
      offset: $offset
      limit: $limit
    ) {
      id
      name
      img
      stars
      types
      number
    }
  }
`;

export const SIGN_IN = gql`
  query GetAllPokemon(
    $sortMethod: PokemonOrderByInput
    $selectedFilters: [Type!]
    $searchString: String
    $offset: Int
    $limit: Int
  ) {
    allPokemon(
      orderBy: $sortMethod
      filterByType: $selectedFilters
      searchString: $searchString
      offset: $offset
      limit: $limit
    ) {
      id
      name
      img
      stars
      types
      number
    }
  }
`;
